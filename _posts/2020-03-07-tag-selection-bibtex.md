---
title: "Utility function to control the tags vocabulary in a bibtex file"
description: "Messing around with elisp again!"
layout: post
blog: true
tags: 
- emacs
---


I have started to add a custom 'tags' field in bibtex entries. 

```bibtex
@article{1998_Nature_Watts_Small_World,
  author =	 {Watts, Duncan J. and Strogatz, Steven H.},
  title =	 {Collective Dynamics of `small World' Networks},
  journal =	 {Nature},
  tags =         {networks,theory},
}
```

The tags are enclosed in curly braces, and are comma-separated. This helps me to filter by topic, and also process my file quickly to get statistics on how many papers I have by topic(s). While the initial population of my bibtex entries with tags took me some effort (probably around 3-4 hours to manually tag the entries), the problem I am starting to face now when I add a new entry is to control the tags vocabulary: for example, my previous entries have a tag `cell-cycle`, and if I don't remembert the hyphen but type out `cellcycle` instead, I now have two tags that mean the same thing. This isn't desirable.   I want to accomplish the following: in a new bibtex entry, fire up a completion prompt, where I can type out the first few characters of a tag, and then select the relevant option without worrying about introducing variants of a tag.

These are the steps that I followed:

1.  First `grep` the bib file for each occurence of the work 'tags'. [^fn1]
2.  Next, parse the grep output as follows: for each line in the output, extract the text between curly braces, and split this substring using commas. Accumulate these in a list.
3.  Finally, delete duplicates in this list. Present the user with a prompt, listing all the unique tags, and allow the user to select them.

These steps were surprisingly easy to implement! Here is what I came up with

1.  Define some variables to hold the path to the bib file, and a custom buffer name
    
    ```emacs-lisp
    (defcustom bibfile "~/jalihal_projects/Research/references.bib"
      "Default path to bib file")
    
    (defcustom buffername "*my-bibtex-tags*"
      "name of shell output capture buffer")
    ```
2.  Implement steps 1-3!
    
    ```emacs-lisp
    (defun choose-tags ()
      "Make an interface to choose tags in bibtex"
      (interactive)
      (let ((b (get-buffer-create buffername))
            (all-tags ()))
        (call-process "grep" bibfile buffername nil "tags")
        (with-current-buffer buffername
          (dolist (line (split-string (buffer-string) "\n"))
            (when (> (length line) 1)
              (setq current-tags (get-tags-from-line line))
              (setq all-tags (append all-tags current-tags)))
            ))
        (setq all-tags (delete-dups all-tags))
        (insert (completing-read "Choose tag: " all-tags))
        (kill-buffer buffername)
        ))
    
    (defun get-tags-from-line (line)
      "extract tags from LINE"
      (setq start-tags (1+ (string-match "\\({\\)" line)))
      (setq end-tags (string-match "\\(}\\)" line))
      (setq current-tags (split-string (substring
                                        line
                                        start-tags
                                        end-tags)
                                       ","))
      (setq cleaned-tags ())
      (dolist (tag current-tags)
        (setq cleaned-tags (cons (split-string tag) cleaned-tags)))
      cleaned-tags)
    ```
    
    I added a utility function `get-tags-from-line` that gets the subtring between the curly brackets and splits it by commas
3.  Finally, I bound `choose-tags` to `C-ct` in bibtex-mode using the following
    
    ```emacs-lisp
    (define-key bibtex-mode-map (kbd "\C-ct") 'choose-tags)
    ```

That was a fun exercise in writing some elisp to customize my workflow!


<!----- Footnotes ----->

[^fn1]: This assumes that all the tags are on a single line, and that the word tags doesn't occur anywhere else in the file. If the latter constraint isn't realistic, you can consider using a different field, like `mytags`.
