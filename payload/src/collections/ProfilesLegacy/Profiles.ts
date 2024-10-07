import type { CollectionConfig, FieldAccess } from 'payload/types';
// import { CustomCollectionView } from "../../globalComponents/views/CustomCollectionView";
import { isAdminOrOwner } from './access/isAdminOrOwner';
import { canReadProfiles } from './access/canReadProfiles';
import { canUpdateProfiles } from './access/canUpdateProfiles';
import { canCreateProfiles } from './access/canCreateProfiles';
import { canAdminProfiles } from './access/canAdminProfiles';
// TODO: test that only 5 profiles can be created for one user. should not be able to create more than this
export const Profiles: CollectionConfig = {
  slug: 'profiles',
  labels: {
    singular: 'Profile',
    plural: 'Profiles',
  },
  admin: {
    description:
      'Your profile is your personal space on FITN.io and the gateway into the fitness community.\nA profile can represent any role - from a new member, a coach, a vendor, a content creator, an event organizer, or even a business.\nAll pages created on FITN.io will use the branding style from your profile to have a consistent look and feel, making your space truly yours.',
    // group: "Admin",
    // TODO: add test and validation to enforce usernames that are url friendly (instagram structure ids?)

    // Display "profileUsername" field in admin (dropdown, lists, etc.)
    useAsTitle: 'profileUsername',
    defaultColumns: ['profileUsername', 'customDomain', 'owner', 'managers'],
    components: {
      views: {
        // List: CustomCollectionView,
      },
    },
  },

  // auth: true, // if true, would add email/password fields to the collection
  access: {
    admin: canAdminProfiles(),
    // api access
    read: canReadProfiles,
    update: canUpdateProfiles,
    create: canCreateProfiles,
  },
  fields: [
    // TODO: for postgres. since mongo (240601), this is no longer needed since it does better auto gen
    // {
    //   // custom id field to make protected from being accessed by admin panel
    //   name: "id",
    //   type: "text",
    //   access: {
    //     // prevent changing id after creation
    //     update: () => false,
    //   },
    //   admin: {
    //     // hide from admin panel because will always be auto-generated
    //     hidden: true,
    //   },
    //   hooks: {
    //     beforeChange: [
    //       // generate a new id on create
    //       ({ operation }) => {
    //         if (operation === "create") {
    //           return uuidv4();
    //         }
    //       },
    //     ],
    //   },
    // },
    {
      name: 'owner',
      label: 'Owner',
      type: 'relationship',
      relationTo: 'users',
      access: {
        // once profile is created, prevent owner from being changed
        update: () => false,
      },

      hooks: {
        beforeChange: [
          ({ req, operation }) => {
            // set owner to be the authenticated user
            if (operation === 'create' && req.user) {
              return req.user.id;
            }
          },
        ],
      },
      admin: {
        position: 'sidebar',
        allowCreate: false,
        hidden: true,
        description: 'Only one user can be the owner of a profile.',
      },
    },
    {
      name: 'managers',
      label: 'Managing accounts',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        position: 'sidebar',
        allowCreate: false,
        description: 'Select other users who can manage this profile.',
      },
      access: {
        // read: isAdminOrCreatedByOrManager as FieldAccess,
      },
    },
    // Profile unique identifier + subdomain
    // TODO: create blacklist of usernames/subdomains that cannot be used
    // examples: www, goldsgym, anytime, anytimefitness, nike, reebok, etc.
    {
      name: 'profileUsername', // note: use camelCase for automatic spacing in the admin panel
      label: 'Username',
      type: 'text',
      required: true,
      unique: true,
      admin: {},
      validate: (value: string) => {
        if (/[A-Z]/.test(value)) {
          return 'Username must not contain uppercase letters.';
        }
        const subdomainRegex = /^[a-z]([-a-z0-9]{1,61}[a-z0-9])?$/;
        if (!subdomainRegex.test(value)) {
          return 'Username is not valid for a subdomain. It must be 3-63 characters long, start with a lowercase letter, end with a letter or number, can contain lowercase letters, numbers, or hyphens, and cannot have two hyphens in a row.';
        }
      },
    },
    {
      name: 'profileNickname',
      label: 'Nickname',
      type: 'text',
      required: false,
    },
    {
      name: 'customDomain', // note: use camelCase for automatic spacing in the admin panel
      label: 'Custom Domain',
      type: 'text',
      required: false,
      admin: {},
    },
    {
      type: 'group',
      name: 'profileLogos',
      label: 'Logos',
      fields: [
        {
          name: 'profilePrimaryLogoImg',
          label: 'Primary Logo',
          admin: {
            description: 'The main logo for your profile. Ideal if has both text and icon.',
          },
          type: 'upload',
          relationTo: 'profileUploads',
          required: false,
        },
        {
          name: 'profileSecondaryLogoImg',
          label: 'Secondary Logo',
          admin: {
            description: 'A smaller, less complex logo for compact spaces.',
          },
          type: 'upload',
          relationTo: 'profileUploads',
          required: false,
        },
        {
          name: 'profileFaviconImg',
          label: 'Favicon',
          admin: {
            description: 'A miniature logo for browser tabs.',
          },
          type: 'upload',
          relationTo: 'profileUploads',
          required: false,
        },
        {
          name: 'profileWordmarkLogoImg',
          label: 'Wordmark Logo',
          admin: {
            description: 'A logo that is text only.',
          },
          type: 'upload',
          relationTo: 'profileUploads',
          required: false,
        },
        {
          name: 'profileIconOnlyLogoImg',
          label: 'Icon Only Logo',
          admin: {
            description: 'A logo that is icon only.',
          },
          type: 'upload',
          relationTo: 'profileUploads',
          required: false,
        },
        {
          name: 'profileOneColorWhiteLogoImg',
          label: 'One Color White Logo',
          admin: {
            description: 'A logo that is all white.',
          },
          type: 'upload',
          relationTo: 'profileUploads',
          required: false,
        },
      ],
    },
    // TODO: test make sure select front page only displays current owners pages, no one else
    {
      name: 'profileMainPage',
      label: 'Select your front page',
      type: 'relationship',
      filterOptions: ({ relationTo, id }) => {
        if (relationTo === 'pages') {
          return {
            pageProfile: {
              equals: id,
            },
          };
        } else {
          return false;
        }
      },
      relationTo: 'pages',
      hasMany: false,

      admin: {
        allowCreate: false,
        isSortable: true,
        description:
          'This page will be the first page visitors see when they visit your profile. You can change this at any time.',
      },
      access: {
        // should be public
        // read: isPublic as FieldAccess,
      },
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'select',
      defaultValue: 'cupcake',
      options: [
        { label: 'Custom Theme', value: 'custom' },
        { label: 'Cupcake', value: 'cupcake' },
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'Bumblebee', value: 'bumblebee' },
        { label: 'Emerald', value: 'emerald' },
        { label: 'Corporate', value: 'corporate' },
        { label: 'Synthwave', value: 'synthwave' },
        { label: 'Retro', value: 'retro' },
        { label: 'Cyberpunk', value: 'cyberpunk' },
        { label: 'Valentine', value: 'valentine' },
        { label: 'Halloween', value: 'halloween' },
        { label: 'Garden', value: 'garden' },
        { label: 'Forest', value: 'forest' },
        { label: 'Aqua', value: 'aqua' },
        { label: 'Lofi', value: 'lofi' },
        { label: 'Pastel', value: 'pastel' },
        { label: 'Fantasy', value: 'fantasy' },
        { label: 'Wireframe', value: 'wireframe' },
        { label: 'Black', value: 'black' },
        { label: 'Luxury', value: 'luxury' },
        { label: 'Dracula', value: 'dracula' },
        { label: 'Cmyk', value: 'cmyk' },
        { label: 'Autumn', value: 'autumn' },
        { label: 'Business', value: 'business' },
        { label: 'Acid', value: 'acid' },
        { label: 'Lemonade', value: 'lemonade' },
        { label: 'Night', value: 'night' },
        { label: 'Coffee', value: 'coffee' },
        { label: 'Winter', value: 'winter' },
        { label: 'Dim', value: 'dim' },
        { label: 'Nord', value: 'nord' },
        { label: 'Sunset', value: 'sunset' },
      ],
      required: true,
      admin: {
        // position: "sidebar",
      },
    },
    {
      name: 'enableCustomTheme',
      type: 'checkbox',
      label: 'Enable Custom Theme',
    },
    {
      name: 'customTheme',
      label: 'Custom Theme',
      type: 'relationship',
      relationTo: 'themes',

      hasMany: false,

      admin: {
        allowCreate: true,
        description:
          'Override the default theme with your own custom colors. Use HEX, RGB, or HSL values, or color names.',
      },
    },
    {
      name: 'profileApps',
      label: 'Mini Apps',
      type: 'group',
      access: {
        // public can read to know which features available on profile page loading
        // needed for custom themes for example
        read: () => true,
      },
      admin: {
        description:
          'Mini Apps power up your profile with extra functionality. Select the apps to install, then find them on your profile dashboard!',
      },
      fields: [
        {
          name: 'customTheme',
          label: 'Custom Theme',
          type: 'checkbox',
          admin: {
            description:
              'Override the default theme with your own custom colors. Use HEX, RGB, or HSL values, or color names.',
          },
        },
        {
          name: 'profileAppEvents',
          label: 'Events',
          type: 'checkbox',
          admin: {
            description:
              'Host and share events from your profile. Replaces Meetup, Eventbrite, and Facebook Events.',
          },
        },
        {
          name: 'profileAppTeams',
          label: 'Teams',
          type: 'checkbox',
          admin: {
            description:
              'Connect your profile with other profiles to create groups for teams, sponsors, or collaborations.',
          },
        },
        {
          name: 'profileAppFAQ',
          label: 'FAQ',
          type: 'checkbox',
          admin: {
            description:
              'Create a FAQ page to answer common questions about you, your community, or business.',
          },
        },

        {
          name: 'profileAppTestimonials',
          label: 'Testimonials',
          type: 'checkbox',
          admin: {
            description:
              'Collect and display testimonials from your clients, members, fans, or followers.',
          },
        },
        {
          name: 'profileAppNews',
          label: 'News',
          type: 'checkbox',
          admin: {
            description:
              'Publish news, blog posts, updates, and announcements from your profile. Connect with your audience and keep them informed. Autopublishes to your social media channels.',
          },
        },
        {
          name: 'profileAppNewsletter',
          label: 'Newsletter',
          type: 'checkbox',
          admin: {
            description:
              'Create and send newsletters to your subscribers. Collect emails and have true ownership of your audience. Autoexport to Mailchimp, ConvertKit, or other email marketing tools.',
          },
        },

        {
          name: 'profileAppPhotos',
          label: 'Photos',
          type: 'checkbox',
          admin: {
            description:
              'Host and share photos from your profile. Supports albums, galleries, and stories.',
          },
        },
      ],
    },
    {
      name: 'profileAppsWishlist',
      label: 'Wishlist - Vote for your favorite apps!',
      type: 'group',
      access: {
        read: isAdminOrOwner as FieldAccess,
      },
      admin: {
        description:
          'Select apps here to vote for what you would like to see next! The most popular apps will be prioritized.',
      },
      fields: [
        {
          name: 'profileContentScheduler',
          label: 'Content Scheduler',
          type: 'checkbox',
          admin: {
            description:
              'Auto post batch content to all your socials!  Never worry about having to create content again with this AI driven content blaster.',
          },
        },
        {
          name: 'profileAppBrandingKitDownload',
          label: 'Branding Kit Download',
          type: 'checkbox',
          admin: {
            description:
              'Create a downloadable branding kit based on your profile. Includes logos, colors, fonts, and styles so external parties can easily create content for you.',
          },
        },
        {
          name: 'profileAppABTesting',
          label: 'A/B Testing',
          type: 'checkbox',
          admin: {
            description:
              'Test different versions of your pages to see what works best. Supports variants, metrics, and reports.',
          },
        },
        {
          name: 'profileAppAdSpace',
          label: 'Ad Space',
          type: 'checkbox',
          admin: {
            description:
              'Sell ad space on your profile. Supports banners, popups, and sponsored posts.',
          },
        },
        {
          name: 'profileAppLine',
          label: 'LINE',
          type: 'checkbox',
          admin: {
            description:
              'Connect your profile with LINE official accounts to have LINE chats with your followers. Links to any existing page to your profile with RichMenu and QR code support.',
          },
        },
        {
          name: 'profileAppMobileApp',
          label: 'Mobile App',
          type: 'checkbox',
          admin: {
            description:
              'Create a downloadable mobile app for your profile pages! Supports iOS, Android, and PWA.',
          },
        },
        {
          name: 'profileAppTimer',
          label: 'Timer',
          type: 'checkbox',
          admin: {
            description:
              'Host and share a timer from your profile. Supports countdowns, stopwatches, and intervals.',
          },
        },
        {
          name: 'profileAppMemberships',
          label: 'Memberships',
          type: 'checkbox',
          admin: {
            description:
              'Create different memberships tiers to offer content or services to specific groups of people. Supports one-time payments, subscriptions, and free memberships.',
          },
        },
        {
          name: 'profileAppShop',
          label: 'Shop',
          type: 'checkbox',
          admin: {
            description:
              'Sell physical or digital products directly from your profile. Connects with Stripe, PayPal, and other payment gateways. Supports inventory management, discounts, and shipping.',
          },
        },
        {
          name: 'profileAppCourses',
          label: 'Courses',
          type: 'checkbox',
          admin: {
            description:
              'Create and sell online courses from your profile. Supports video lessons, quizzes, assignments, and certificates.',
          },
        },
        {
          name: 'profileAppBookings',
          label: 'Bookings',
          type: 'checkbox',
          admin: {
            description:
              'Allow clients to book appointments, classes, or services directly from your profile. Connects with your calendar and sends reminders.',
          },
        },
        {
          name: 'profileAppCoaching',
          label: 'Coaching',
          type: 'checkbox',
          admin: {
            description:
              'Offer coaching services from your profile. Supports one-on-one, group, or online coaching.',
          },
        },
        {
          name: 'profileAppPodcast',
          label: 'Podcast',
          type: 'checkbox',
          admin: {
            description:
              'Host and share a podcast from your profile. Supports audio and video podcasts.',
          },
        },
        {
          name: 'profileAppVideos',
          label: 'Videos',
          type: 'checkbox',
          admin: {
            description:
              'Host and share videos from your profile. Supports live streaming, video on demand, and video series.',
          },
        },

        {
          name: 'profileAppMusic',
          label: 'Music',
          type: 'checkbox',
          admin: {
            description:
              'Host and share music from your profile. Supports playlists, albums, and singles. Connect with Spotify, Apple Music, and SoundCloud.',
          },
        },
        {
          name: 'profileAppRunner',
          label: 'Runner',
          type: 'checkbox',
          admin: {
            description:
              'Host and share your runs from your profile. Supports routes, distances, and times.',
          },
        },
        {
          name: 'profileAppCyclist',
          label: 'Cyclist',
          type: 'checkbox',
          admin: {
            description:
              'Host and share your rides from your profile. Supports routes, distances, and times.',
          },
        },
        {
          name: 'profileAppSwimmer',
          label: 'Swimmer',
          type: 'checkbox',
          admin: {
            description:
              'Host and share your swims from your profile. Supports routes, distances, and times.',
          },
        },
        {
          name: 'profileAppRecipes',
          label: 'Recipes',
          type: 'checkbox',
          admin: {
            description:
              'Share recipes from your profile. Supports ingredients, instructions, and photos.',
          },
        },
        {
          name: 'profileAppNutrition',
          label: 'Nutrition',
          type: 'checkbox',
          admin: {
            description:
              'Share nutrition tips from your profile. Supports meal plans, diets, and supplements.',
          },
        },
        {
          name: 'profileAppWorkouts',
          label: 'Workouts',
          type: 'checkbox',
          admin: {
            description:
              'Share workouts from your profile. Supports exercises, sets, reps, and videos.',
          },
        },
        {
          name: 'profileAppChallenges',
          label: 'Challenges',
          type: 'checkbox',
          admin: {
            description:
              'Create and share challenges. Supports leaderboards, prizes, and sponsors to increase engagement with your audience.',
          },
        },
        {
          name: 'profileAppPolls',
          label: 'Polls',
          type: 'checkbox',
          admin: {
            description:
              'Host and share polls from your profile. Supports multiple choice, single choice, and open-ended questions.',
          },
        },
        {
          name: 'profileAppSurveys',
          label: 'Surveys',
          type: 'checkbox',
          admin: {
            description:
              'Host and share surveys from your profile. Supports multiple choice, single choice, and open-ended questions.',
          },
        },
        {
          name: 'profileAppQuizzes',
          label: 'Quizzes',
          type: 'checkbox',
          admin: {
            description:
              'Host and share quizzes from your profile. Supports multiple choice, single choice, and true/false questions.',
          },
        },
        {
          name: 'profileAppForms',
          label: 'Forms',
          type: 'checkbox',
          admin: {
            description:
              'Host and share forms from your profile. Supports multiple choice, single choice, and open-ended questions.',
          },
        },
        {
          name: 'profileAppForums',
          label: 'Forums',
          type: 'checkbox',
          admin: {
            description:
              'Host and share forums from your profile. Supports categories, threads, and replies.',
          },
        },
        {
          name: 'profileAppChat',
          label: 'Chat',
          type: 'checkbox',
          admin: {
            description:
              'Host and share chat from your profile. Supports public and private chat rooms.',
          },
        },
        {
          name: 'profileAppMessaging',
          label: 'Messaging',
          type: 'checkbox',
          admin: {
            description:
              'Host and share messaging from your profile. Supports direct messages and group chats.',
          },
        },
        {
          name: 'profileAppTipJar',
          label: 'Tip Jar',
          type: 'checkbox',
          admin: {
            description: 'Allow fans to support you with tips, donations, or sponsorships.',
          },
        },
        {
          name: 'profileAppSponsors',
          label: 'Sponsors',
          type: 'checkbox',
          admin: {
            description:
              'Connect with sponsors to support your profile. Supports sponsorships, ads, and partnerships.',
          },
        },
        {
          name: 'profileAppAffiliates',
          label: 'Affiliates',
          type: 'checkbox',
          admin: {
            description:
              'Connect with affiliates to promote your profile. Supports referral links, tracking, and commissions.',
          },
        },
        {
          name: 'profileAppAnalytics',
          label: 'Analytics',
          type: 'checkbox',
          admin: {
            description:
              "Track and analyze your profile's performance. Supports page views, visitors, and conversions.",
          },
        },
        {
          name: 'profileAppSeo',
          label: 'SEO',
          type: 'checkbox',
          admin: {
            description:
              'Optimize your profile for search engines. Supports meta tags, sitemaps, and robots.txt.',
          },
        },
        {
          name: 'profileAppEmailMarketing',
          label: 'Email Marketing',
          type: 'checkbox',
          admin: {
            description:
              'Connect your profile with email marketing. Supports newsletters, campaigns, and automations.',
          },
        },
        {
          name: 'profileAppAutomation',
          label: 'Automation',
          type: 'checkbox',
          admin: {
            description:
              'Automate tasks on your profile. Supports triggers, conditions, and actions.',
          },
        },
        {
          name: 'profileAppIntegrations',
          label: 'Integrations',
          type: 'checkbox',
          admin: {
            description:
              'Connect your profile with other tools. Supports APIs, webhooks, and Zapier.',
          },
        },
        {
          name: 'profileAppBranding',
          label: 'Settings',
          type: 'checkbox',
          admin: {
            description:
              "Customize your profile's look to match you or your organization. Supports additional colors, fonts, and styling options.",
          },
        },
        {
          name: 'profileAppLegal',
          label: 'Legal',
          type: 'checkbox',
          admin: {
            description:
              'Manage your profile legal documents. Supports terms of service, privacy policy, and cookie policy.',
          },
        },
        {
          name: 'profileAppHelpCenter',
          label: 'Help Center',
          type: 'checkbox',
          admin: {
            description:
              'Add help center to your profile. Supports adding documentation, tutorials, and guides to your profile.',
          },
        },
        {
          name: 'profileAppFiles',
          label: 'Files',
          type: 'checkbox',
          admin: {
            description:
              'Host and share files from your profile. Supports documents, images, and videos.',
          },
        },
        {
          name: 'profileAppLinkLocker',
          label: 'Link Locker',
          type: 'checkbox',
          admin: {
            description:
              'Host and share links from your profile. Supports links, descriptions, and images.',
          },
        },
        {
          name: 'profileAppRoadmap',
          label: 'Roadmap',
          type: 'checkbox',
          admin: {
            description:
              'Share your future roadmap from your profile. Supports features, releases, and updates.',
          },
        },
        {
          name: 'profileAppContact',
          label: 'Contact',
          type: 'checkbox',
          admin: {
            description: 'Contact support for your profile. Supports chat, email, and phone.',
          },
        },
      ],
    },
  ],
};
