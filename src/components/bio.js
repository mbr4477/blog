/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile.jpg/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 100, height: 100)
        }
      }
      site {
        siteMetadata {
          author
          social {
            github
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div className="bio">
      <GatsbyImage
        image={data.avatar.childImageSharp.gatsbyImageData}
        alt={author}
        className="bio-image-wrapper"
        imgClassName="bio-image"
      />
      <p className="bio-content">
        Written by <strong>{author}</strong> who follows Jesus and studies machine learning at the University of Kentucky.
        {` `}
        <Link to="/about">Get to know him</Link> or check out his <a href={`https://github.com/${social.github}`}>
          projects on GitHub
        </a>.
      </p>
    </div>
  )
}

export default Bio
