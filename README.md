# DevClub_Learning
 DevClub Platform Exercises.
 
 The lessons are translated from `Portuguese` to `English` on the go, if there's any grammatical error just tell me.  
 This page will be reviewed after I finish all the lessons of the DevClub Course.
 > *OBS:* Whem there's a QuoteBox, it is my opinion and toughts i had while reviewing the contents of the Lesson

## Table of Contents
- [Prerequisites](#prerequisites)
- [How to Run](#how-to-run)
- [HTML](#html)
- [CSS Basics](#css) / [CSS Intermediate](#css-intermediate-level)
- [GIT](#git)
- [JavaScript](#javascript)

<!-- Prerequisites Table of contents -->
<a id="prerequisites"></a>

## Prerequisites
- A modern web browser
- Python 3 installed to run a simple local server with `python -m http.server`
- Alternatively, another local server tool such as VS Code Live Server

<!-- Howto Table of contents -->
<a id="how-to-run"></a>

## How to Run
Each folder represents a finished DevClub course module. To run any course, start a local server inside the respective course folder and open the served `index.html` page in your browser.

**Steps:**
1. Clone the repository
2. Navigate to the desired course folder (e.g., `HTML/`)
3. Start a local server in that folder
4. Open the local server address in your web browser

Example using Python:
```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

<!-- HTML Table of contents -->
<a id="html"></a>

## HTML
### 01-HTML_Basics
- Basics of HTML, reviewing if there's something new in the HTML markup
> Seems that there's nothing new here, really.
### 02-HTML_Challenge01
- Devclub's 1st challenge, A simple page with some data about myself
> probably will be changed in the future to make a Self Presentation page.
### 03-HTML_Basics_part2
- Table, Self-Hosted videos, Iframe, Input
> The input had something new, the `<label for="id">` is easier to read, and now it have new accessibility features and a convenient autocomplete tool.
- Forms, inputs and buttons  
> It is very nice that the inputs already have validations.
- HTML Semantics  
> `<article>` and `<aside>` didn't exist before.  

<!-- CSS Table of contents -->
<a id="css"></a>

## CSS
This lesson will cover the basics of CSS and how to use it to style web pages.  
*Linked the style.css to HTML Lessons*  
### 01-CSS_Intro
- Using CSS: TAGS(`<p>`)->`p`, Class(`<element class="btn">`)->`.btn`, ID(`<element id="itemID">`)->`#itemID`
> The use of `:is(ul, ol) li` is interesting, and it seems that it doesn't affect much the performance of the website.
- Colors, Units of measure, Text, Margin and Padding, box-sizing, 
> The dev in me wanted to see how Variables in CSS works, I love how `:root` lets you set global variables, it makes much easier and cleaner than working with RGB/hex codes.
### 02-Standalone Project 01 - We Care Pet Frontpage
- Using figma to replicate a front page in HTML with CSS (non-responsive)
> Project path: `Standalone_projects\Project01-Pet\Index.html`
### 03-Standalone Project 02 - Challenge 2
- Final Challenge of the CSS_Intro course, and as a bonus, i tried to edit the Logo.svg with AI to animate it, it worked surprisingly well.  The `index.html` and `style.css` was made by hand, of course.
>  Project path: `Standalone_projects\Project02-Challenge02\index.html`

<!-- CSS2 Table of contents -->
<a id="css-intermediate-level"></a>

## CSS Intermediate Level 
- !important tag, Pseudo-classes and Pseudo-elements, Site responsiveness
> Challenge `Standalone_projects/Project03-1st_Responsible_site/index.html`
- Calc()
> CSS function to use math

<!-- GIT Table of contents -->
<a id="git"></a>

## GIT 
> Hummm... it's strange to learn git when i'm already using it since the begging hahaha~~ **Let's go!**
- What's Git, Create repository, GIT Ignore, Git Attributes
- Push and Pull, Branching and Merging
- Remote Repositories, README.md

<!-- JS Table of contents -->
<a id="javascript"></a>

## JavaScript 
### Variables
- let, constant and var
- Variables, Strings, Template literals, Numbers, Booleans
- Binary Operations & Bitshift as an Extra
> All basic stuff, I had to put a Bitshift Extra Lesson at the end to spicy things up and remember my origins `(Low code + Memory Management and Performance Lover)`, It seems to be a forgetten skill lately.
- Objects, Null & Undefined, Array, If & Else, Functions
> nothing really new here, only the short version of the arrow function  

### DOM Elements
- byID, byClassName, ByTagName, by name, tagSelector/all
- textcontent, innerText, innerHTML, CSS Properties

## Challenge - Project 04 : Currency Exanger
### Features:
- Animated logo (made with AI, Triggers by me), with CSS Transformations
- Dataset using a `currency.json` archive to make easy add/remove items or to use a API




(On Going...)

