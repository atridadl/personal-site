const { getPosts, generatePaginationPages } = require("./theme/serverUtils")

async function config() {
    const pageSize = 2
    await generatePaginationPages(pageSize)
    return {
        title: "Atri's Blog",
        base:"/",
        description: "I write things here sometimes.",
        themeConfig: {
            posts: await getPosts(),
            pageSize: pageSize,
            website: "https://atridad.ca",
            nav: [
                { text: "Home", link: "/" },
                { text: "Archives", link: "/pages/archives" },
                { text: "Tags", link: "/pages/tags" },
                { text: "Back to Site ↩️", link: "https://atridad.ca" }
            ]
        },
        srcExclude: ["README.md"]
    }
}

module.exports = config()
