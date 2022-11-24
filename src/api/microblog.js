import yaml from "js-yaml"

export class GithubMicroblog {
    constructor(user, repo) {
        this._user = user
        this._repo = repo
    }

    _getIndexURL() {
        return `https://api.github.com/repos/${this._user}/${this._repo}/contents/`
    }

    async getPostURLs() {
        const res = await window.fetch(this._getIndexURL())
        const posts = await res.json()
        return posts.map(it => ({
            date: it["name"].slice(0, it["name"].length - 3),
            url: it["download_url"],
        }))
    }

    async getPost(downloadUrl) {
        const res = await window.fetch(downloadUrl)
        let body = await res.text()
        const yamlMatches = /---\n((?:.*\n)+)---/gm.exec(body)
        let yamlHeader = {}
        if (yamlMatches !== null) {
            yamlHeader = yaml.load(yamlMatches[1])
            body = body.replace(yamlMatches[0], "")
        }
        return { content: body, metadata: yamlHeader }
    }
}