require('dotenv').config();


const { spaceId, accessToken } = process.env;


module.exports = {
  siteMetadata: {
    title: 'SEIR Flex 2/22/2022 - "Sasquatch"',
    author: "Daniel Scott",
    currentYear: new Date().getFullYear(),
    description:
      "An interactive website for students currently enrolled in the General Assembly Software Engineering Immersive Remote Flex Program",
    keywords:
      "software engineer, software engineering, coding, javascript, html, css",
    navigationLinks: [
      { title: "Home", slug: "/" },
      { title: "Course Details", slug: "/course-details" },
      // {title: 'Coding Challenges', slug: '/coding-challenges'},
    ],
    homeworkSubmissionLink: {
      title: "Submit Homework",
      href: "https://forms.gle/Hzzc53H3Ya8SsGvf6",
    },
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    // TODO: need to figure out how to move to contentful
    //{
    //   resolve: "gatsby-source-contentful",
    //   options: {
    //     spaceId,
    //     accessToken
    //   }
    // },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout`),
      },
    },
    {
      resolve: `gatsby-plugin-html-attributes`,
      options: {
        lang: `en`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `page-content`,
        path: `${__dirname}/src/page-content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `Course Materials`,
        path: `${__dirname}/src/course-materials`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (e.g. <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (e.g. for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: "language-",
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in gatsby-browser.js
              // right after importing the prism color scheme:
              //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: true,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: true,
              // This adds a new language definition to Prism or extend an already
              // existing language definition. More details on this option can be
              // found under the header "Add new language definition or extend an
              // existing language" below.
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              // By default the HTML entities <>&'" are escaped.
              // Add additional HTML escapes by providing a mapping
              // of HTML entities and their escape value IE: { '}': '&#123;' }
              escapeEntities: {},
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
            },
          },
          {
            resolve: `gatsby-plugin-scroll-indicator`,
            options: {
              color: "#dc143c",
              height: "4px",
              zIndex: `9999`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
          },
        ],
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        // defaultCrumb: optional To create a default crumb
        // see Click Tracking default crumb example below
        defaultCrumb: {
          location: {
            pathname: "/",
          },
          crumbSeparator: " / ",
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `General Assembly - SEIR Flex Program`,
        short_name: `GA`,
        description: `Our student-facing website expressed as a progressive web app!`,
        lang: `en`,
        display: `standalone`,
        icon: `static/ga-logo.svg`,
        start_url: `/`,
        background_color: `#222222`,
        theme_color: `#222222`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`],
      },
    },
  ],
}
