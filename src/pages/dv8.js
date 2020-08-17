import React from "react"
import { withPrefix, Link, graphql, useStaticQuery } from "gatsby"
import "./dv8.css"
import * as status from "./dv8status.js"

class DV8 extends React.Component {
    render() {
        const getNextSaturday = () => {
            const now = new Date()
            const dayOfWeek = now.getDay()
            now.setDate(now.getDate() + (6 - now.getDay()) % 7)
            return now.toLocaleDateString('sv')
        }
        const nextSaturday = getNextSaturday()
        console.log(nextSaturday)
        const active = status.active && !status.except.includes(nextSaturday)
        return (<div>
            <h1 className="dv8">
                { active ? `Yes` : `No` }
            </h1>
        </div>)
    }
}

export default DV8
