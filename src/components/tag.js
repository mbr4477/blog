import React from "react"
import { Link } from "gatsby"
import _ from "lodash"

class Tag extends React.Component {
    render() {
        return (
            <Link className="tag" to={`/tags/${_.kebabCase(this.props.children)}`} style={{
                margin: "2px",
                border: "none",
                padding: "2px 4px",
                color: "#aaa",
                textTransform: "uppercase",
                textDecoration: "none",
                boxShadow: "none",
                fontFamily: "sans-serif"
            }}>
                #{this.props.children}
            </Link>
        )
    }
}

export default Tag