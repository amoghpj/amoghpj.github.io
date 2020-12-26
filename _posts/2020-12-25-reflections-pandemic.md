---
title: Quantifying my pandemic year
layout: post
description: Quantified self
tag:
- quantifiedself
blog: true
---

*TLDR;* This post is a summary of an *n=1* [quantified self](https://quantifiedself.com/) experiment I've been doing this year.


<a id="orgdbc01c2"></a>

# Background

Over the last few years, I have found some very interesting applications of [orgmode's](http://www.orgmode.org) customizable, extensible API, to better define my digital presence: implementations of 'quantified self' <sup><a id="fnr.1" class="footref" href="#fn.1">1</a></sup>, a philosophy that encourages *n=1* experiments to induce self awareness, and personal information/knowledge management (PIM/PKM) <sup><a id="fnr.2" class="footref" href="#fn.2">2</a></sup>. Inspired by the former I have been using a series of [org capture templates](https://orgmode.org/manual/Capture.html) (an outdated version of my templates can be found [here under Capture Templates](https://github.com/amoghpj/emacs_config/blob/master/config.org)) I have been recording my daily habits and workout statistics. The latter set of ideas is more diffuse, with no end goal other than curating "interesting" content and categorizing them in an easily searchable set of notes from online encounters. For this I have been using [org-brain](https://github.com/Kungsgeten/org-brain) for a few years now, with a continuously evolving file structure. But more importantly, I maintain a personal `diary.org` for non work related daily documentation, and a `labnotebook.org` which serves as my digital lab notebook. In this post I've used a python API to org mode to chart out my year in quanrantine.


<a id="orgbf796ad"></a>

# Habits

What do I hope to achieve by doing a quantified self experiment? At different times, at most two distinct answers have formed in my mind:

1.  Can I improve my productivity by recognizing physiological markers leading up to a bad day?
2.  What interesting things can I learn about myself by building a little discipline around self tracking?

Spoiler alert: the first question is very hard to answer. The second is easier by virtue of it being so exploratory and open ended.


<a id="org66e7d54"></a>

## Sleep-wake times

I started doing this experiment in the beginning of the year, but quickly fell off at the end of January. The y-axis below is on a 24-hour clock. There are three vertical dashed lines corresponding to three major shifts in lifestyle this year: 

1. red corresponds to start of quarantine in Virginia, the 15th of March, 
2. black the day I defended my thesis, and 
3. green is approximately the week that I started going in to work every day to do experiments at my postdoc position. 

The blue trend captures the weekly mean of the daily data shown in gray.

Two features stand out:

1.  My sleep schedule is more or less consistent, except for the increased variablity post-defense.
2.  I moved to Boston in the middle of the pandemic, around week 30. My wake time trend appears to have shifted downwards since the move. The yellow patch marks the weeks when I did an active experiment in waking up early to maximize sunlight hours after daylight savings ended. (Need to get back to that routine!)

![img](/assets/images/2020-sleep-wake.png)


<a id="org85b03e0"></a>

## Food

Food! A feature of my routine pointed out to me earlier this year is my constant fear of where my next meal is coming from, not in an economic sense but a literal "what do I eat for my next meal" sense.
I love how my breakfast times have become less variable since my move to Boston, but it is even more amusing to see the mean of my lunch times being nearly flat, even after my schedule shifted to waking up earlier! (I wonder if this is a remnant of my school lunch time?). Finally, I thought I had started eating dinner earlier and earlier, but this plot shows that my dinner times have been very constant at least since the pandemic hit!
![img](/assets/images/2020-food.png)


<a id="orgb41077d"></a>

## Coffee!

I have dug a reputation for myself for being an amateur coffee snob. I've been tracking the number of cups of coffee I drink. This doesn't necessarily reflect the amount of caffeine intake, because a 'cup' can be either an espresso shot or a tall mocha.
 Interestingly, it looks like I don't drink more than two coffees a day. In fact my mean coffee consumption seems to have dropped from 2 to about 1.5 since the early pandemic. To put that in perspective, that's close to 400 cups of coffee this year. 

![img](/assets/images/2020-coffee.png)


<a id="orgd3e5653"></a>

## Workout

One happy development during the pandemic was that I started running fairly regularly. I tracked my weight every day to see the variablity on days that I didn't run. I also started doing a 6.8 mile round trip bike commute since September which I started tracking more recently. A vertical line corresponds to a day that I went running, and a red line corresponds to a day that I commuted to work. 

The trend is really striking. The days I stopped running show an immediate flattening in the weight trend! Also, though the commute to work gets me some fresh air, it unfortunately doesn't seem to be a good replacement to running :(. Good to know&#x2026;

![img](/assets/images/2020-run-weight-relation.png)

Here are two more trends that I found really interesting. Cumulative number of miles run this year&#x2026;
![img](/assets/images/2020-run-weight-relation-run.png)

&#x2026; and cumulative number of miles biked since I started tracking my commutes.
![img](/assets/images/2020-run-weight-relation-bike.png)

200 miles run this year seems quite impressive to me! I saw on [twitter](https://twitter.com/RodalLab/status/1341841058456584192?s=20) that one challenge is to run a 1000 miles in a year. While that seems out of reach right now, I'd definitely like to try and hit 500 miles in 2021!


<a id="orgac50386"></a>

## Recording state

I don't actively journal every day. I have tried, and on the few times I sit down to write a long form journal entry, I am not sure if it has helped me. Recording my mental state remains a challenge.  However recording *events* is straightforward in orgmode thanks to capture. Inspired by Karl Voit's question ["what were you doing on February 14th 2007"](https://github.com/novoid/Memacs), I have pivoted instead to trying and making an entry of the thing I am doing right now, and I let orgmodes Agenda remind me of what I was doing at some point in history. This coupled with my [custom time tracking](https://amoghpj.github.io/2017/11/16/org-report-graphics.html) pipeline is intended to slow me down and help reflect on the successes and failures of the week. While this remains a work in progress, I can atleast share some summary statistics (using the wonderful [org-parse](https://orgparse.readthedocs.io/en/latest/)) of what a typical day looks like for me.

The goal is to get a crude estimate of productivity. The two trends below correspond to two "date trees" in the two distinct org files that I maintain, one a lab notebook and the other a personal "diary" file. The spike in September aside (when I refiled a bunch of expired TODO items), I am moderately satisfied with the state of my note taking right now. An average day at work seems to have between 2 and 5 entries. One goal of mine is to get better at estimating effort, which should be more straight forward now that I am getting used to doing experiments in the lab.

![img](/assets/images/2020-entries.png)

Another, indirect measure of productivity is how much I explored the literature. Here is a time line of the entries I added to my global references.bib file. Unsurpirsingly, reading and note taking for scienfitic literature took a hit in the pandemic. Need to get those numbers up next year!


![img](/assets/images/2020-references.png)


<a id="org099ed67"></a>

## Entries in my external brain

Finally, a series of tools have popped up in recent years that (re?) implement notions of an "external brain", a customizable personal wiki, or knowledge repository that can help augment our traversal through information landscapes on the internet. Some of them, with orgmode interfaces include [org-zettlekasten](https://github.com/l3kn/org-zettelkasten), [org-roam](https://github.com/org-roam/org-roam), and [org-brain](https://github.com/Kungsgeten/org-brain). I played around with org-brain about two years, forgot about it for a period, and then started using it rigorously last year. Below is a summary of the number of entries I've made over the last two years. I'm happy with my readings over the pandemic! 

![img](/assets/images/2020-org-brain.png)

A goal for next year is to get an export of my org-brain to play nicely with the rest of my website. In the mean time, enjoy a snapshot of my org-brain! (Click on the image to see the whole thing.)

![img](/assets/images/2020-brain-full.png)


<a id="orgfa858ba"></a>

# Fin

1.  In a year when I defended, spent three uncertain months without pay before moving and starting a postdoc during a global pandemic, quantitative habit data collected can at worst serve as a null trend to compare against in future years.
2.  My physiological habits, during a year with no cross-timezone travel are actually quite stable! Now I'd like to compare this with others to see what the typicaly variability for sleep-wake times is during a week.
3.  If notetaking is anything to go by, I've been reading quite a bit (of non-science) lately!
4.  I seem to have all the infrastructure I need to automagically record habits and productivity quantiatively. I'd like to continue this experiment as long as I can next

I'd love to hear your thoughts on this experiments! Happy new year!


# Footnotes

<sup><a id="fn.1" href="#fnr.1">1</a></sup> See [alphapapa's post](https://www.reddit.com/r/emacs/comments/a4zipp/fitnessorg_an_emacs_foodweightworkout_tracker/?utm_source=share&utm_medium=web2x&context=3)

<sup><a id="fn.2" href="#fnr.2">2</a></sup> [Karl Voit](https://karl-voit.at/tags/pim/) uses org mode extensively/exclusively, while [@karlicoss's Promnesia](https://beepb00p.xyz/promnesia.html) integrates data sources including orgmode notes to create annotations in the browser.
