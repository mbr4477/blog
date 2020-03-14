import React from "react"
import { Link } from "gatsby"
import "./tag.css"
import _ from "lodash"

class Tag extends React.Component {
    render() {
        return (
            <Link className="tag" to={`/tags/${_.kebabCase(this.props.children)}`}>
                #{this.props.children}
            </Link>
        )
    }
}

export default Tag