import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { Button } from "carbon-components-react"

class About extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const subtitle = data.site.siteMetadata.subtitle
    const author = data.site.siteMetadata.author

    return (
      <Layout location={this.props.location} title={siteTitle} subtitle={subtitle}>
        <SEO title="About" />
        <div style={{
          textAlign: `center`
        }}>
          <Image
            fixed={data.avatar.childImageSharp.fixed}
            alt={author}
            style={{
              marginRight: rhythm(1 / 2),
              marginBottom: 0,
              minWidth: 200,
              borderRadius: `100%`,
              borderWidth: `10px`,
              borderColor: `#eee`,
              borderStyle: `solid`,
            }}
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
          <h2 style={{
            fontFamily: `Playfair Display`

          }}>
            I'm interested in everything.
          </h2>
        </div>
        <Button>Carbon Button</Button>
        <p>
          I'm a machine learning PhD student at the University of Kentucky and an intern at NASA Johnson Space Center.
        </p>
        <p>
          I like embedded systems, spaceflight, cosmology, apologetics, music production, The Ohio State Buckeyes, the New York Yankees, machine learning, robots, software development, startups, entrepreneurship, traveling, puns, and coffee.
        </p>
        <p>
          I've built satellite attitude control software, quantum cryptography simulations, NASA test software, mobile apps, desktop apps, and autonomous ground vehicles. 
        </p>
        <p>
          I code in Python, C/C++, MATLAB, Java, Kotlin, &amp; JavaScript (+ React). I build with Arduino, Raspberry Pi, Anycubic Kossel, Linux, VS Code and Logic Pro X.
        </p>
        <p>
          I should probably use Twitter, but I don't.
        </p>
      </Layout>
    )
  }
}

export default About

export const pageQuery = graphql`
  query {
    avatar: file(absolutePath: { regex: "/profile-kid.jpg/" }) {
      childImageSharp {
        fixed(width: 200, height: 200) {
        ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
        subtitle
        author
      }
    }
  }
`
