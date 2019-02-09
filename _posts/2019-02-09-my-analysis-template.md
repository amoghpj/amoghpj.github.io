---
title: "My first elisp function: Create an analysis template"
layout: post
headerImage: false
blog: true
tag:
- emacs
- modeling
---
I believe my computational workflow has finally matured, and that I have
evened out most of the kinks in my day-to-day research. I maintain a lab notebook
in an org file, where I have a datetree under which I have an entry for every day.
The entries sometimes are descriptive, with citations to papers and brief summaries,
or more commonly, links to analysis files. These analysis files are literate org files
with python code used to analyse my model and to generate summary plots. Each analysis
file lives in its own folder, has a common set of headers meant for prettier latex export,
as well as a document wide setup for code execution.

I found myself doing all of the above manually, except for the header
specification, for which I had a [yas-snippet](http://amoghpj.github.io/template-for-analysis/). I finally decided to try
my hand at writing some lisp to get some keywords from the
user, automatically create the folder, and fill out the header for my analysis file.

Here is the function I wrote:

``` emacs-lisp
  (defun aj/create-new-analysis ()
    "Prompts user for key words and creates a folder and org file using this name"
    (interactive)
    (setq analysisfolder "~/jalihal_projects/Research/Analysis/")
    (setq analysisname  (concat
                         (format-time-string "%F")
                         "-"
                         ;; This line prompts user for some keywords and replaces
                         ;; the spaces with hyphens
                         (replace-regexp-in-string "\\( \\)" "-" (read-string "Key words: "))))
  
    (make-directory (concat analysisfolder analysisname))
    (setq fpath (concat analysisfolder analysisname "/" analysisname ".org"))
    (message (concat "creating" fpath))
    (setq sessionname (read-string "Session name? [pythonsession] " nil nil "pythonsession"))
     (write-region (concat "#+PROPERTY: header-args:python :session "
                           sessionname
                           " :tangle yes :comment link\n"
                           "#+LATEX_HEADER: \\usemintedstyle{tango}%colorful\n"
                           "#+LATEX_HEADER: \\usepackage{xcolor}\n"
                           "#+LATEX_HEADER: \\definecolor{bg}{rgb}{0.9,0.9,0.9}\n"
                           "#+LATEX_HEADER: \\setminted{linenos=True,bgcolor=bg}\n"
                           "#+LATEX_HEADER: \\usepackage[bottom=0.5in,margin=1in]{geometry}\n"
                           "#+BEGIN_SRC python\n"
                           "import numpy as np\n"
                           "import matplotlib.pyplot as plt\n"
                           "import pandas as pd\n"
                           "#+END_SRC ")
                   nil fpath)
    (switch-to-buffer (find-file fpath)))
```
Finally, to make it really handy, I added the following line to my global hydra
so I can whip up this sequence of steps everytime I have an idea for an analysis!

``` emacs-lisp
     ("A" aj/create-new-analysis "Analyis")
```

I am sure there are far more elegant solutions to this problem. That said
I had fun writing this small function, and I am finally becoming
confident enough to pull up the elisp files for packages I find interesting
and explore the code for myself!