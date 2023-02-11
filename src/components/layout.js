import React from "react"
import { Link } from "gatsby"
import "katex/dist/katex.min.css"
import Bio from "../components/bio"

const Layout = (props) => {
  const { location, title, subtitle, children } = props
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  // const headerImage = data.header
  const isRoot = location.pathname === rootPath

  if (isRoot) {
    header = (
      <div className="index-header">
        <h1 className="index-header-title">
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
        <h4 className="index-header-subtitle">
          <>{subtitle}</>
        </h4>
        <div className="index-header-bio">
          <Bio />
        </div>
        <nav>
          <ul>
            <li><Link to={"/microblog"}>microblog</Link></li>
            <li><Link to={"/papers"}>publications</Link></li>
            <li><Link to={"/about"}>about</Link></li>
            <li><Link to={"/now"}>now</Link></li>
            <li><Link to={"/uses"}>uses</Link></li>
          </ul>
        </nav>
      </div>
    )
  } else {
    header = (
      <div className="header-bar-article">
        <h3 className="header-title-article">
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
    )
  }
  return (
    <div className={(isRoot) ? "index" : "detail"}>
      <header>{header}</header>
      <div className="content">
        <main>{children}</main>
        <div class="copyright">
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
      </div>
    </div>
  )
}

export default Layout
