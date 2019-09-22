---
title: "A poor man's twitter using org-capture"
layout: post
headerImage: false
description: A rough ssh-based pipeline to "capture" a tweet-like text and push to a remote web server
blog: true
tag:
- emacs
---

A conversation with @reckoner165 brought up the notion that every trivial statement we make in social media is monetized somehow, somewhere. Is there a way to avoid any third party intrusion into an individual's access to their thoughts on the internet? [Beaker Broswer](https://beakerbrowser.com/) offers some alternatives, but I wondered if I can accomplish something similar with my current set of skills. [Here](http://amoghjalihal.com/social.html) is what I have come up with so far, and I thought I'd walk through what I've done.

Requirements:
- Emacs (!!)
- Org-capture
- Org-export to html
- scp
- a website server

First create an org file with suitable html specific headers. (You can add arbitrary html in an org file by starting the line with `#+HTML_HEAD: `). My org file is called `social.org` in `~/public_html` on my laptop, but it can be anywhere. Make sure the this file has a first level heading called Social.

Setup org-capture with something that looks like this. Put this in your init.el in the .emacs.d folder:

```emacs-lisp
  (setq org-capture-templates
        '(
          ("s" "Social" entry (file+olp "~/public_html/social.org" "Social")
          "* \n
#+BEGIN_EXPORT html
<div class=\"container\">
#+END_EXPORT\n
%U\n\n%?\n
#+BEGIN_EXPORT html
</div>
#+END_EXPORT" :prepend t :empty-lines 1)
          ))

```

The `%U` in the template expands to am inactive time stamp, and your cursor appears at the `%?`.

The more astute among you will notice that I have some html tags in the capture template. Here is a css file in the same `~/public_html` folder with the appropriate definitions.:

```

.container {
    border: 2px solid #ccc;
    background-color: #eee;
    border-radius: 5px;
    padding: 5px;
    margin: 50px 50px;
}

/* Clear floats after containers */
.container::after {
    content: "";
    clear: both;
    display: table;
}

/* Increase the font-size of a span element */
.container span {
    font-size: 20px;
    margin-right: 30px;
}
```

Now, hitting `C-c c` brings up the org-capture options. Simply type your thoughts and hit `C-c C-c` when you are done. This prepends the latest post to social.org

The next step is very ad-hoc. Currently, I export social.org to html using `C-c C-e h h`. Finally, I have something like the following function defined in my .bashrc:

```
function updatesocial(){
    scp ~/public_html/social.html user@domainname:/home/user/public_html/
}
```
(I have set up my ssh-key on the server)

So when I want to push my updates to the server, I simply type `updatesocial` in the terminal and away it goes! If you are using a github.io site, this is simply a git push.

My plans next are to wrap both the org-export and updatesocial commands in a elisp function which I can bind to a key.

Please do let me know if you have any thoughts and suggestions about this method!!
