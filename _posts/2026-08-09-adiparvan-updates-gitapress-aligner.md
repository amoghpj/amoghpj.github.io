---
title: "Technical Post 1: How we aligned the Gita Press translation to the Critical Edition of the Mahabharata"
layout: post
headerImage: false
description: Towards building the Ephemeral Forest
tag:
- notes
blog: true
---

Focusing on Indian translations of the Mahabharata, our first target was the Gita Press translation in Hindi. Find the Hindi translation live at https://ephemeralforest.com/adiparvan under the drop down list of translations.

After OCR, parsing, and error correction, we were left with a body of text, all in devanagari, with interleaved sanskrit slokas and hindi translation lines. This post summarizes our approach to aligning this text with the Critial Edition of the Mahabharata.
    
# About the Gita Press Hindi translation
(From the introduction)

The editors of this translation primarily use the Nilakantha accounting of the Mahabharata verses, together with the relevant insertions from the Southern Recension. In addition, the translation also relies on (unspecified) "previous editions" and parts of the BORI Critical Edition for aid in selecting verses.  In total the Gita Press translation has a sloka count of 100217 verses of which 86600 are from the Northern Recension and 6584 from the Southern Recension. 

The effort of the Sanskrit-Hindi translation was led by Pandit Shri Ramnarayan Dutt Shastri. The translation of the Adiparvan and some other (unspecified) books was carried out by Sami Shri Akhandanand. The Recension comparison and translation was also overseen by Shir Jayadalal Goyandka, Swami Shri Ramsukhdas, Shri Harikrishna Goyandka, Shri Ghanashyamdas Jalan, and Shri Vasudeva Kabra.

Volume 1 has the Adiparvan and the Sabhaparvan books, of which we have processed only the Adiparvan.

# The problem -- aligning sanskrit text is hard
The text of Critical Edition is organized nicely into chapters, whereas the Gita Press parsed-and-annotated data is a contiguous list of lines, simply annotated as "hindi" or "sanskrit". The Gita Press Edition does not translated the Critical Edition! This means, to map the hindi translation to the corresponding sanskrit text, we need to first align the *sanskrit* text of the Gita press to the Critial Edition to map out the chapter limits. 

We started of with a simple string comparison

> CE: नारायणं नमस्कृत्य नरं चैव नरोत्तमम्
> GP: नारायणं नमस्कृत्य नरं चैव नरोत्तमम्

The sequence similarity score for this pair is 100%.  This works great, until we get to 

> CE: यदैव पितरं वृत्तमुत्तङ्कादशृणोत्तदा
> GP: यदैव वृत्तं पितरमुत्तङ्कादशृणोत् तदा

The sequence similarity score is only 82%, even though we know these two are *semantically* identical sanskrit sentences. And there is no correct way to pick a sequence similarity cutoff without risking losing real matches.

Two features of written sanskrit bite us here: first, *word order* isn't important in Sanskrit. This by itself is not a problem, because we could simply compare *words* in a sentence. The second feature, is that written Sanskrit has no concept of spaces between words. Words are conjugated following the **sandhi** rules, and the breaking of compound words into its constituents is still an open research problem[^1]. 

Trying to implement a sandhi-engine is definitely out of the scope of this project.  But this task, of simply comparing a string of swapped characters, while ignoring the *semantic* content of the string, maps very well to multiple parallels in computational biology.

# Inspiration from computational biology

The next two subsections introduce the inspiration from a problem in sequence alignment, and the technical description of the algorithm. Feel free to skip this!

## Sequence comparison algorithms

As early as 1970, Needleman and Wunsh had worked out an efficient algorithm to compare two DNA seqeuences. The problem they were facing was very similar to ours -- the "same" gene from multiple species have *similar* but not *identical* DNA sequences, caused by mutations or deletions. The Needleman-Wunsch dynamic program walks down a pair of sequences, rewarding matches, and penalizing mismatches and deletions/insertions. This basic idea is extremely powerful, and variants of this algorithm continue to be the workhorse of biology today. 

But the dynamic program doesn't solve our problem -- we don't have "mutations" and "insertions/deletions". Those might correspond to variant word endings, which are only a part of the problem. Our larger issue is entire phrases, or groups of words that are *transposed*.  Interestingly, this corresponds to a different problem in genomics -- between different species, the *ordering* of genes on a chromosome varies.  The common arrangement of gene blocks is called synteny. In a nutshell, the so-called "glocal" or local-global methods use a local alignment method (like Needleman-Wunsch) to find small high similarity stretches of DNA, and then use "global" alignment methods that reward contiguous stretches of similar sequences.
This seems like the right set of tools to score and align two different sanskrit corpuses!

## A syntheny-block type local-global aligner for Sanksrit text

We used LLMs to propose an implementation using the ideas above, and adapting the methods to deal with our problem at hand.

Adapting the basic tooling to sanskrit text, we make some assumptions on how to score two Sanskrit lines:
1. We are aligning devanagari text. Each character is a consonant-vowel combination, or conjunct consonants. This, the akshara, becomes the unit of comparison, not the underlying atomic raw Unicode code itself.
2. Scoring is as follows. We don't penalize a mismatch in the trailing nasal variant, or an anusvara.
   | Score            | Condition                                         | Example |
   |------------------|---------------------------------------------------|---------|
   | +2 (`MATCH`)     | identical akshara                                 | त्त = त्त |
   | +1 (`NASAL_ALT`) | identical but for a trailing anusvara/candrabindu | रं ≈ र   |
   | 0 (`PARTIAL`)    | same base consonant/vowel, different vowel sign   | णो ≈ णा |
   | −1 (`MISMATCH`)  | unrelated                                         | त ≠ श   |
   | −2 (`GAP`)       | no corresponding akshara at all                   | —       |
