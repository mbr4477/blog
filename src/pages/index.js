import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Tag from "../components/tag"
import { GatsbyImage } from "gatsby-plugin-image"
import "./index.css"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const subtitle = data.site.siteMetadata.subtitle
    const posts = data.allMarkdownRemark.edges
    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        subtitle={subtitle}
      >
        <SEO title="All posts" />
        <article className="index-article index-bio">
          <Bio />
        </article>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const image = node.frontmatter.featuredImage
          return (
            <article key={node.fields.slug} className="index-article">
              {image ? (
                <GatsbyImage
                  image={image.childImageSharp.gatsbyImageData}
                  style={{ maxHeight: 200 }}
                />
              ) : (
                undefined
              )}
              <div className="index-article-header">
                <h3>
                  <Link
                    style={{
                      boxShadow: `none`,
                      textDecoration: `none`,
                      color: `inherit`,
                    }}
                    to={node.fields.slug}
                  >
                    {title}
                  </Link>
                </h3>
                <small className="index-article-date">{node.frontmatter.date}</small>
                <small>
                  {node.frontmatter.tags ? (
                    node.frontmatter.tags.map(tag => <Tag key={tag}>{tag}</Tag>)
                  ) : (
                    <></>
                  )}
                </small>
              </div>
              <section className="index-article-content">
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/blog/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt(pruneLength: 500)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: FIXED, width: 600)
              }
            }
          }
        }
      }
    }
  }
`
