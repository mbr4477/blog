import { useLocation } from "@reach/router"
import { graphql, Link } from "gatsby"
import moment from "moment"
import queryString from "query-string"
import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { GithubMicroblog } from "../api/microblog"
import Layout from "../components/layout"
import "./microblog.css"
import "./spinner.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faLink } from "@fortawesome/free-solid-svg-icons"
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

function Spinner(props) {
    return <div style={{
        width: `20px`,
        height: `20px`,
        borderRadius: `40px`,
        border: `4px solid slateblue`,
        borderColor: `slateblue slateblue slateblue transparent`,
        animation: `spinner 1.2s linear infinite`,
        marginRight: `auto`,
        marginLeft: `auto`
    }}>
    </div>
}

function Micropost(props) {
    const date = moment(props.isoDate)
    const formattedDate = (date.isSame(moment(), "day")) ?
        date.fromNow() : `${date.format("h:mm A")} · ${date.format("MMM D, YYYY")}`
    return <article className="micropost">
        <a id={props.isoDate} />
        <ReactMarkdown children={props.children} />
        <div className="footer">
            <Link
                className="micropost-share-link"
                to={`/microblog?id=${props.isoDate}`}><FontAwesomeIcon icon={faLink} /></Link>
            <a
                className="micropost-share-link"
                target="_blank"
                rel="noreferrer"
                href={`https://twitter.com/intent/tweet?text="${props.children}"&url=https://mruss.dev/microblog?id=${props.isoDate}`}
            ><FontAwesomeIcon icon={faTwitter} /></a>
            <div className="spacer"></div>
            <div className="date">{formattedDate}</div>
        </div>
    </article>
}

function Microblog(props) {
    const microblog = new GithubMicroblog("mbr4477", "microblog")
    const [posts, setPosts] = useState(null)
    let postId = null

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
                console.log(posts)
                setPosts(posts)
            })
    }, [])

    const location = useLocation()
    if (location.search) {
        const params = queryString.parse(location.search)
        postId = params["id"]
        console.log(postId)
    }

    const { data } = props
    const siteTitle = data.site.siteMetadata.title
    const subtitle = data.site.siteMetadata.subtitle
    return <Layout
        location={props.location}
        title={siteTitle}
        subtitle={subtitle}>
        {
            postId ? <Link
                to="/microblog"
                className="microblog-font"
                style={{ display: `block`, marginBottom: `10px` }}>&larr; @mrussdev</Link>
                : <h1 className="microblog-title">@mrussdev</h1>
        }
        {
            posts ?
                posts
                    .filter(p => postId ? (p.date === postId) : true)
                    .map(p => <Micropost
                        key={p.date}
                        isoDate={p.date}>
                        {p.content}
                    </Micropost>)
                : <Spinner />
        }
    </Layout>
}

export default Microblog