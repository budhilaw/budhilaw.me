import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import get from 'lodash/get'

import Img from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import PreviewBlog from '../components/blog-preview'

class BlogIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    return (
      <Layout>
        <SEO
          title="Blog - Ericsson Budhilaw"
          description="A collection of articles about design, workflows and other things."
          keywords={[`design`, `blog`, `ui`, `ux`, `gatsby`, `react`]}
        />
        <header>
          <h1>Blog</h1>
        </header>
        <main>
          {posts.map(({ node }) => {
              return <PreviewBlog blog={node} key={ node.slug } />
          })}
        </main>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
    query BlogQuery {
        allContentfulBlogPost(
            sort: { fields: [publishedDate], order: [DESC] }
            limit: 6
        ) {
            edges {
                node {
                    title
                    slug
                    publishedDate(formatString: "MMMM Do, YYYY")
                    tags
                    featuredImage {
                        fluid(maxWidth: 800, maxHeight: 560, resizingBehavior: FILL) {
                            ...GatsbyContentfulFluid_tracedSVG
                        }
                    }
                    excerpt {
                        childMarkdownRemark {
                            excerpt
                        }
                    }
                }
            }
        }
    }
`

// const Blog = () => {
//   const data = useStaticQuery(
//     graphql`
//         query{
//             allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }){
//                 edges {
//                     node {
//                         title
//                         id
//                         slug
//                         publishedDate(formatString: "Do MMMM, YYYY")
//                         featuredImage {
//                             fluid(maxWidth: 750) {
//                                 ...GatsbyContentfulFluid
//                             }
//                         }
//                         excerpt {
//                             childMarkdownRemark {
//                                 excerpt(pruneLength: 150)
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     `
//   )
//
//   return (
//     <Layout>
//       <SEO title="Blog" />
//       <p><Link to="/">Go back to the homepage</Link></p>
//       <ul className="posts">
//         {data.allContentfulBlogPost.edges.map(edge => {
//           return (
//             <li className="post" key={edge.node.id}>
//               <h2>
//                 <Link to={`/blog/${edge.node.slug}/`}>
//                   {edge.node.title}
//                 </Link>
//               </h2>
//               <div className="meta">
//                 <span>Posted on {edge.node.publishedDate}</span>
//               </div>
//               {edge.node.featuredImage && (
//                 <Img
//                   className="featured"
//                   fluid={edge.node.featuredImage.fluid}
//                   alt={edge.node.title}
//                 />
//               )}
//               <p className="excerpt">
//                 {edge.node.excerpt.childMarkdownRemark.excerpt}
//               </p>
//               <div className="button">
//                 <Link to={`/blog/${edge.node.slug}/`}>Read More</Link>
//               </div>
//             </li>
//           )
//         })}
//       </ul>
//     </Layout>
//   )
// }
// export default Blog

// export const pageQuery = graphql`
//   query BlogQuery {
//       allContentfulBlogPost(
//           sort: { fields: [publishedDate], order: DESC }
//           limit: 6
//       ) {
//           edges {
//               node {
//                   title
//                   slug
//                   publishedDate(formatString: "MMMM Do, YYYY")
//                   tags
//                   featuredImage {
//                       fluid(maxWidth: 800, maxHeight: 560, resizingBehavior: FILL) {
//                           ...GatsbyContentfulFluid_tracedSVG
//                       }
//                   }
//               }
//           }
//       }
//   }
// `