import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const PreviewBlog = ({ blog }) => (
  <div className="container">
    <h1>
      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
    </h1>
    <small>{blog.publishedDate}</small>
    <Img
      alt={blog.title}
      title={blog.title}
      fluid={blog.featuredImage.fluid}
    />
  </div>
)

export default PreviewBlog