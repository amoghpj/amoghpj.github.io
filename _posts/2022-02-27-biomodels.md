---
title: "Introducing biomodels.el"
layout: post
description: An emacs interface to interacting with the BioModels API
tag:
- emacs
- model
blog: true
---
![img](/assets/images/screenshot_20220227_135818.png)

# Rationale
I think there is an accessibility problem in biology, where useful data is tied up in databases that don't have good interfaces to retrieve them. One of my pet peeves has been the messy ecosystem around SBML models hosted on BioModels, and how everything about it, from model definition to simulation is made opaque to users in favor of machine readability. This is my attempt to build an emacs interface to searching the [BioModels database](https://www.ebi.ac.uk/biomodels/). The good thing about building this interface in emacs is that it can be extended to custom workflows in terms of parameter estimation or model comparison. 

# What does the package do?
Currently the package provides a simple set of key-bindings to:
1. Search for models by key word
2. View reaction wiring diagrams (if available)
3. Download and view SBML/PDF/XPP files provided by BioModels.

For me, this functionality makes it easier to get to simulating the XPP files, rather having to rely on esoteric SBML tooling to explore time dynamics or effects of parameter perturbations.

# Where can I find it?
You can find the code on [my github repo](https://github.com/amoghpj/biomodels.el). The python wrapper requires installing the python-libSBML package.

# What does it look like?
Here is a rather long video walking through the steps of inspecting the wiring diagram of a model and downloading it. 

<video controls >
<source src="/assets/videos/2022-02-27-biomodels.mp4" type="video/mp4">
</video>

# Feedback welcome!
Always looking for feedback, either on my elisp or the utility of such a package to fellow biologists!

