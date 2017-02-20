---
title: Breaking down the ParamEst Class
layout: post
headerImage: false
blog: true
tag:
- python
- non-linear-systems
---
I have been using the ``PyDSTool`` package by Rob Clewley for creating and simulating my models. This neat package allows you to worry about the creation and analysis of the model using a logical workflow rather than struggling with clumsy model definition functions like the ones Matlab's ode solvers require. The tools for bifurcation analysis are quite sophisticated, providing a programmatic interface to functionality otherwise found easily in XPP. Overall, the Python Dynamical Systems ToolBox is an amazing package for simulation of non-linear systems in python.

I began running into problems when I attepted parameter estimation using PyDSTool's ParamEst class. Seeking to use the Levenberg-Marquardt Least Squares Fit function ``LMpest``, I tried figuring out the example script ``pest_test1.py`` that comes with the example scripts. This post will try and outline my main areas of confusion about this example script. To make it easier to read, I stripped down this script to an even [simpler example]({{site.url}}/assets/python-scripts/paramest_example.py).

- What really are Model Interfaces?
- Why does ParamEst throw up an error if the variable name in the reference trajectory differs from that in the model?
- Can I extract values during the parameter estimation?

(To be continued..)