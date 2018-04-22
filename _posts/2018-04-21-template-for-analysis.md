---
title: "a YASnippet Template for an org-mode notebook"
layout: post
headerImage: false
blog: true
tag:
- python
- emacs
- research 
---
I have been using org-mode for my electronic lab notebook for about two years now and I can say my workflow is finally maturing.

I recently discovered YASnippets in emacs, and its been a game changer. Some context: I discovered org-ipython mode recently, and realized it fits my workflow much better than jupyter or ob-python. The main reasons for this were:

1. Asynchronous code blocks. I know this has been (kinda) solved in ![ob-async](https://github.com/astahlman/ob-async).
2. Seamless inline figures. Ipython with the %matplotlib inline magic takes care of this beautifully
3. Annoying src block definitions!

The third reason was the main source of frustration. I came across the following snippet on the ob-ipython README to automatically insert the appropriate ipython src block:

```
# -*- mode: snippet -*-
# name: ipython block
# key: ipy
# --
#+BEGIN_SRC ipython :session :exports both :results raw drawer :async t
  $0
#+END_SRC
```

This blew my mind. I simply type 'ipy` and hit TAB and org-mode inserts the above temlate for me, placing the cursor at inside the block.

Furthermore, recently I have been doing a series of small analyses on my model which don't fit in well with the rest of my Lab Notebook structure. I ended up using separate files for each analysis because the repeated simulations with necessarily verbose output ended up spamming my Notebook file. And instead of rewriting all the python headers in each analysis file, I decided to make a personalized template for analysis as follows:

```
# -*- mode: snippet -*-
# name: Model Analysis Template
# key: modantemp
# --
* META 
Name: Amogh Jalihal
Date: `(current-time-string)`

** Import Headers

#+BEGIN_SRC ipython :session :exports both :results raw drawer :async t
%matplotlib inline
import sys
import os
import matplotlib.pyplot as plt
import matplotlib
matplotlib.rcParams['axes.facecolor'] = (1,1,1,0)
PATH = "/jalihal_projects/Research/data/ModelAnalysis/"
HOME = os.path.expanduser("~")

sys.path.append(HOME + PATH)
os.chdir(HOME + PATH)
import modelreader as md
import simulator as sim
#+END_SRC
* Analysis
** Objective
```

This template does a couple of nice things for me:

1. My utility scripts and their inputs are stored at PATH. I found it annoying that I had to write out a series of headers to accomplish the correct file paths each time I wanted to start a new analysis (which could me more than once in a day.) The solution: simply store it in a template!
2. This has the potential to create very powerful org-mode templates. This can be especially useful when writing dissertation chapters!

How to use: Type `M-x yas-new-snippet` or `C-c & C-n` to create a new template and copy-paste the above code to get you started. That's all!

