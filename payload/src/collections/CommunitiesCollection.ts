import { CollectionConfig } from 'payload/types';
import { slugify } from '../utils/slugify';
import { CreateSubCommunityButton } from './CreateSubCommunityButton';

const ORGANIZER_ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
};

const ROLE_PERMISSIONS = {
  [ORGANIZER_ROLES.ADMIN]: [
    'create_events',
    'publish_events',
    'edit_events',
    'delete_events',
    'manage_members',
    'manage_community_organizers',
    'manage_community_settings',
    'manage_community_posts',
    'manage_community_files',
    'manage_community_events',
    'manage_community_pages',
    'manage_community_settings',
  ],
  [ORGANIZER_ROLES.EDITOR]: ['create_events', 'edit_events'],
  [ORGANIZER_ROLES.VIEWER]: [],
};

// utility function to check if a user has a specific permission for a community
export function checkOrganizerPermission(user, community, requiredPermission) {
  const organizer = community.communityOrganizers.find((org) => org.user.id === user.id);
  if (!organizer) return false;

  const rolePermissions = ROLE_PERMISSIONS[organizer.role];
  return rolePermissions.includes(requiredPermission);
}

export const Communities: CollectionConfig = {
  slug: 'communities',
  admin: {
    group: 'DASHBOARD',
    useAsTitle: 'communityName',
    defaultColumns: ['communityName', 'createdBy', 'createdAt'],
    hideAPIURL: true,
    disableDuplicate: true,
  },
  // Enable versions, draft and restore
  versions: {
    // maxPerDoc: 100
    drafts: {
      autosave: false,
    },
  },

  access: {
    read: ({ req }) => {
      // Check if the request is coming from the admin panel
      const isAdmin = req.headers.referer && req.headers.referer.includes('/admin');

      // If from Payload Admin...
      if (isAdmin) {
        // allow system admins to see all communities
        if (req.user.roles?.includes('systemAdmin')) return true;

        return {
          OR: [
            // allow community organizers to see their own communities
            {
              'communityOrganizers.user': {
                equals: req.user.id,
              },
            },
            // allow community organizers to see their subcommunities
            {
              'parentCommunity.communityOrganizers.user': {
                contains: req.user.id,
              },
            },
          ],
        };

        // AND: [
        //   {
        //     'communityOrganizers.user': {
        //       equals: req.user.id,
        //     },
        //   },
        //   {
        //     'communityOrganizers.role': {
        //       equals: ORGANIZER_ROLES.ADMIN,
        //     },
        //   },
        // ],
      }

      // For non-admin requests (OpenAPI), allow read access to all communities
      return true;
    },
  },
  fields: [
    // As of 241005, "slug" field seems required no matter what, maybe version/draft related bug?
    {
      name: 'slug',
      label: {
        en: 'Community ID',
        ja: 'コミュニティID',
      },
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: {
          en: 'This communities unique ID. Used in the URL when you share this community. Be careful! Changing this can break existing web links pointing to this community.',
          ja: 'このコミュニティの一意のID。このコミュニティを共有するときに、URLでこのIDを使用します。',
        },
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            // if slug is already set, return it safely via slugify
            if (value) {
              return slugify(value);
            }

            // if slug is not set, generate it from communityName
            return data.communityName ? slugify(data.communityName) : '';
          },
        ],
      },
    },

    {
      name: 'communityName',
      type: 'text',
      required: true,
      localized: true,
      // unique: true,
    },
    {
      name: 'communitySummary',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'communityLongDescription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'communityOrganizers',
      type: 'array',
      admin: {
        description: 'Users who can manage this community',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'user',
              type: 'relationship',
              relationTo: 'users',
              hasMany: false,
              required: true,
            },
            {
              name: 'role',
              type: 'select',
              required: true,
              options: Object.values(ORGANIZER_ROLES).map((role) => ({ label: role, value: role })),
            },
          ],
        },
      ],
    },
    {
      name: 'parentCommunity',
      type: 'relationship',
      relationTo: 'communities',
      hasMany: false,
      admin: {
        position: 'sidebar',
        description: {
          en: 'The parent community that this community belongs to',
          ja: 'このコミュニティが属する親コミュニティ',
        },
        readOnly: true,
        allowCreate: false,
        isSortable: false,

        condition: (data) => {
          return !!data.parentCommunity;
        },
      },
      hooks: {
        afterChange: [
          async ({ req, value, operation, originalDoc }) => {
            // after creating a community...
            if (operation === 'create') {
              // if this is a subcommunity (aka has parentCommunity), add it to the parent community's subcommunities
              if (value) {
                // find the parent community
                const parentCommunity = await req.payload.findByID({
                  collection: 'communities',
                  id: value,
                });

                // add this subcommunity to the parent community's subcommunities list
                const results = await req.payload.update({
                  collection: 'communities',
                  id: value,
                  data: {
                    subcommunities: [...parentCommunity.subcommunities, originalDoc],
                  },
                });
                console.log('results', results);
              }
            }
          },
        ],
      },
    },
    {
      name: 'subcommunities',
      type: 'relationship',
      relationTo: 'communities',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Subcommunities within this community',
        allowCreate: false,
        readOnly: true,
        isSortable: false,

        condition: (data) => {
          // hide if this doc is a subcommunity (aka has parentCommunity)
          if (data.parentCommunity) {
            return false;
          }

          // hide this field when in process of creating a new community
          // communityName is always required, so this field will be hidden until it is saved
          return !!data.id;
        },
      },
    },
    {
      name: 'createSubCommunity',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: CreateSubCommunityButton,
        },
        condition: (data) => {
          // hide if this doc is a subcommunity (aka has parentCommunity)
          if (data.parentCommunity) {
            return false;
          }

          // hide this field when in process of creating a new community
          // communityName is always required, so this field will be hidden until it is saved
          return !!data.id;
        },
      },
    },
    // Hidden Fields
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      admin: {
        position: 'sidebar',
        hidden: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        // when creating a new community...
        if (operation === 'create') {
          // Set "createdBy" to the current user
          data.createdBy = req.user.id;
          // Ensure communityOrganizers is an array
          if (!data.communityOrganizers) {
            data.communityOrganizers = [];
          }
          // Add current user to communityOrganizers (if not already present)
          if (!data.communityOrganizers.includes(req.user.id)) {
            data.communityOrganizers.push({ user: req.user.id, role: ORGANIZER_ROLES.ADMIN });
          }

          // if creating subcommunity, add parentId via URL param in URL
          const url = new URL(req.headers.referer);
          const parentCommunity = url.searchParams.get('parentCommunity');
          if (parentCommunity) {
            data.parentCommunity = parentCommunity;
          }
        }

        // Return the modified data
        return data;
      },
    ],
    afterDelete: [
      // when deleting a community...
      async function removeSubcommunityFromParent({ req, doc, id }) {
        // if this community has a parent...
        if (doc.parentCommunity) {
          // find the parent community
          const parentCommunityId =
            typeof doc.parentCommunity === 'object' ? doc.parentCommunity.id : doc.parentCommunity;

          // find the parent community
          const parentCommunity = await req.payload.findByID({
            collection: 'communities',
            id: parentCommunityId,
          });

          // remove this community from the parent community's subcommunities list
          if (parentCommunity && Array.isArray(parentCommunity.subcommunities)) {
            const updatedSubcommunities = parentCommunity.subcommunities.filter((subcommunity) => {
              const subcommunityId =
                typeof subcommunity === 'object' ? subcommunity.id : subcommunity;
              return subcommunityId !== id;
            });

            await req.payload.update({
              collection: 'communities',
              id: parentCommunityId,
              data: { subcommunities: updatedSubcommunities },
            });
          }
        }
      },
    ],
  },
};
