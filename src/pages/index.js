import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tag from "../components/tag"
import { GatsbyImage } from "gatsby-plugin-image"
import "./theme.css"

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
        <div className="index-posts">
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
                  <h3 className="index-article-title">
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
                  <span className="index-article-date">{node.frontmatter.date}</span>
                  <span className="index-article-tags">
                    {node.frontmatter.tags ? (
                      node.frontmatter.tags.map(tag => <Tag key={tag}>{tag}</Tag>)
                    ) : (
                      <></>
                    )}
                  </span>
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
        </div>
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
