---
title: "Creating super-personalized dashboards with org-mode and some elisp"
layout: post
description: Using emacs to solve inconveniences
tag:
- emacs
blog: true
---
# Motivation
Org-mode allows for the creation of quick summaries across a subtree of using [column view](https://orgmode.org/manual/Column-View.html). This relies on the user creating headings with the appropriate properties and filling out the values all with an expected design of how the output is supposed to look like. 

I've found that in my experience, it is more natural for me to create an org-table to start summarizing a series of experiments. I fill these tables manually, adding new columns when needed. I've been looking for ways to quickly interact with such data-rich tables to rapidly generate "views" of each row, like mini reports for my-eyes-only. This morning I hacked together some functions that help me build a custom dashboard to good effect, and I thought I'd share this experiment.

Below is a screenshot of a table with 9 columns that I have been building over the last two months. Each row corresponds to an experiment and information related to it. (I've had to zoom out pretty far to get the entire table to fit in one screen!) As you can see, the table is already getting long, and needs some way of summarizing a single row meaningfully. 

![img](/assets/images/2020-12-31-org-table.png)

... and this is how I summarize a single row:


<video autoplay controls >
<source src="/assets/videos/2020-12-31-custom-org-table-demo.mp4" type="video/mp4">
</video>


# Thoughts on working with org-tables

This is the function I ended up writing. I heavily rely on `completing-read` to generate a controlled vocabulary of options from a predefined list. 

Essentially, for a hard coded (for now) table name in a file
1. Read the column names in the table. 
2. Prompt the user to pick one of these columns to filter by. This has to be unique for now, but I am thinking of experimenting with multiple rows eventually.
3. Using the value picked by the user, get the row of the table based on the column and value selected in the step above.
4. Format the column name-column value in a new buffer. This is where it gets interesting: Notice within the `with-current-buffer` form, I activate org-mode, toggle inline images, and turn on hl-todo-mode.

``` emacs-lisp
  (defun aj/search-strain-table ()
  "User is prompted for column to filter, and then prompted with entries to select entries"
    (interactive)
    (let* ((table-name "strain-table")
           (tab (aj/return-named-table table-name))
           (heading (car (cdr tab)))
           (colname (completing-read "Search column: " heading))
           (output))
      (setq output (aj/get-row-from-table table-name
                             colname
                             (completing-read "strain description: " (aj/get-columns-from-table
                                                                      table-name
                                                                      colname))))
      (with-current-buffer (get-buffer-create "*strain-input*")
        (erase-buffer)
        (org-mode)
        (mapcar* (lambda (x y) (insert (format "*%s* %s\n" x y)))
               heading output)
        (org-toggle-inline-images)
        (hl-todo-mode)
        )
      (switch-to-buffer-other-window "*strain-input*")
      ))
```

Those last three things are amazing! I essentially use all of org-mode's fanciness to create a nice display of what I need. The video summarizes what I want to achieve: emacs should prompt me for a column, and then display the rows in that column. I should be able to fuzzy-narrow the list, select the item of interest, and then have emacs format the contents of that row nicely and display the results in a new buffer.

Is such a feature that is going to be useful to most people? Likely not. But this is useful for me today, and emacs lets me do it so that's a win!

# Details 
      
In summarizing the table, I needed to first read in the table as a lisp object. `org-table-to-lisp` does exactly that.

``` emacs-lisp
  (defun aj/return-named-table (name)
    "Goto table named NAME"
    (save-excursion 
      (goto-char (point-min))                  ;; Go to top of file
      (search-forward (concat "#+NAME: " name));; Look for table with name NAME
      (forward-line)                               ;; Step to the next line to enter the table
      (org-table-to-lisp))                         ;; return the table as a lisp object
    )
```

Next, I need to get the entries in a given column. This is a poor hack that does that.


``` emacs-lisp
  (defun aj/get-columns-from-table (tablename columnname)
    "Return list of entries in column COLUMNNAME from table TABLENAME"
    (let* ((tab (aj/return-named-table tablename))
           (heading (car (cdr tab)))
           (col 0)
           (res)
           (found))
      (while (and heading (not found))
        (if (equal (car heading) columnname)
            (setq found 1)
          (progn
            (setq col (+ 1 col))
            (setq heading (cdr heading)))))
      (while tab
        (unless (equal (car tab) 'hline)
          (add-to-list 'res (nth col (car tab))))
        (setq tab (cdr tab)))
      res))
```

Further, for a given column name and a "search-string" (badly named, this is actually an item from the column itself), return the row that that search-string came from.

``` emacs-lisp
  (defun aj/get-row-from-table (tablename columnname search-string)
    "Return row from table TABLENAME where entries in column COLUMNNAME match SEARCH-STRING"
    (let* ((tab (aj/return-named-table tablename))
           (heading (car (cdr tab)))
           (column 0)
           (res)
           (found))
      (while (and heading (not found))
        (if (equal (car heading) columnname)
            (setq found 1)
          (progn
            (setq column (+ 1 column))
            (setq heading (cdr heading)))))    
      (setq found nil)
      (while (and tab (not found))
        (unless (equal (car tab) 'hline)
          (if (equal (nth column (car tab)) search-string)
              (progn
                (setq res (car tab))
                (setq found 1))
            ))
        (setq tab (cdr tab)))
      res
      ))
```

And that's it! 
