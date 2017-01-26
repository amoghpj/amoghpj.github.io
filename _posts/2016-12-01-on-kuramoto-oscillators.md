---
title: "A script to study Kuramoto Oscillators"
layout: post
headerImage: false
tag:
- python
- biology
- non-linear-systems
blog: true
---

As a requirement for Computing the Brain, a course I took in Fall 2016, I presented the Lu et al, 2016 paper on resynchronization in the context of jetlag. To try and understand the basis for their model of jetlag, I tried simulating the Kuramoto model myself. [Here][/assets/python-scripts/KuramotoSimulation_PyDSTool.py] is a code to generate a simulation of the Kuramoto model, which outputs something like this:

![The Kuramoto coupled oscillator system]({{ site.url }}/assets/images/kuramoto_N15_K009.gif)