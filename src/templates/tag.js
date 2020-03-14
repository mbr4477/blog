import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tag from "../components/tag"
import Image from "gatsby-image"
import { rhythm } from "../utils/typography"
import "../pages/index.css"

const TagsTemplate = ( {location, pageContext, data }) => {
  const { tag } = pageContext
  const siteTitle = data.site.siteMetadata.title
  const subtitle = data.site.siteMetadata.subtitle
  const { edges, totalCount } = data.allMarkdownRemark
  return (
    <Layout location={location} title={siteTitle} subtitle={subtitle}>
      <SEO title="" />
      <article className="index-article" style={{ 
        padding: `20px 15px 0px 15px`,
        boxShadow: `none`
      }}>
        <h1>{tag}</h1>
      </article>
      {edges.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        const image = node.frontmatter.featuredImage
        return (
        <Link style={{ boxShadow: `none`, textDecoration: `none`, color: `inherit` }} to={node.fields.slug}>
          <article key={node.fields.slug} className="index-article grow">
            {
              image ? <Image 
                fluid={image.childImageSharp.fluid}
                style={{ maxHeight: 200 }} /> : undefined
            }
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                  {title}
              </h3>
              <small>{node.frontmatter.date}</small>
              <small>{node.frontmatter.tags.map(tag => <Tag>{tag}</Tag>)}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        </Link>
        )
      })}
      <hr style={{ marginTop: rhythm(2) }}/>
    </Layout>
  )
}

export default TagsTemplate

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "\/content/blog\/"}, frontmatter: { tags: { in: [$tag] } } },
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          excerpt
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
                fluid(maxHeight: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
