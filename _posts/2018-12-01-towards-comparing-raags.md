---
title: "2018-12-01: Towards constructing relationship graphs between raags"
layout: post
headerImage: false
blog: true
tag:
- music
- kala
---
This week, the discussion was primarily centered around developing the string diff
method that we used on thaats last week.
- The immediate difficulty is the concept of aaroha-avaroha.
- Rutuja pointed out that there are 'sangatis' for each thaat, like the P-R in kalyan thaat which is a characteristic of yaman. This identifies the raag as a member of the thaat, unlike the more specific pakkad.
- Moreover, there are complexities associated with the vadi, samvadi, and varjit swars.
- Satyajit pointed out that it would be possible to us the sangatis as a first level filter to identify thaats to narrow down an automated search for raags
  - This led to a side discussion on what pattern matching strategies are at work when experts identify raags.
- Further exploring the classification of raags into thaats, Rutuja mentioned that it is possible for raags containing all the swars defining a thaat to not be included in it. This reminded me of a jugalbandi performance by Ashwiini Bhide Deshpande and Sanjeev Ahyankar exploring durga and bhupali simultaneously, in different keys.
Here is the link: [Ashwini Bhide Deshpande and Sanjeev Abhyankar sing Durga-Bhupali](https://www.youtube.com/watch?v=0lz-Ym91fRA)
Consider the raags independently:
Bhupali: SRGPDS
Durga:   SRMPDS
They are both shadav raags, and they differ in the usage of G and M. We wanted to figure out how we could line up these raags to make sure Abhyankar and Deshpande could use the same swars but still sing distinct raags.
Here it is, with every blank space denoting the missing swars, including the komal (teevra) swars.
```
Durga:   S-R--M-P-D--S-R-
Bhupali: P-D--S-R-G--P-D-
```
Here, I am defining the S with respect to Durga. The S in Bhupali will then correspond to M.

They line up beautifully! Naturally, this brings up a sequence alignment problem.
- Can we use such an alignment to compare raags over aaroha/avaroha separately?
  - Note: The scale repeats. This can be used to compare, say an entire sequence of aaroha+avaroha for two raags  
- How would we use such a method to 'pattern match' over a temporal sequence of notes with a reference set of raags?
- Idea: Get sequences from @shockmonger's DB, do an all-on-all local alignment, record scores and rank-order the raag pairs.