import type { CollectionConfig } from 'payload/types';

export const ImageUploads: CollectionConfig = {
  slug: 'imageUploads',
  labels: {
    singular: 'Image Upload',
    plural: 'Image Uploads',
  },
  admin: {
    group: 'ADMIN',
  },
  access: {
    read: ({ req }) => {
      // Check if the request is coming from the admin panel
      const isAdmin = req.headers.referer && req.headers.referer.includes('/admin');

      if (isAdmin) {
        // allow system admins to see all image uploads
        if (req.user.roles?.includes('systemAdmin')) return true;

        // allow community organizers to see their own image uploads
        return {
          createdBy: {
            equals: req.user.id,
          },
        };
      }

      // For non-admin requests (OpenAPI), allow read access to all image uploads
      return true;
    },
  },
  upload: {
    staticDir: '../local_uploads/image_uploads',
    formatOptions: {
      format: 'webp',
      options: {
        quality: 82,
        effort: 6,
        lossless: false,
        chromaSubsampling: '4:2:0',
      },
    },
    resizeOptions: {
      width: 1200,
      height: 1200,
      fit: 'inside',
      withoutEnlargement: true,
    },
  },
  fields: [],
};
