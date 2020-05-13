import React from 'react'
import get from 'lodash/get'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Img from 'gatsby-image'
import SEO from '../components/seo'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS } from "@contentful/rich-text-types"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this, 'props.data.contentfulBlogPost')
    return (
      <Layout>
        <SEO
          title={post.title}
          image={post.featuredImage.fluid}
          pathname={this.props.location.pathname}
        />
        <article id="main">
          <header>
            <h1>{post.title}</h1>
            <small>{post.pusblishedDate}</small>
          </header>
          <Img
            alt={post.title}
            title={post.title}
            fluid={post.featuredImage.fluid}
          />
          <main>
            {documentToReactComponents(post.body.json, options)}
          </main>
        </article>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        contentfulBlogPost(slug: { eq: $slug }) {
            title
            slug
            publishedDate(formatString: "MMMM Do, YYYY")
            tags
            featuredImage {
                fluid(maxWidth: 1600, resizingBehavior: SCALE) {
                    ...GatsbyContentfulFluid_tracedSVG
                }
            }
            body {
                json
            }
        }
    }
`
