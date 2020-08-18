import React from "react"
import { withPrefix, Link, graphql, useStaticQuery } from "gatsby"
import "./dv8.css"
import moment from "moment"
import Bio from "../components/bio"

class DV8 extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    componentDidMount() {
        fetch('/dv8status.json')
            .then(res => res.json())
            .then(status => {
                this.setState({ status })
            })
    }
    render() {
        if (this.state.status) {
            const status = this.state.status
            const getNextSaturday = () => {
                const now = moment()
                const nextDay = now.set("date", now.date() + (status.weekday - now.day()) % 7)
                return nextDay
            }
            const nextDay = getNextSaturday()
            const isoNextDay = nextDay.format("YYYY-MM-DD")
            const active = status.active && !status.except.includes(isoNextDay)
            const dateString = nextDay.format("dddd, MMMM Do, YYYY.")
            let times = status.defaultTimes
            if (status.adjustedTimes[isoNextDay] !== undefined) {
                times = status.adjustedTimes[isoNextDay]
            }
            return (<div className="dv8 container">
                <div className="dv8 content">
                    <div>
                        <hr className="dv8"/>
                        <h1 className="dv8">
                            { active ? `Yes` : `No` }
                        </h1>
                        <p className="dv8 message">
                            { active ? `${status.message.active} from ${times} on ${dateString}` : `${status.message.inactive} on ${dateString}` }
                        </p>
                        <hr className="dv8"/>
                    </div>
                    <p className="dv8 desc">Meet me for breakfast at DV8 Kitchen to talk Jesus, sports, science & engineering, or just hang out. Check this page to make sure I'll be there.</p>
                    <Bio/>
                </div>
            </div>)
        }
        return (<div></div>)
    }
}

export default DV8
