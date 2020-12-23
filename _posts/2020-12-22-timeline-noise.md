---
title: "A timeline of the studies investigating stochastic gene expression"
layout: post
description: Mostly theory, with some experiments thrown in
tag:
- biology
blog: true
---

I spent a few days last week catching up with the literature on stochastic gene expression. Here is the timeline that I put together. It is a work in progress, but I found a lot of interesting new ideas when assembling this table!

| Year | Description                                                                | Citation                                                           |
|------|----------------------------------------------------------------------------|--------------------------------------------------------------------|
| 1977 | Gillespie publishes the exact SSA                                          | [^1977_jpc_gillespie_exact_stochastic_simulation]                  |
| 1989 | Tyson at VT builds on Alt-Tyson1986 in an attempt to                       | [^1989_matbio_tyson_asymmetric_division_stochastic]                |
|      | build a model of cell size distribution for                                |                                                                    |
|      | asymmetric division and stochastic process                                 |                                                                    |
|      | governing production of cell cycle activator                               |                                                                    |
| 1997 | McAdams and Arkin at Stanford propose the first model of "stochastic" gene | [^1997_pronatacasci_mcadams_stochastic_mechanisms]                 |
|      | expression, thinking about delays in activation of circuits if             |                                                                    |
|      | expression is noisy. Focus on prokaryotic expression, use SSA.             |                                                                    |
|      | Good untuitive development of Poisson statistics ideas.                    |                                                                    |
| 2001 | Thattai at MIT uses the SSA to characterize a few simple regulatory        | [^2001_pnas_thattai_intrinsic_noise]                               |
|      | systems. Compare simulations to analytical results                         |                                                                    |
| 2002 | Swain and others at Rockefeller draw a distinction between intrinsic and   | [^2002_pnas_swain_intrinsic_extrinsic_contributions]               |
|      | extrinsic noise, and report the first formal analysis of expected          |                                                                    |
|      | noise including bursting. This paper also gives the reason for defining    |                                                                    |
|      | noise as variance/mean, showing that this definition allows us             |                                                                    |
|      | to simply add up intrinsic and extrinsic noise to get total noise.         |                                                                    |
| 2004 | Raser and O'Shea introduce the two color experiments                       | [^2004_sci_raser_control_stochasticity_eukaryotic]                 |
|      | to distinguish intrinsic and extrinsic noise                               |                                                                    |
| 2005 | Paulsson reviews the state of art theory. Includes                         | [^2005_phylifrev_paulsson_stochastic_expression]                   |
|      | work by Elowitz, van Oudenaarden.                                          |                                                                    |
| 2005 | Kussel and Leibler publish theory showing                                  | [^2005_sci_kussell_phenotypic_diversity_growth_information]        |
|      | the advantages of stochastic phenotype switching.                          |                                                                    |
|      | This puts stochastic gene expression as the basis of                       |                                                                    |
|      | bet hedging, a non genetic basis of variation.                             |                                                                    |
| 2006 | First global  survey of expression noise, led by Arren Bar-Even            | [^2006_NatGen_Bar-Even_Noise_Protein_Expression_Scales]            |
|      | which systematically interrogates the origin of noise                      |                                                                    |
| 2007 | So what are the consequences of noise? Di Talia and others at Rockefeller  | [^2007_DiTalia_Molecular_Noise_Size_Control]                       |
|      | ask if cell cycle time distributions are in agreement with                 |                                                                    |
|      | the expected noise in molecular regulators. The style is different, the    |                                                                    |
|      | measurements are not even molecular!                                       |                                                                    |
| 2009 | Taking a significant leap forward, Kar in Tyson's group shows that         | [^2009_pronatacasci_kar_noise_cell_cycle]                          |
|      | a stochastic version of mechanistic cell cycle model produces              |                                                                    |
|      | the expected cell cycle timing distributions.                              |                                                                    |
| 2013 | Sanchez and Golding show a markedly different                              | [^2013_science_sanchez_genetic_determinants_noisy_gene_expression] |
|      | global transcriptional noise structure in yeast as                         |                                                                    |
|      | compared to bacteria and mammalian cells. Consequences?                    |                                                                    |
| 2015 | Keren sources the origin of the growth rate coupling of noise              | [^2015_genres_keren_noise_gene_expression_growth_rate]             |
|      | to the population distributions in G1 and G2. The ploidy                   |                                                                    |
|      | ratios are a simple explanation of growth rate dependent noise.            |                                                                    |
| 2015 | Metzger in Patricia Wittkopp's group at Michigan shows that                | [^2015_nat_metzger_selection_noise_constrains]                     |
|      | noise has consequences at the sequence level, bringing evolution           |                                                                    |
|      | into the picture.                                                          |                                                                    |
| 2018 | Duveau studied the consequences for cellular fitness. An important         | [^2018_eli_duveau_fitness_effects_noise]                           |
|      | contribution is the experiment design: increasing noise while holding      |                                                                    |
|      | mean expression constant.                                                  |                                                                    |




