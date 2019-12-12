---
title: Inital Commit
description: I've considered starting a blog more than once over the past few years. Also, markdown is the best.
date: "2019-12-12T11:05-05"
---

## A Brief Introduction
I've considered starting a blog more than once over the past few years. I think the main issue I've encountered is settling on a cohesive theme and subject matter for my posts, whether that's more personal comments, tutorials, project notes, or discussions of interesting articles I've read. That being said, *there is no single theme to this site's content*. To remove any barriers that might keep me from writing, I've decided to approach this blog without a single focus. Hopefully that results in a interesting and diverse array of articles and content.

## So Why Use Gatsby and Github Pages?
I'm building this blog with Gatsby and hosting it via Github Pages with a custom domain. There are two reasons for this. First, it's (virtually) free. Other than renewing my domain, I have no overhead. Using Gatsby is dead simple. With one of the starter projects, I just need to tweak the React components and start dropping in markdown posts, and BOOM, I've got a blog. 

## Also, Markdown is the Best
Speaking of markdown, this text-based format is my favorite document writing tool because of its simplicity and lack of dependency on external tools. Sure, looking at this

```markdown
# My Document Title
by Matthew Russell

## Some Math
Here are some math equations:
$$
\dot \text{x} =
\begin{bmatrix}
1 & 0 \\
0 & 2
\end{bmatrix}
\text{x}
$$
```

doesn't quite compare to a WYSIWYG editor, but I can take that same `.md` file and compile it to an HTML or PDF with varying styling. I guess I could also use LaTeX since it has a similar "document coding" concept, but it seems overkill for most of what I need -- quick notetaking with rich text, math, and code block support in a portable format. Pair that with a clean editor with a live preview and syntax highlight like VS Code, and then throw in diagram support via MermaidJS, and I'm hardpressed to find a better option.

## What's Next
I've got a few things on a todo list to finish bringing this blog online.
- Add MathJax support so I can use equations in these posts
- Add syntax highlighting for code blocks
- Change up the theming/typography
- Figure out how to add static pages, and create one as an About Me