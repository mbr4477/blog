import React from "react"
import { withPrefix, Link, graphql, useStaticQuery } from "gatsby"
import Helmet from "react-helmet"
import { rhythm, scale } from "../utils/typography"
import Image from "gatsby-image"
import "./layout.css"
import "katex/dist/katex.min.css"

const Layout = (props) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      header: file(absolutePath: { regex: "/header.jpg/" }) {
        childImageSharp {
          fluid(maxHeight: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const { location, title, subtitle, children } = props
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  const headerImage = data.header
  const isRoot = location.pathname === rootPath

  if (isRoot) {
    header = (
      <>
      <Image
        fluid={headerImage.childImageSharp.fluid}
        style={{
          position: `absolute`,
          top: 0,
          left: 0,
          width: `100%`,
          height: 350,
          objectFit: `cover`,
          objectPosition: `center center`,
          zIndex: -1,
          filter: `brightness(70%)`
        }}/>
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(0.5),
          marginTop: rhythm(3),
          color: `white`,
          textAlign: `center`
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`
          }}
          to={`/`}
        >
          {title.toLowerCase()}
        </Link>
      </h1>
      <h4
        style={{
          marginTop: 10,
          marginBottom: rhythm(3),
          fontWeight: `normal`,
          textAlign: `center`,
          color: `white`
        }}
      >
        <>{subtitle}</>
      </h4>
      </>
    )
  } else {
    header = (
      <div
        style={{
          background: `black`,
          position: `fixed`,
          left: 0,
          right: 0
        }}>
        <Helmet>
          <script src={withPrefix('dynamic_scroll.js')} type="text/javascript" />
        </Helmet>
        <div
          id={`header-bar`}
          style={{
            padding: `20px 10%`,
          }}>
          <h3
            style={{
              fontWeight: 400,
              margin: 0,
              color: `white`,
              fontSize: `1.5em`
            }}>
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              {title.toLowerCase()}
            </Link>
          </h3>
        </div>
        <div
          id={`progress-bar`}
          style={{
            width: `0vw`,
            height: `4px`,
            background: `#00AEFF`
          }}>
        </div>
      </div>
    )
  }
  return (
    <>
      <header>{header}</header>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(30),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <main>{children}</main>
        <footer style={{ marginTop: 20 }}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
