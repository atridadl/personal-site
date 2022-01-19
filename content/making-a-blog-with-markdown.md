---
title: Making a blog with Markdown!
date: 01/18/2022
---
Making a blog has often become bloated, requiring that most people choose off the shelf solutions such as Wordpress or Ghost CMS, to name a few. While these platforms are great for those who just want to focus on the content and have a simpler experience, building a custom site can provide a clean and highly customizable experience.

# Headless CMS
A headless CMS is a content management system such as Wordpress that is headless, meaning it serves as the backend of your blog, but you need to provide the frontend, often in the form of a static site. This gives you the customizability of a custom site with the power of a CMS. One issue: vendor lock-in. You are at the mercy of whichever provider you use as your headless CMS, meaning often time your content is difficult to move around if needed.

# Markdown!
Enter Markdown, a markup language that is easy to read and robust enough for blog posts. Markdown can be easily written in any text editor, although if you use macOS I would definitely recommend iA Writer.

I will go into further detail in a future post, but I use Nuxt.js to build out my website, with their Content module to load Markdown as HTML when generating the website. The best part about this approach is the ease of writing content, as well as the performance benefits of always serving a fully static site.

I will make a followup video on the topic that will get into writing the site, and the deployment process.