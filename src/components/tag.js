import React from "react"
import { Link } from "gatsby"
import "./tag.css"

class Tag extends React.Component {
    render() {
        return (
            <Link className="tag">
                #{this.props.children}
            </Link>
        )
    }
}

export default Tag