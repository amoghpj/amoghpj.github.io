---
title: "A tale of chess boards"
layout: post
headerImage: false
description: Noisy serial dilutions
tags: 
- notes
blog: false
---



# Prelude

We join our protagonists after our maharaja has foolishly agreed to
the sadhu's simple request for a doubling of the grains of rice on
each square of the chess board. Everyone knows the raja didn't pay
attention to ganita, and now everyone is talking about this as some
great revelation of exponential growth! Now Dirghasamshaya and
Tivrabuddhi have to do the dirty work of actually counting the rice
grains out. In front of them is a series of bags, bigger and bigger,
carefully filled with hand counted grains.


Add some text here:

<div id="2024-12-08-script"></div>

<script src="assets/js/statistics.min.js" type="text/javascript">
var Statistics = require('assets/js/statistics.min.js');
var stats = new Statisics();
document.getElementById("2024-12-08-script").innerHTML = stats.binomialProbabilityMass(12, 22, 0.4);
</script>

# "But how many grains are in this bag?"

Dirghasamshaya wonders out loud, pointing to a randomg
bag. Tivrabuddhi groans. "Just finish the job!".

But Dirghasamshaya is insistent. "We are putting so much effort into
counting each grain of rice into these bags. How do I know that you
aren't doing a shoddy job of it?"

Tivrabuddhi pours out a handful of carefully counted rice grains into
a bag and sits down to consider this. Always the sharp one, he picks
up a banana, peels it, holds it up to Dirghamsamshaya and gently
breaks it in half, smiling.  "You'll like this. Put a bag of rice on
the scale and balance it. Now remove half the counter weight, which is
known, and take off half the volume of rice in the bag. You will be
left with half the bag. Now repeat this, taking off half the rice at
each step. We are just reversing the sadhu's instructions! The number
of halvings we need to get to a single grain of rice can be used to
calculate the number we started off with!"

Dirghasamshaya thinks about this, savoring the half banana he is handed.

"I am going to try it!"


<a id="orgd5773f8"></a>

# The binomial sampling process

The two distracted workers get busy setting up a series of
weights. They need to hurry with this little mathematical detour, so
they grab one of the smaller bags and roughly take off half the amount of rice at each step.

Dirghamsamshaya is busy finding the right weights, but he thinks he
knows what the result of this little experiment will look like.  He knows that
this bag has 4096 grains, and it should take them 12 dilutions. He
reasons

| Start | Step 1 | Step 2 | Step 3 | Step 4 | Step 5 | Step 6 | Step  7 | Step  8 | Step 9 | Step 10 | Step 11 | Step 12 |
| 4096 | 2048 | 1024 | 512 | 256 | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

Tivrabuddhi suddenly gets up. "That took 11 steps. So the bag must have had&#x2026; 2048 grains!"

Dirghamsamshaya looks up from the weights with a frown on his
face. "That's not right, it should have taken 12 steps, that bag had
4096 grains! There's something wrong, do it again, this time with this
bag." He hands him a bigger bag this time, one that he knows has 32768
grains. This time he is watching Tivrabuddhi do the steps
carefully. He is sure this is going to take 15 steps.

Tivrabuddhi again follows his plan, rushing along again, roughly shaking off half the bag at each step.

"16 steps, that means the bag had&#x2026; 65536 grains!"

Dirghamsamshaya is now puzzled. He trusts Tivrabuddhi's method, but these numbers don't seem to add up.   

```python
from numpy.random import binomial
rice = 32768
i = 0
while rice >1:
    rice = binomial(rice, 0.5)
    i +=1
    print(i, rice)
```


<!----- Footnotes ----->

