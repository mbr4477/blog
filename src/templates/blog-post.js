import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Tag from "../components/tag"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const tags = this.props.data.markdownRemark.frontmatter.tags
    const image = this.props.data.markdownRemark.frontmatter.featuredImage
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            <h1
              style={{
                marginTop: `1em`,
                textAlign: "center",
                fontWeight: 100,
                fontSize: "3em",
                lineHeight: `1.25em`
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                display: `block`,
                marginBottom: `1em`,
                textAlign: "center"
              }}
            >
              <p>{post.frontmatter.date}</p>
              <p style={{
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "justify",
                fontSize: "1em",
                width: `60%`
              }}><em>{post.frontmatter.description}</em></p>
              <p><small>{tags ? tags.map((tag) => <Tag key={tag}>{tag}</Tag>) : <></>}</small></p>
              <p style={{
                fontSize: "2em",
                color: "#ddd",
                letterSpacing: 50,
                marginRight: -50,
                textAlign: "center",
                marginTop: `1em`,
                marginBottom: `1em`,
              }}>&#10045;&#10045;&#10045;</p>
            </p>
          </header>
          <section style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: post.html }} />
          <footer>
            <hr
              style={{
                marginBottom: `1em`,
              }}
            />
            <Bio />
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
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
`