3. We track the longest stretch of positive scoring aksharas. These stretches are called "anchors"
   ```
   count[i][j] = count[i-1][j-1] + 1,  if score(a[i], b[j]) >= 0
   wsum[i][j]  = wsum[i-1][j-1] + score(a[i], b[j])
   (both reset to 0 otherwise)
   ```
4. Chaining anchors together: If anchors appear in the same order in the two queries, there is no penaly. We penalize transposed anchors, and overlapping anchors are disqualified. The final scoring is 

   ```
   score = sum(anchor weights) - 2 * (unaligned aksharas, either side) - 3 * (number of reorder events)
   ```
# Aligning to the Critical Edition and outlook

When we apply our `chain-anchor` method to score this pair

> CE: यदैव पितरं वृत्तमुत्तङ्कादशृणोत्तदा
> GP: यदैव वृत्तं पितरमुत्तङ्कादशृणोत् तदा

![](/assets/images/chain_anchor_example.png)

We now successfully recover the mapping of both पितरं and वृत्तं. This method isn't perfect by any means, it misaligns the terminal त् in the GP text with the त्त in the critical edition.  But this is good enough that it allows us to cheaply align the Gita Press text with the Critical Edition!

The chain-anchor method discussed here is not novel in its algorithmic content, but to the best of our knowledge, this approach is novel in its application to comparing Sanskrit texts.

By looping over the Critical Edition chapters, we at least have delimiters for where in the monolithic GP text the corresponding translation sentences might lie. This exact approach can be used to automate the construction of critical editions, and align Bhashyas or commentaries to the source texts. We will continue to explore these applications.


# Parse Details
1. Downloaded the pdf of Volume 1 from [archive.org](https://archive.org/details/mahabharata-volume-1_202301)
2. Split the document into individual pages using pdftk, and converted the PDF pages to PNG. Attempted to parse the text directly from the PDF, but this failed bacause of the text encoding.
3. Used Sarvam's vision model to OCR from the images which worked very well. ([script](https://github.com/amoghpj/mahabharata-experiments/blob/main/adiparvan_ganguli_reader/src/extract_gitapress_text.py))
4. Collate the OCR text together in a single file. At this point the sanskrit and hindi text were interleaved.
   > ॐ नमो भगवते वासुदेवाय। ॐ नमः पितामहाय। ॐ नमः प्रजापतिभ्यः। ॐ
   > नमः कृष्णद्वैपायनाय। ॐ नमः सर्वविघ्नविनायकेभ्यः।
   > ॐकारस्वरूप भगवान् वासुदेवको नमस्कार है। ॐकारस्वरूप भगवान् पितामहको
   > नमस्कार है। ॐकारस्वरूप प्रजापतियोंको नमस्कार है। ॐकारस्वरूप श्रीकृष्णद्वैपायनको
   > नमस्कार है। ॐकारस्वरूप सर्व-विघ्नविनाशक विनायकोंको नमस्कार है। 

5. First attempt and parsing failed - attempted to use ftlangdetect to classify each line as sanskrit or hindi. This has about a 90% accuracy, but some with enough mistakes that I decided to abandon this.
6. Second attempt - vibe coded a language classifier interface so a human could easily classify each line as sanskrit or hindi. This worked well, with the participation of 7 people over 2 months.
  > 651,sanskrit,ॐ नमो भगवते वासुदेवाय। ॐ नमः पितामहाय। ॐ नमः प्रजापतिभ्यः। ॐ
  > 652,sanskrit,नमः कृष्णद्वैपायनाय। ॐ नमः सर्वविघ्नविनायकेभ्यः।
  > 653,hindi,ॐकारस्वरूप भगवान् वासुदेवको नमस्कार है। ॐकारस्वरूप भगवान् पितामहको
  > 654,hindi,नमस्कार है। ॐकारस्वरूप प्रजापतियोंको नमस्कार है। ॐकारस्वरूप श्रीकृष्णद्वैपायनको
  > 655,hindi,नमस्कार है। ॐकारस्वरूप सर्व-विघ्नविनाशक विनायकोंको नमस्कार है।
7. Manually verified conflicts and fixed misclassifications of the annotated data. (`gitapress_1_verify_gitapress_annotations.py`)
8. Made a canonical classification label and indexed the corpus. (`gitapress_2_standardize_annotations.py`)
9. First attempt at auto aligning with the CE sanksrit failed - word order changes, line splits are non standard, and there are multiple occurences of some phrases so partial matching leads to false positives
10. Sloka alignment. We modify algorithms from computation biology to score sloka comparisons.
11. 

[^1]: Nerdich and others has made progress recently using some deep learning models for this task, see [One Model is All You Need: ByT5-Sanskrit, a Unified Model for Sanskrit NLP Tasks](https://arxiv.org/abs/2409.13920)
[^2]: Bechet, Pouliquen, and Csernel, "[Comparing Sanskrit Texts for Critical Editions: the sequences move problem](https://inria.hal.science/hal-00796131/PDF/ACTI-KEMMAR-2012-1.pdf)"]
