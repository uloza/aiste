import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogArchive = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      <hr />
      <Seo title="All posts" />
      <ul>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const wordCount = post.wordCount.words
          
          return (
            <li key={post.fields.slug}>
              <Link to={post.fields.slug} itemProp="url">
                <span itemProp="headline">{title}</span>
              </Link> <small> [{wordCount} words]</small>
            </li>
          )
        })}
      </ul>
      <hr/>
    </Layout>
  )
}

export default BlogArchive

export const query = graphql`
  {
    site {
      id
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: {order: DESC, fields: id}
      filter: {frontmatter: {status: {eq: "publish"}}}
    ) {
      nodes {
        wordCount {
          words
        }
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
`