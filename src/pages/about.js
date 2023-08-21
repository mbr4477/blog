import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      copyButtonText: "Copy Email to Clipboard",
      copyButtonExtraClass: "",
      copyButtonDisabled: false
    }
  }
  copyEmail() {
    navigator.clipboard.writeText("matthew@mruss.dev").then((res) => {
      this.setState({
        copyButtonText: "Email Copied",
        copyButtonDisabled: true
      })
      setTimeout(() => {
        this.setState({
          copyButtonText: "Copy Email to Clipboard",
          copyButtonDisabled: false
        })
      }, 5000)
    })
  }
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const subtitle = data.site.siteMetadata.subtitle
    const author = data.site.siteMetadata.author

    return (
      <Layout location={this.props.location} title={siteTitle} subtitle={subtitle}>
        <SEO title="About" />
        <Link to={"/"} className="about-home-link">&larr; Home</Link>
        <div style={{
          textAlign: `center`,
          marginTop: `2em`
        }}>
          <GatsbyImage
            image={data.engaged.childImageSharp.gatsbyImageData}
            alt={"Emma and I."}
            style={{
              width: `200px`,
              height: `200px`, 
              borderRadius: `50%`,
              display: `inline-block`,
            }}
          />
          <h2>
            I'm interested in everything.
          </h2>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <button
            className="copy-email-button"
            disabled={this.state.copyButtonDisabled}
            onClick={(e) => {
              this.copyEmail()
            }}>
            {this.state.copyButtonText}
          </button>
        </div>

        <p>
          I'm Emma's husband, a Data Scientist for the Cleveland Guardians MLB team,
          and have my doctorate in Electrical Engineering.
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
          I code in Python (PyTorch, PyTorch Lightning, Keras, NumPy, Pandas, SciPy, Matplotlib, etc.), some C/C++, MATLAB, Java, Kotlin, &amp; JavaScript (+ a little React).
          I am learning more and more SQL by the hour.
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
    engaged: file(absolutePath: { regex: "/engaged-banner.jpg/" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED, width: 512)
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
