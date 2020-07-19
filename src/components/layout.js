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
      profile: file(absolutePath: { regex: "/profile-new.jpg/" }) {
        childImageSharp {
          fluid(maxHeight: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const { location, title, subtitle, children } = props
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  const profileImage = data.profile
  const isRoot = location.pathname === rootPath

  if (isRoot) {
    header = (
      <>
      <div
        style={{
          height: rhythm(10),
          width: `100vw`,
          position: `absolute`,
          top: 0,
          right: 0,
          background: `var(--tertiary-color)`,
          zIndex: -1
        }}>
      </div>
      <Link to="/about">
        <img
          className={`home-header-image`}
          src={require('../../content/assets/profile-new.jpg')}
          fluid={profileImage.childImageSharp.fluid}
          style={{
            width: `200pt`,
            height: `200pt`,
            display: `block`,
            borderRadius: `100pt`,
            marginTop: `50pt`,
            marginLeft: `auto`,
            marginRight: `auto`,
            marginBottom: `25pt`,
            objectFit: `cover`,
            objectPosition: `center center`,
            borderColor: `var(--primary-color)`,
            borderWidth: `0px`,
            borderStyle: `solid`,
            zIndex: -1,
          }}/>
      </Link>
      <h1
        style={{
          ...scale(1.6),
          marginBottom: rhythm(1),
          color: `var(--primary-color)`,
          textAlign: `center`,
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
          {title}
        </Link>
      </h1>
      <h4
        style={{
          marginTop: 10,
          marginBottom: rhythm(0),
          marginRight: `auto`,
          marginLeft: `auto`,
          fontWeight: `700`,
          textAlign: `center`,
          color: `var(--primary-color)`,
          background: `var(--secondary-color)`,
          width: `275px`,
          padding: `10px`,
          color: `white`,
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
          right: 0,
          zIndex: 1
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
              {title}
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
          maxWidth: rhythm(35),
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
