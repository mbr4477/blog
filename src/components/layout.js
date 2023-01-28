import React from "react"
import { Link } from "gatsby"
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
            marginBottom: `1em`,
            marginTop: `2em`,
            color: `black`,
            textAlign: `center`,
            fontWeight: `100`,
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
            marginBottom: `0em`,
            fontFamily: "Newsreader",
            fontWeight: `200`,
            textAlign: `center`,
            color: `black`,
            fontSize: `1.2em`
          }}
        >
          <>{subtitle}</>
        </h4>
        <nav>
          <ul>
            <li><Link to={"/microblog"}>microblog</Link></li>
            <li><Link to={"/papers"}>publications</Link></li>
            <li><Link to={"/about"}>about</Link></li>
            <li><Link to={"/now"}>now</Link></li>
            <li><Link to={"/uses"}>uses</Link></li>
          </ul>
        </nav>
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
              fontWeight: `normal`,
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
          maxWidth: 600,
          padding: `2em 2em`,
        }}
      >
        <main>{children}</main>
        <div class="copyright">
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
      </div>
    </>
  )
}

export default Layout