# Bibliography
[^1977_jpc_gillespie_exact_stochastic_simulation] Daniel Gillespie, Exact Stochastic Simulation of Coupled Chemical  Reactions, <i>The Journal of Physical Chemistry</i>, <b>81(25)</b>, 2340-2361 (1977). <a href="https://doi.org/10.1021/j100540a008">link</a>. <a href="http://dx.doi.org/10.1021/j100540a008">doi</a>. [↩](#7ac65b7c5a7256bb5634328552ff3a37)

[^1989_matbio_tyson_asymmetric_division_stochastic] John Tyson, Effects of Asymmetric Division on a Stochastic Model  of the Cell Division Cycle, <i>Mathematical Biosciences</i>, <b>96(2)</b>, 165-184 (1989). <a href="https://doi.org/10.1016/0025-5564(89)90057-6">link</a>. <a href="http://dx.doi.org/10.1016/0025-5564(89)90057-6">doi</a>. [↩](#8da311c889b26dcc05deb973b84852ff)

[^1997_pronatacasci_mcadams_stochastic_mechanisms] McAdams & Arkin, Stochastic Mechanisms in Gene Expression, <i>Proceedings of the National Academy of Sciences</i>, <b>94(3)</b>, 814-819 (1997). <a href="https://doi.org/10.1073/pnas.94.3.814">link</a>. <a href="http://dx.doi.org/10.1073/pnas.94.3.814">doi</a>. [↩](#f62c5bb44c470410f74df7a57dd8fcb4)

[^2001_pnas_thattai_intrinsic_noise] Thattai & van Oudenaarden, Intrinsic Noise in Gene Regulatory Networks, <i>Proceedings of the National Academy of Sciences</i>, <b>98(15)</b>, 8614-8619 (2001). <a href="https://doi.org/10.1073/pnas.151588598">link</a>. <a href="http://dx.doi.org/10.1073/pnas.151588598">doi</a>. [↩](#e02fd250e37c0607313ed2f6f7222a21)

[^2002_pnas_swain_intrinsic_extrinsic_contributions] Swain, Elowitz & Siggia, Intrinsic and Extrinsic Contributions To  Stochasticity in Gene Expression, <i>Proceedings of the National Academy of Sciences</i>, <b>99(20)</b>, 12795-12800 (2002). <a href="https://doi.org/10.1073/pnas.162041399">link</a>. <a href="http://dx.doi.org/10.1073/pnas.162041399">doi</a>. [↩](#f12b4922a22df052cc1094cfea50d293)

[^2004_sci_raser_control_stochasticity_eukaryotic] Jonathan Raser & Erin O'Shea, Control of Stochasticity in Eukaryotic Gene  Expression, <i>Science</i>, <b>304(5678)</b>, 1811-1814 (2004). <a href="https://doi.org/10.1126/science.1098641">link</a>. <a href="http://dx.doi.org/10.1126/science.1098641">doi</a>. [↩](#138befe62b9a12f0a0009468227f9c5a)

[^2005_phylifrev_paulsson_stochastic_expression] Johan Paulsson, Models of Stochastic Gene Expression, <i>Physics of Life Reviews</i>, <b>2(2)</b>, 157-175 (2005). <a href="https://doi.org/10.1016/j.plrev.2005.03.003">link</a>. <a href="http://dx.doi.org/10.1016/j.plrev.2005.03.003">doi</a>. [↩](#6384704a2996679333e91b568dac32d8)

[^2005_sci_kussell_phenotypic_diversity_growth_information] Edo Kussell & Stanislas Leibler, Phenotypic Diversity, Population Growth, and  Information in Fluctuating Environments, <i>Science</i>, <b>309(5743)</b>, 2075-2078 (2005). <a href="https://doi.org/10.1126/science.1114383">link</a>. <a href="http://dx.doi.org/10.1126/science.1114383">doi</a>. [↩](#b797724f8c26a984ac3e911682b584ba)

[^2006_NatGen_Bar-Even_Noise_Protein_Expression_Scales] Arren Bar-Even, Johan Paulsson, Narendra, Maheshri, Miri Carmi, Erin O'Shea, Yitzhak, Pilpel & Naama Barkai, Noise in Protein Expression Scales With Natural  Protein Abundance, <i>Nature Genetics</i>, <b>38(6)</b>, 636-643 (2006). <a href="https://doi.org/10.1038/ng1807">link</a>. <a href="http://dx.doi.org/10.1038/ng1807">doi</a>. [↩](#c8f606cbca622e725e7be650b1d11105)

[^2007_DiTalia_Molecular_Noise_Size_Control] Stefano Di Talia, Jan Skotheim, James, Bean, Eric Siggia & Frederick Cross, The Effects of Molecular Noise and Size Control on  Variability in the Budding Yeast Cell Cycle, <i>Nature</i>, <b>448(7156)</b>, 947-951 (2007). <a href="https://doi.org/10.1038/nature06072">link</a>. <a href="http://dx.doi.org/10.1038/nature06072">doi</a>. [↩](#b1c5d8a02c9fa2af8f2249bf7515e61f)

[^2009_pronatacasci_kar_noise_cell_cycle] Kar, Baumann, Paul, & Tyson, Exploring the Roles of Noise in the Eukaryotic Cell  Cycle, <i>Proceedings of the National Academy of Sciences</i>, <b>106(16)</b>, 6471-6476 (2009). <a href="https://doi.org/10.1073/pnas.0810034106">link</a>. <a href="http://dx.doi.org/10.1073/pnas.0810034106">doi</a>. [↩](#6e71f9788227df62397188c126e992d3)

[^2013_science_sanchez_genetic_determinants_noisy_gene_expression] Sanchez & Golding, Genetic Determinants and Cellular Constraints in  Noisy Gene Expression, <i>Science</i>, <b>342(6163)</b>, 1188-1193 (2013). <a href="https://doi.org/10.1126/science.1242975">link</a>. <a href="http://dx.doi.org/10.1126/science.1242975">doi</a>. [↩](#8ffaa1e1daa75575f325ed5fc4337912)

[^2015_genres_keren_noise_gene_expression_growth_rate] Leeat Keren, David van Dijk, Shira, Weingarten-Gabbay, Dan Davidi, Ghil Jona, , Adina Weinberger, Ron Milo & Eran Segal, Noise in Gene Expression Is Coupled To Growth Rate, <i>Genome Research</i>, <b>25(12)</b>, 1893-1902 (2015). <a href="https://doi.org/10.1101/gr.191635.115">link</a>. <a href="http://dx.doi.org/10.1101/gr.191635.115">doi</a>. [↩](#ddc0f418428e4021317cf43e99bdcac7)

[^2015_nat_metzger_selection_noise_constrains] Brian Metzger, David Yuan, Jonathan, Gruber, Fabien Duveau, Patricia & Wittkopp, Selection on Noise Constrains Variation in a  Eukaryotic Promoter, <i>Nature</i>, <b>521(7552)</b>, 344-347 (2015). <a href="https://doi.org/10.1038/nature14244">link</a>. <a href="http://dx.doi.org/10.1038/nature14244">doi</a>. [↩](#c3395803e73e200944d8f05bcaa0bb4a)

[^2018_eli_duveau_fitness_effects_noise] Fabien Duveau, Andrea Hodgins-Davis, Brian PH, Metzger, Bing Yang, Stephen Tryban, , Elizabeth A Walker, Tricia Lybrook, Patricia J & Wittkopp, Fitness Effects of Altering Gene Expression Noise in  Saccharomyces Cerevisiae, <i>eLife</i>, <b>7(nil)</b>, nil (2018). <a href="https://doi.org/10.7554/elife.37272">link</a>. <a href="http://dx.doi.org/10.7554/elife.37272">doi</a>. [↩](#b329699eec05f0815bca9fcea2fd916c)

