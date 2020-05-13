const path = require("path")

exports.onCreateWebpackConfig = ({actions, getConfig}) => {
  // Hack due to Tailwind ^1.1.0 using `reduce-css-calc` which assumes node
  // https://github.com/bradlc/babel-plugin-tailwind-components/issues/39#issuecomment-526892633
  const config = getConfig();
  config.node = {
    fs: 'empty'
  };
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('src/templates/blog-post.js')

    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if(result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug
            }
          })
        })
      })
    )

    // resolve(
    //   graphql(
    //     `
    //       query {
    //         allContentfulBlogPost {
    //           edges {
    //             node {
    //               slug
    //             }
    //           }
    //         }
    //       }
    //     `
    //   )
    // ).then(result => {
    //   if(result.errors) {
    //     console.log(result.errors)
    //     reject(result.errors)
    //   }
    //
    //   const posts = result.data.allContentfulBlogPost.edges
    //   posts.forEach((post, index) => {
    //     createPage({
    //       path: `/blog/${post.node.slug}/`,
    //       component: blogPost,
    //       context: {
    //         slug: post.node.slug
    //       }
    //     })
    //   })
    // })
  })
}