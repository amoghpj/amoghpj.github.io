---
title: "Multithreading is Python is a pain"
description: "Or how I learned about the GIL"
layout: post
tags: 
- python
---

I went down a python rabbit hole a few weeks ago trying to understand `multiprocessing` and parallelization when I noticed weird behaviors when I was sharing state in a dictionary. TLDR: don't bother sharing state if you are working with dictionaries! Try Arrays if you absolutely need to, but avoid storing state if you can.

**Objective** evaluate if a coin toss is heads or tails, using multiprocessing.

**Approach** Toss 1000 coins, store ground truth, but in a dictionary.

Now evaluate the same but using a manager dictionary object storing a counter.

```python
from numpy import random 
import multiprocessing as mp

def heads_or_tails(args):
    toss = args['toss']
    sdict = args['shareddict']

    if toss> 0.5:
        sdict['counter'] += 1

# Repeat this 10 times
for _ in range(10):
    # Make 1k tosses
    cointosses = random.random(1000)
    groundtruth = sum([1 for r in cointosses if r >0.5])

    manager = mp.Manager()
    shareddict = manager.dict()
    shareddict['counter'] = 0

    with mp.Pool() as pool:
        jobs = []
        for r in cointosses:
            args = {'toss':r,'shareddict':shareddict}
            job = pool.apply_async(heads_or_tails, args=(args, ))
            jobs.append(job)
        for job in jobs:
            job.wait()

    print(groundtruth, shareddict['counter'])
    del manager
    del shareddict
```

    498 473
    530 482
    499 460
    485 449
    519 475
    505 451
    472 430
    497 459
    506 464
    509 460



The first column in the 'ground truth', the second is the count when the process
is parallelized. The `dict` is not getting updated every time! This has caused me
much grief.

In fact, switching to using  an `Array` object works, as illustrated below.

```python
from numpy import random 
import multiprocessing as mp

# Repeat this 10 times

def heads_or_tails(args):
    toss = args['toss']
    sarray = args['sharedarray']
    i = args['i']    

    if toss> 0.5:
        sarray[i] = 1
    else:
        sarray[i] = 0        

for _ in range(10):
    # Make 1k tosses
    cointosses = random.random(1000)
    groundtruth = sum([1 for r in cointosses if r >0.5])
    sharedarray = mp.Array('i',len(cointosses))

    workers = [mp.Process(target=heads_or_tails, args=({'toss':r,'sharedarray':sharedarray,'i':i},) )  for i,r in enumerate(cointosses)]
    for p in workers:
        p.start()
    for p in workers:
        p.join()        

    print(groundtruth, sum(sharedarray))

    del sharedarray
```

    (519, 519)
    (524, 524)
    (522, 522)
    (508, 508)
    (494, 494)
    (495, 495)
    (481, 481)
    (485, 485)
    (509, 509)
    (486, 486)

Final thoughts: parallelization is a pain in python. This is in fact prominently stated in the `multiprocessing` docs, but I have definitely learned my lesson now. 


<!----- Footnotes ----->

