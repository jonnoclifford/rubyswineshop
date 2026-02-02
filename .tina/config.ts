import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Self-hosted mode - no TinaCloud required
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "self-hosted",
  token: process.env.TINA_TOKEN || "self-hosted",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
    skipSDKGeneration: true, // Skip cloud-dependent SDK generation
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "siteConfig",
        label: "Site Configuration",
        path: "src/content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "header",
            label: "Header & Navigation",
            fields: [
              {
                type: "image",
                name: "logo",
                label: "Logo Image",
                required: true,
              },
              {
                type: "object",
                name: "navigation",
                label: "Navigation Links",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Link Text",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Link Target",
                    required: true,
                  },
                ],
              },
              {
                type: "string",
                name: "ctaText",
                label: "CTA Button Text",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "business",
            label: "Business Information",
            fields: [
              {
                type: "string",
                name: "name",
                label: "Business Name",
                required: true,
              },
              {
                type: "string",
                name: "tagline",
                label: "Tagline",
                required: true,
              },
              {
                type: "object",
                name: "address",
                label: "Address",
                fields: [
                  {
                    type: "string",
                    name: "street",
                    label: "Street Address",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "suburb",
                    label: "Suburb",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "state",
                    label: "State",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "postcode",
                    label: "Postcode",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "country",
                    label: "Country",
                    required: true,
                  },
                ],
              },
              {
                type: "object",
                name: "contact",
                label: "Contact Information",
                fields: [
                  {
                    type: "string",
                    name: "phone",
                    label: "Phone Number",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "email",
                    label: "Email Address",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "instagram",
                    label: "Instagram Handle",
                    required: true,
                  },
                ],
              },
              {
                type: "object",
                name: "hours",
                label: "Business Hours",
                fields: [
                  {
                    type: "string",
                    name: "Monday",
                    label: "Monday",
                  },
                  {
                    type: "string",
                    name: "Tuesday",
                    label: "Tuesday",
                  },
                  {
                    type: "string",
                    name: "Wednesday",
                    label: "Wednesday",
                  },
                  {
                    type: "string",
                    name: "Thursday",
                    label: "Thursday",
                  },
                  {
                    type: "string",
                    name: "Friday",
                    label: "Friday",
                  },
                  {
                    type: "string",
                    name: "Saturday",
                    label: "Saturday",
                  },
                  {
                    type: "string",
                    name: "Sunday",
                    label: "Sunday",
                  },
                ],
              },
              {
                type: "object",
                name: "coordinates",
                label: "Map Coordinates",
                fields: [
                  {
                    type: "number",
                    name: "lat",
                    label: "Latitude",
                    required: true,
                  },
                  {
                    type: "number",
                    name: "lng",
                    label: "Longitude",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true,
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "object",
                name: "ctas",
                label: "Call to Actions",
                fields: [
                  {
                    type: "object",
                    name: "primary",
                    label: "Primary CTA",
                    fields: [
                      {
                        type: "string",
                        name: "text",
                        label: "Button Text",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "action",
                        label: "Action Type",
                        required: true,
                        options: ["modal", "scroll"],
                      },
                      {
                        type: "string",
                        name: "target",
                        label: "Target (for scroll action)",
                      },
                    ],
                  },
                  {
                    type: "object",
                    name: "secondary",
                    label: "Secondary CTA",
                    fields: [
                      {
                        type: "string",
                        name: "text",
                        label: "Button Text",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "action",
                        label: "Action Type",
                        required: true,
                        options: ["modal", "scroll"],
                      },
                      {
                        type: "string",
                        name: "target",
                        label: "Target (for scroll action)",
                      },
                    ],
                  },
                ],
              },
              {
                type: "object",
                name: "images",
                label: "Hero Images",
                fields: [
                  {
                    type: "image",
                    name: "desktop",
                    label: "Desktop Image",
                    required: true,
                  },
                  {
                    type: "image",
                    name: "mobile",
                    label: "Mobile Image",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "alt",
                    label: "Alt Text",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "About Section",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Heading",
                required: true,
              },
              {
                type: "string",
                name: "story",
                label: "Story Paragraphs",
                required: true,
                list: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "object",
                name: "image",
                label: "About Image",
                fields: [
                  {
                    type: "image",
                    name: "src",
                    label: "Image",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "alt",
                    label: "Alt Text",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "menu",
            label: "Menu Section",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Main Heading",
                required: true,
              },
              {
                type: "object",
                name: "byTheGlass",
                label: "By the Glass",
                fields: [
                  {
                    type: "string",
                    name: "heading",
                    label: "Section Heading",
                    required: true,
                  },
                  {
                    type: "object",
                    name: "items",
                    label: "Glass Wines",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "name",
                        label: "Wine Name",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "producer",
                        label: "Producer",
                      },
                      {
                        type: "string",
                        name: "region",
                        label: "Region",
                      },
                      {
                        type: "string",
                        name: "price",
                        label: "Price",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: {
                          component: "textarea",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                type: "object",
                name: "byTheBottle",
                label: "By the Bottle",
                fields: [
                  {
                    type: "string",
                    name: "heading",
                    label: "Section Heading",
                    required: true,
                  },
                  {
                    type: "object",
                    name: "categories",
                    label: "Wine Categories",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "name",
                        label: "Category Name",
                        required: true,
                      },
                      {
                        type: "object",
                        name: "items",
                        label: "Wines",
                        list: true,
                        fields: [
                          {
                            type: "string",
                            name: "name",
                            label: "Wine Name",
                            required: true,
                          },
                          {
                            type: "string",
                            name: "producer",
                            label: "Producer",
                          },
                          {
                            type: "string",
                            name: "region",
                            label: "Region",
                          },
                          {
                            type: "string",
                            name: "price",
                            label: "Price",
                            required: true,
                          },
                          {
                            type: "string",
                            name: "description",
                            label: "Description",
                            ui: {
                              component: "textarea",
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "object",
                name: "snacks",
                label: "Snacks",
                fields: [
                  {
                    type: "string",
                    name: "heading",
                    label: "Section Heading",
                    required: true,
                  },
                  {
                    type: "object",
                    name: "items",
                    label: "Snack Items",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "name",
                        label: "Item Name",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: {
                          component: "textarea",
                        },
                      },
                      {
                        type: "string",
                        name: "price",
                        label: "Price",
                        required: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "hungry",
            label: "Hungry Section",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Heading",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description Paragraphs",
                required: true,
                list: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "partnerName",
                label: "Partner Name",
                required: true,
              },
              {
                type: "string",
                name: "partnerLink",
                label: "Partner Link",
              },
              {
                type: "object",
                name: "image",
                label: "Image",
                fields: [
                  {
                    type: "image",
                    name: "src",
                    label: "Image",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "alt",
                    label: "Alt Text",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "whatsOn",
            label: "What's On Section",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Heading",
                required: true,
              },
              {
                type: "object",
                name: "events",
                label: "Events",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Event Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "date",
                    label: "Date",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "time",
                    label: "Time",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    required: true,
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "boolean",
                    name: "recurring",
                    label: "Recurring Event",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "faq",
            label: "FAQ Section",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Heading",
                required: true,
              },
              {
                type: "object",
                name: "items",
                label: "FAQ Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "question",
                    label: "Question",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "answer",
                    label: "Answer",
                    required: true,
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
              {
                type: "object",
                name: "image",
                label: "Sidebar Image",
                fields: [
                  {
                    type: "image",
                    name: "src",
                    label: "Image",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "alt",
                    label: "Alt Text",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "walkInModal",
            label: "Walk-In Modal",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Heading",
                required: true,
              },
              {
                type: "string",
                name: "message",
                label: "Message Paragraphs",
                required: true,
                list: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "hoursHeading",
                label: "Hours Heading",
                required: true,
              },
              {
                type: "string",
                name: "ctaText",
                label: "CTA Button Text",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "findUs",
            label: "Find Us Section",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Heading",
                required: true,
              },
              {
                type: "string",
                name: "mapEmbedUrl",
                label: "Google Maps Embed URL",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "contactHeading",
                label: "Contact Heading",
                required: true,
              },
              {
                type: "object",
                name: "image",
                label: "Exterior Image",
                fields: [
                  {
                    type: "image",
                    name: "src",
                    label: "Image",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "alt",
                    label: "Alt Text",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "seo",
            label: "SEO Settings",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Page Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Meta Description",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "keywords",
                label: "Keywords",
                list: true,
              },
              {
                type: "image",
                name: "ogImage",
                label: "Open Graph Image",
                required: true,
              },
            ],
          },
        ],
        match: {
          include: "site-config",
        },
      },
    ],
  },
});
