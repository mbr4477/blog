import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import "./layout.css"

class Layout extends React.Component {
  render() {
    const { location, title, subtitle, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <>
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(0.5),
            marginTop: 0,
          }}
        >
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
        </h1>
        <h4
          style={{
            marginTop: 10,
            fontWeight: `normal`,
          }}
        >
          <>{subtitle}</>
        </h4>
        </>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Playfair Display',
            marginTop: 0,
            fontWeight: 700,
          }}
        >
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
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer style={{ marginTop: 20 }}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
