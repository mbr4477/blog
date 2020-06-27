import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

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
    document.onscroll = undefined
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
    const scrollHandler = () => {
      const bar = document.querySelector('#header-bar')
      const padding = 10*(1 - Math.min(1., window.scrollY / 200.0)) + 10
      const fontSize = 0.25*(1 - Math.min(1., window.scrollY / 200.0)) + 1.25
      bar.style.paddingBottom = `${padding}px`
      bar.style.paddingTop = `${padding}px`
      bar.querySelector('h3').style.fontSize = `${fontSize}em`
      console.log(bar.querySelector('h3'))

      const progress = document.querySelector('#progress-bar')
      const percent = window.scrollY / (document.body.offsetHeight - window.innerHeight);
      progress.style.width = `${percent*100}vw`
    }
    document.onscroll = scrollHandler
    header = (
      <div
        style={{
          background: `black`,
          position: `fixed`,
          left: 0,
          right: 0
        }}>
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
