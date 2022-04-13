import { defineConfig } from "vitepress";

const { genMetaData, getPosts } = require("./getPosts");

genMetaData(getPosts);

export default defineConfig({
  markdown: {
    anchor: { permalink: false },
    linkify: true,
    toc: { includeLevel: [1, 2, 3] },
  },
  title: "Atri's Blog",
  description: "I write things here sometimes...",
  themeConfig: {
    splitRow: true,
    feedOnHomepage: true,
    siteUrl: "https://blog.atridad.ca",
    twitterUsername: "@AtridadL",
    nav: [
      {
        link: "/blog/index.html",
        text: "Blog",
      },
      {
        link: "https://atridad.ca",
        text: "Main Site",
      },
    ],
    comments: false,
    cusdis_host: "",
    cusdis_id: "",
  },
  vite: {
    define: {
      __VUE_OPTIONS_API__: false,
    },
    build: {
      minify: "terser",
    },
  },
});
