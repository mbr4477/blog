import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import Image from "gatsby-image"
import "./layout.css"

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

  if (location.pathname === rootPath) {
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
      <h3
        style={{
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
        maxWidth: rhythm(30),
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

export default Layout