import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import "katex/dist/katex.min.css"

const Layout = (props) => {
  const { location, title, subtitle, children } = props
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  // const headerImage = data.header
  const isRoot = location.pathname === rootPath

  if (isRoot) {
    header = (
      <>
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1),
            marginTop: rhythm(2),
            color: `black`,
            textAlign: `center`,
            fontWeight: `normal`,
            fontSize: `3em`
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
            <p />
            {title.toLowerCase()}
            <br />
          </Link>
        </h1>
        <h4
          style={{
            marginTop: 10,
            marginBottom: rhythm(0),
            fontFamily: "Newsreader",
            fontWeight: `200`,
            textAlign: `center`,
            color: `black`,
            fontSize: `1.2em`
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
