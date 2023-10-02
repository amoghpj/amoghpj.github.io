---
title: "Custom elisp function to jump to analysis folders"
layout: post
headerImage: false
description: An outcome of having a systematic nomenclature of projects
tag:
- emacs
- org-mode
projects: true
---
At work, I have adopted a project ID system from Julius Palme, who in turn attributes the system to Jue Wang.  The system is pretty simple:
1. Each project gets a two letter code
2. Each experiment under the project is numbered, starting with 1.
3. A repeat of the experiment is further labeled A-Z.

The advantage of this system is that everything is labeled systematically, including cloning experiments, strains, and even phenotyping experiments.

I use this system even for theory/modeling, bioinformatics, and general data analysis.  I have now accumulated around a 150 folders across around 8 projects, which look like this
```
  drwxrwxr-x   3 jalihal jalihal  4096 Sep 26 16:53 2023-09-12-am3-sand-gradient
  drwxrwxr-x  10 jalihal jalihal  4096 Sep 16 19:26 2023-07-19-xa33-evolution
  drwxrwxr-x   3 jalihal jalihal  4096 Sep  1 11:29 2023-08-30-nf9-nf10-analysis
  drwxrwxr-x   2 jalihal jalihal  4096 Sep  1 11:29 2023-08-31-xa37-ph-test
  drwxrwxr-x   3 jalihal jalihal  4096 Aug 30 11:16 2023-08-30-nf11-lb-timecourse
  drwxrwxr-x   3 jalihal jalihal  4096 Aug 22 22:47 2023-07-07-xa31-environmental-samples
  drwxr-xr-x   3 jalihal jalihal  4096 Aug  3 18:14 2022-10-11-ts138
  drwxrwxr-x   2 jalihal jalihal  4096 Jul 17 14:39 2023_06_26_xa27
  drwxrwxr-x   2 jalihal jalihal  4096 Jul 17 14:14 2023-07-10-xa32-biofilm-growth
  drwxrwxr-x   3 jalihal jalihal  4096 Jul 17 08:48 2023-07-06-xa26
  drwxrwxr-x   3 jalihal jalihal  4096 Jul 13 18:03 2023_06_28_nf6b
```

I need to typically access the folders of roughly the past month at any given point in time, around 15 folders give or take.  The important thing is that I now remember the experiment IDs of these recent experiments, so it is easier to now access them in `dired` by filtering for the the ID itself.  For some time now, I've wished for a way to jump directly to the experiment folder from any arbitrary location in emacs.  The following function does exactly this. (`analysispath` contains the path to the directory containing the folders shown above)

```emacs-lisp
(defun aj/jump-to-analysis ()
  "Jump to an analysis folder with a two letter-number ID"
  (interactive)
  (let* ((path analysispath)
         (files (directory-files path))
         (numfiles (length files))
         (counter 0)
         (alltags ()))
    (while (< counter numfiles)
      (dolist (comp (split-string  (nth counter files) "-"))
        (if (string-match-p "^[a-zA-Z][a-zA-Z][0-9]+" comp)
            (progn
              (setq alltags (cons `(,(format "%s" comp) . ,(nth counter files)) alltags)))))
      (setq counter (+ counter 1)))

    (switch-to-buffer (find-file-noselect (format "%s%s" path  (cdr (assoc
                                         (completing-read "jump to analysis:" 
                                                         (mapcar 'car alltags))
                                        alltags))
                          )))))
                          
(global-set-key (kbd "C-x j") 'aj/jump-to-analysis)
```
Finally, it was a nice touch to add some annotations for the `marginalia` package that I've come to enjoy using. 

```emacs-lisp
(defun my-analysis-annotator (cand)
  (let* ((path analysispath)
         (files (directory-files path))
         (numfiles (length files))
         (counter 0)
         (result ""))
    (while (< counter numfiles)
      (if (string-match-p (regexp-quote cand) (nth counter files))
          (setq result (nth counter files)))
      (setq counter (+ 1 counter)))
    (marginalia--fields (result :face 'marginalia-documentation))))

(add-to-list 'marginalia-annotators-heavy
             '(analysis . my-analysis-annotator))
```

This function looks up the prompt of completing read to see if it matches a regexp defined under the keyword `analysis`, and defines an annotator that looks up the analysis ID in each filename, and just displays the filename as the annotation.  Lots of possibilities for this ahead!

Finally, I added a new prompt category in the `customize` interface for `marginalia-prompt-categories` that looks for `\<analysis\>` in the prompt, so I'm simply looking to the word "analysis". 

So now I simply type in `C-x j`, get a completion prompt for all the experiment IDs that I have in the folder, with each experiment ID annotated with the corresponding full file name.

Works like a charm!
