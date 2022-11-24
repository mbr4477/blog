import { graphql } from "gatsby"
import "./microblog.css"
import moment from "moment"
import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { GithubMicroblog } from "../api/microblog"
import Layout from "../components/layout"

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
  }
`

function Micropost(props) {
    const date = moment(props.isoDate)
    const formattedDate = (date.isSame(moment(), "day")) ?
        date.fromNow() : `${date.format("h:mm A")} · ${date.format("MMM D, YYYY")}`
    return <article className="micropost">
        <ReactMarkdown children={props.children} />
        <div className="date">{formattedDate}</div>
    </article>
}

function Microblog(props) {
    const microblog = new GithubMicroblog("mbr4477", "microblog")
    const [posts, setPosts] = useState([])

    useEffect(() => {
        microblog
            .getPostURLs()
            .then(postURLs => Promise.all(
                postURLs.map(it => microblog
                    .getPost(it["url"])
                    .then(data => ({
                        ...data,
                        date: it["date"]
                    }))
                )))
            .then(posts => {
                posts.sort((a, b) => {
                    if (a["date"] > b["date"]) {
                        return -1
                    }
                    return 1
                })
                setPosts(posts)
            })
    }, [])

    const { data } = props
    const siteTitle = data.site.siteMetadata.title
    const subtitle = data.site.siteMetadata.subtitle
    return <Layout
        location={props.location}
        title={siteTitle}
        subtitle={subtitle}>
        <h1 className="microblog-title">@mrussdev</h1>
        {posts.map(p => <Micropost
            key={p.date}
            isoDate={p.date}>
            {p.content}
        </Micropost>)}
    </Layout>
}

export default Microblog