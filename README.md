# DevClub_Learning
 DevClub Platform Exercises.
 
 The lessons are translated from `Portuguese` to `English` on the go, if there's any grammatical error just tell me.  
 This page will be reviewed after I finish all the lessons of the DevClub Course.

## Prerequisites
- A modern web browser
- Python 3 installed to run a simple local server with `python -m http.server`
- Alternatively, another local server tool such as VS Code Live Server

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

## HTML
### 01-HTML_Basics
Basics of HTML, reviewing if there's something new in the HTML markup
> Seems that there's nothing new here, really.
### 02-HTML_Challenge01
Devclub's 1st challenge, A simple page with some data about myself
> probably will be changed in the future to make a Self Presentation page.
### 03-HTML_Basics_part2
Table, Self-Hosted videos, Iframe, Input
> The input had something new, the `<label for="id">` is easier to read, and now it have new acessibility features and a convenient autocomplete tool.

Forms, inputs and buttons  
> It is very nice that the inputs already have validations.

HTML Semantics  
> `<article>` and `<aside>` didn't exist before.  

## CSS (In Progression...)
This lesson will cover the basics of CSS and how to use it to style web pages.  
*Linked the style.css to HTML Lessons*  
### 01-CSS_Intro
Using CSS: TAGS(`<p>`)->`p`, Class(`<element class="btn">`)->`.btn`, ID(`<element id="itemID">`)->`#itemID`
> The use of `:is(ul, ol) li` is interesting, and it seems that it doesn't affect much the performance of the website.

Colors, Units of measure, Text, Margin and Padding, box-sizing, 
> The dev in me wanted to see how Variables in CSS works, I love how `:root` lets you set global variables, it makes much easyer and cleaner than working with RGB/hex codes.
### 02-Standalone Project 01 - We Care Pet Frontpage
Using figma to replicate a front page in HTML with CSS (non-responsive)
> Project path: `Standalone_projects\Project01-Pet\Index.html`
### 03-Standalone Project 02 - Challenge 2
Final Challenge of the CSS_Intro course, and as a bonus, i tried to edit the Logo.svg with AI to animate it, it worked better than i expected. The `index.html` and `style.css` was made by hand, of course.
>  Project path: `Standalone_projects\Project02-Challenge02\index.html`

Animated logo preview:
<img src="Standalone_projects/Project02-Challenge02/img/logo.svg" alt="Animated logo preview from Project 02 Challenge 2" width="320">


