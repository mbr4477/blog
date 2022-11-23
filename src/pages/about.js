import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

class About extends React.Component {
  copyEmail() {
    navigator.clipboard.writeText("matthew@mruss.dev").then()
  }
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
          <GatsbyImage
            image={data.avatar.childImageSharp.gatsbyImageData}
            alt={author}
            style={{
              marginRight: 25,
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
          <h2>
            I'm interested in everything.
          </h2>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <button onClick={(e) => { this.copyEmail() }}>Copy Email to Clipboard</button>
        </div>
        <p>
          I'm an Electrical Engineering/Machine Learning PhD Candidate at the University of Kentucky
          and recent six-tour software intern at NASA Johnson Space Center.
        </p>
        <p>
          I like embedded systems, spaceflight, cosmology, apologetics, music production, The Ohio State Buckeyes, Major League Baseball, machine learning, robots, software development, startups, entrepreneurship, traveling, puns, and coffee.
        </p>
        <p>
          I've built satellite attitude control software, mobile apps, desktop apps, autonomous robots,
          quantum cryptography simulations for the USAF/AFIT, various projects at NASA, and many personal projects.
          My deep learning work includes image segmentation, fault monitoring from high-frequency sensing, transfer learning, continual learning, and more with CNNs, RNNs, etc.
        </p>
        <p>
          I code in Python (PyTorch, PyTorch Lightning, NumPy, Pandas, SciPy, Matplotlib, etc.), some C/C++, MATLAB, Java, Kotlin, &amp; JavaScript (+ a little React).
          Clean Architecture is cool.
          I build with Arduino, Raspberry Pi, Anycubic Kossel, Linux, VS Code, and Logic Pro X.
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
        gatsbyImageData(layout: FIXED, width: 200, height: 200)
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
