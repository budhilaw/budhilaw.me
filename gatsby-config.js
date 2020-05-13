require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const siteUrl =
  process.env.URL || process.env.DEPLOY_URL || 'https://budhilaw.com'

module.exports = {
  siteMetadata: {
    title: `Ericsson Budhilaw`,
    author: `Ericsson Budhilaw`,
    description:
      `Software developer living in Sidoarjo, Indonesia. I help clients to find and create a solution to solving their problems.`,
    social: {
      twitter: '@ceritaeric',
      instagram: 'ceritaeric'
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        forceFullSync: true,
      }
    },
    `gatsby-plugin-react-helmet-async`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1200,
              linkImagesToOriginal: false,
              showCaptions: true,
              sizeByPixelDensity: true,
              wrapperStyle: '',
            },
          },
        ],
      },
    },
    `gatsby-plugin-tailwindcss`,
    {
      resolve: `gatsby-plugin-tailwindcss`
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        //
      }
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Accepts all options defined by `babel-plugin-emotion` plugin.
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        // Accepts all options defined by `gatsby-plugin-postcss` plugin.
      },
    },
  ],
}
