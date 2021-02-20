import React from "react"
import { withPrefix, Link } from "gatsby"
import Helmet from "react-helmet"
import { rhythm, scale } from "../utils/typography"
import "katex/dist/katex.min.css"

const Layout = (props) => {
  const { location, title, subtitle, children } = props
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  // const headerImage = data.header
  const isRoot = location.pathname === rootPath

  const emojiCodes = [
    0x1f680,
    0x2615,
    0x1f4bb,
    0x26be,
    0x1f311
  ]

  if (isRoot) {
    header = (
      <>
      <div
        style={{
          position: `absolute`,
          top: 0,
          left: 0,
          width: `100%`,
          height: 300,
          zIndex: -1,
          background: `#222`
        }}/>
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(0.5),
          marginTop: rhythm(1),
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
          {`${emojiCodes.map(it => String.fromCodePoint(it)).join(' ')}`}
          <p/>
          {title.toLowerCase()}
          <br/>
        </Link>
      </h1>
      <h4
        style={{
          marginTop: 10,
          marginBottom: rhythm(0.5),
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
      <div>
        <div
          id={`header-bar`}
          style={{
            padding: `20px 10%`,
          }}>
          <h3
            style={{
              fontWeight: 400,
              margin: 0,
              color: `black`,
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
          maxWidth: rhythm(25),
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
