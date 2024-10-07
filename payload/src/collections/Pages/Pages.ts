import type { CollectionConfig } from 'payload/types';
import type { Profile } from 'payload/generated-types';
import { pageIntroFields } from './fields/pageIntroFields';
import { linkInBioFields } from './fields/linkInBioFields';
import { blockBuilderFields } from './fields/blockBuilderFields';
import { canReadPages } from './access/canReadPages';
import { canUpdatePages } from './access/canUpdatePages';
import { agencyPageFields } from './fields/agencyPageFields';

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'pageTitle',
    hideAPIURL: true,
  },
  // access to collection
  access: {
    read: canReadPages,
    update: canUpdatePages,
  },
  hooks: {
    beforeRead: [
      async ({ doc, req }) => {
        console.log('req: ', req);
        const { user } = req;
        console.log('doc: ', doc);
        console.log('user: ', user);
        // TODO: if doc is not published and user is not owner, return null
        return doc;
      },
    ],
    beforeChange: [
      // on create, set users "selected profile" as the page profile
      async ({ operation, req, data }) => {
        if (operation === 'create') {
          if (req.user) {
            const selectedProfile = (
              await req.payload.findByID({
                collection: 'users',
                id: req.user.id,
                depth: 1, // deconstructs the user, but only see selectedProfile as id
              })
            ).selectedProfile as Profile;

            if (selectedProfile) {
              data.pageProfile = selectedProfile.id;
            } else {
              throw new Error('No profile found for user');
            }
          }
        }
        // on create/update, make sure the user is owner or manager of the profile that the page is being created for
        // if (operation === "create" || operation === "update") {
        //   if (req.user) {
        //     const pageProfile = data.pageProfile;
        //     // if no profile username, throw error to prevent create/update
        //     if (!pageProfile || pageProfile === "")
        //       throw new Error("Profile not found");
        //     if (pageProfile) {
        //       const profileFound = await payload.find({
        //         collection: "profiles",
        //         // needed to deconstruct user to match for owner
        //         depth: 1,
        //         where: {
        //           and: [
        //             {
        //               owner: {
        //                 equals: req.user.id,
        //               },
        //             },
        //             {
        //               profileUsername: {
        //                 equals: pageProfile,
        //               },
        //             },
        //           ],
        //         },
        //       });
        //       if (profileFound) {
        //         data.profile_owner = profileFound.docs[0].id;
        //       } else {
        //         throw new Error(
        //           `Profile with username ${pageProfile} not found`
        //         );
        //       }
        //     }
        //   }
        // }
      },
    ],
    // beforeChange: [
    //   async ({ operation, req, data }) => {
    //     // on create, set profile to the user's first profile.
    //     //  TODO: assign to users currently selected profile
    //     if (operation === "create") {
    //       if (req.user) {
    //         const userProfiles = await payload.find({
    //           collection: "profiles",
    //           where: {
    //             owner: req.user.id,
    //           },
    //           depth: 1,
    //         });
    //         if (userProfiles.docs.length > 0) {
    //           data.profile = userProfiles.docs[0].id;
    //           return data;
    //         }
    //       }
    //     }
    //   },
    // ],
    // afterChange: {
    //   doc, // full document data
    //   req, // full express request
    //   previousDoc, // document data before updating the collection
    //   operation, // name of the operation ie. 'create', 'update'
    // }) => {
    //   return doc
    // }
  },
  fields: [
    /**
     * RELATIONSHIP FIELDS (be careful with changes to these fields)
     */

    // profile that owns this page. hidden and set by beforeChange hook
    {
      name: 'pageProfile',
      type: 'relationship',
      relationTo: 'profiles',
      hasMany: false,
      required: true,

      admin: {
        position: 'sidebar',
        condition: (data, siblingData, { user }) => {
          console.log('user: ', user);
          console.log('data: ', data);
          console.log('siblingData: ', siblingData);
          return user.role === 'admin';
        },
      },
    },
    {
      name: 'pageTitle',
      label: 'Page Title',
      type: 'text',
      required: false,
      unique: false,
      admin: {},
    },
    {
      name: 'pageType',
      label: 'What type of page are you creating?',
      type: 'radio',
      options: [
        // Mini App Pages
        { label: 'Block Builder Page', value: 'blockBuilderPage' },
        { label: 'Landing Page', value: 'landingPage' },
        { label: 'Agency Page', value: 'agencyPage' },
        { label: 'Event Page', value: 'eventDetailsPage' },

        // one shot per profile pages
        // { label: 'A Course Page', value: 'coursePage' },
        // { label: 'Link in bio Page', value: 'linkInBioPage' },
        // { label: 'Branding Kit Page', value: 'brandingKitPage' },
        // { label: 'Tip Jar Page', value: 'tipJarPage' },

        // individual details pages
        // { label: 'Workout Plan Page', value: 'workoutPlanPage' },
        // { label: 'Recipes Page', value: 'recipesPage' },
        // { label: 'Link Locker Page', value: 'linkLockerPage' },
        // { label: 'Social Post', value: 'socialDetailsPage' },
      ],
      required: true,
    },

    // page intro fields for block builder and link in bio pages only
    ...pageIntroFields,

    // fields for specific page types
    ...agencyPageFields,
    ...linkInBioFields,
    ...blockBuilderFields,
  ],
};
