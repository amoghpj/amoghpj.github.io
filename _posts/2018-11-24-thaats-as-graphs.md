---
title: "Exploring the relationships between thaats in Hindustani Music"
layout: post
headerImage: false
blog: true
tag:
- music
---

# Table of Contents

1.  [On thaats: the diff graph](#orgb14ef4f)


<a id="orgb14ef4f"></a>

# On thaats: the diff graph

The wikipedia article on Thaats lists the following 10 Hindustani Raags along with the most famous raag associated in the third column.

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="org-right" />

<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />
</colgroup>
<tbody>
<tr>
<td class="org-right">1</td>
<td class="org-left">Bilaval</td>
<td class="org-left">Bilaval</td>
<td class="org-left">S R G M P D N Ś</td>
<td class="org-left">Ionian</td>
<td class="org-left">29th</td>
<td class="org-left">Dheerashankarabharanam</td>
</tr>


<tr>
<td class="org-right">2</td>
<td class="org-left">Kafi</td>
<td class="org-left">Kafi</td>
<td class="org-left">S R g M P D n Ś</td>
<td class="org-left">Dorian</td>
<td class="org-left">22nd</td>
<td class="org-left">Kharaharapriya</td>
</tr>


<tr>
<td class="org-right">3</td>
<td class="org-left">Bhairavi</td>
<td class="org-left">Bhairavi</td>
<td class="org-left">S r g M P d n Ś</td>
<td class="org-left">Phrygian</td>
<td class="org-left">8th</td>
<td class="org-left">Hanumatodi</td>
</tr>


<tr>
<td class="org-right">4</td>
<td class="org-left">Kalyan</td>
<td class="org-left">Yaman</td>
<td class="org-left">S R G m P D N Ś</td>
<td class="org-left">Lydian</td>
<td class="org-left">65th</td>
<td class="org-left">(Mecha) Kalyani</td>
</tr>


<tr>
<td class="org-right">5</td>
<td class="org-left">Khamaj</td>
<td class="org-left">Khamaj</td>
<td class="org-left">S R G M P D n Ś</td>
<td class="org-left">Mixolydian</td>
<td class="org-left">28th</td>
<td class="org-left">Harikambhoji</td>
</tr>


<tr>
<td class="org-right">6</td>
<td class="org-left">Asavari</td>
<td class="org-left">Asavari</td>
<td class="org-left">S R g M P d n Ś</td>
<td class="org-left">Aeolian</td>
<td class="org-left">20th</td>
<td class="org-left">Natabhairavi</td>
</tr>


<tr>
<td class="org-right">7</td>
<td class="org-left">Bhairav</td>
<td class="org-left">Bhairav</td>
<td class="org-left">S r G M P d N Ś</td>
<td class="org-left">Double Harmonic</td>
<td class="org-left">15th</td>
<td class="org-left">Mayamalavagowla</td>
</tr>


<tr>
<td class="org-right">8</td>
<td class="org-left">Marva</td>
<td class="org-left">Marva</td>
<td class="org-left">S r G m P D N Ś</td>
<td class="org-left">-</td>
<td class="org-left">53rd</td>
<td class="org-left">Gamanashrama</td>
</tr>


<tr>
<td class="org-right">9</td>
<td class="org-left">Poorvi</td>
<td class="org-left">Poorvi</td>
<td class="org-left">S r G m P d N Ś</td>
<td class="org-left">-</td>
<td class="org-left">51st</td>
<td class="org-left">Kamavardhani</td>
</tr>


<tr>
<td class="org-right">10</td>
<td class="org-left">Todi</td>
<td class="org-left">Miyan ki Todi</td>
<td class="org-left">S r g m P d N Ś</td>
<td class="org-left">-</td>
<td class="org-left">45th</td>
<td class="org-left">Shubhapantuvarali</td>
</tr>
</tbody>
</table>

We asked the question, if we only consider the swaras associated with
each thaat as a string, can we investigate the graph of thaats
constructed with edge-weights as the string diff of the notes.

<table id="org8f20a19" border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="org-right" />

<col  class="org-left" />

<col  class="org-left" />
</colgroup>
<tbody>
<tr>
<td class="org-right">num</td>
<td class="org-left">name</td>
<td class="org-left">notes</td>
</tr>


<tr>
<td class="org-right">1</td>
<td class="org-left">Bilaval</td>
<td class="org-left">RGMPDN</td>
</tr>


<tr>
<td class="org-right">2</td>
<td class="org-left">Kafi</td>
<td class="org-left">RgMPDn</td>
</tr>


<tr>
<td class="org-right">3</td>
<td class="org-left">Bhairavi</td>
<td class="org-left">rgMPdn</td>
</tr>


<tr>
<td class="org-right">4</td>
<td class="org-left">Kalyan</td>
<td class="org-left">RGmPDN</td>
</tr>


<tr>
<td class="org-right">5</td>
<td class="org-left">Khamaj</td>
<td class="org-left">RGMPDn</td>
</tr>


<tr>
<td class="org-right">6</td>
<td class="org-left">Asavari</td>
<td class="org-left">RgMPdn</td>
</tr>


<tr>
<td class="org-right">7</td>
<td class="org-left">Bhairav</td>
<td class="org-left">rGMPdN</td>
</tr>


<tr>
<td class="org-right">8</td>
<td class="org-left">Marva</td>
<td class="org-left">rGmPDN</td>
</tr>


<tr>
<td class="org-right">9</td>
<td class="org-left">Poorvi</td>
<td class="org-left">rGmPdN</td>
</tr>


<tr>
<td class="org-right">10</td>
<td class="org-left">Todi</td>
<td class="org-left">rgmPdN</td>
</tr>
</tbody>
</table>

Let us first construct the Graph. I write the edge list to file first.

    import pandas as pd
    from networkx import *
    import matplotlib.pyplot as plt
    
    DF=pd.DataFrame(data)                                                                    
    DF.columns=DF.iloc[0]
    DF = DF.drop(0)                                                                                 
    
    def cmp(A, B):
        count = 0
        for a,b in zip(A,B):
            if a != b:
                count += 1
        return count
    
    with open('thaat_edge_list.txt', 'w') as f:
        for i in range(1,11):
            for j in range(i+1,11):
                E = cmp(str(list(DF['notes'].loc[DF['num'] == i])[0]), str(list(DF['notes'].loc[DF['num'] == j])[0]))
                f.write(str(i) + '\t'+ str(j) + '\t' + str(E) + '\n')
            #print(i,j,)
    
    G = read_weighted_edgelist('thaat_edge_list.txt',delimiter='\t',
                      #edgetype=int,
                      nodetype=int,
                      encoding='utf-8')

We can now visualize the graph by coloring the edges by the edge weight.

    colordict = {1:'g',
                 2:'w',
                 3:'w',#'orange',#'orange',
                 4:'w',#'r',
                 5:'w'}#'k'}
    
    nodes = [i for i in range(1,11)]
    labels = {i:DF['name'][i] for i in range(1,11)}
    # print([G[i][j]['weight'] for i,j in G.edges()])
    draw_circular(G,with_labels=True,nodelist=nodes,
                  #width=[G[i][j]['weight'] for i,j in G.edges()]
                  edge_color=[colordict[G[i][j]['weight']] for i,j in G.edges()],
                  node_color='w',
                  labels=labels)
    #plt.label('green=1, blue=2')
    plt.savefig('thaat_diff-1.png',dpi=300)
    #return 'thaat_diff-1,2.png'
    #plt.show()

The green edges show edge weight of 1, i.e. these thaats differ by one note.

![img]({{ site.url}}/assets/images/thaat_diff-1.png)

    colordict = {1:'g',
                 2:'b',
                 3:'w',#'orange',#'orange',
                 4:'w',#'r',
                 5:'w'}#'k'}
    
    nodes = [i for i in range(1,11)]
    labels = {i:DF['name'][i] for i in range(1,11)}
    # print([G[i][j]['weight'] for i,j in G.edges()])
    draw_circular(G,with_labels=True,nodelist=nodes,
                  #width=[G[i][j]['weight'] for i,j in G.edges()]
                  edge_color=[colordict[G[i][j]['weight']] for i,j in G.edges()],
                  node_color='w',
                  labels=labels)
    #plt.label('green=1, blue=2')
    plt.savefig('thaat_diff-1,2.png',dpi=300)
    #return 'thaat_diff-1,2.png'
    #plt.show()

These include thaats that differ by one or two notes

![img]({{ site.url}}/assets/images/thaat_diff-1,2.png)

    colordict = {1:'g',
                 2:'b',
                 3:'orange',#'orange',
                 4:'w',#'r',
                 5:'w'}#'k'}
    
    nodes = [i for i in range(1,11)]
    labels = {i:DF['name'][i] for i in range(1,11)}
    # print([G[i][j]['weight'] for i,j in G.edges()])
    draw_circular(G,with_labels=True,nodelist=nodes,
                  #width=[G[i][j]['weight'] for i,j in G.edges()]
                  edge_color=[colordict[G[i][j]['weight']] for i,j in G.edges()],
                  node_color='w',
                  labels=labels)
    #plt.label('green=1, blue=2')
    plt.savefig('thaat_diff-1,2,3.png',dpi=300)
    #return 'thaat_diff-1,2.png'
    #plt.show()

.. and those that differ by three&#x2026;

![img]({{ site.url}}/assets/images/thaat_diff-1,2,3.png)

    colordict = {1:'g',
                 2:'b',
                 3:'orange',#'orange',
                 4:'r',
                 5:'w'}#'k'}
    
    nodes = [i for i in range(1,11)]
    labels = {i:DF['name'][i] for i in range(1,11)}
    # print([G[i][j]['weight'] for i,j in G.edges()])
    draw_circular(G,with_labels=True,nodelist=nodes,
                  #width=[G[i][j]['weight'] for i,j in G.edges()]
                  edge_color=[colordict[G[i][j]['weight']] for i,j in G.edges()],
                  node_color='w',
                  labels=labels)
    #plt.label('green=1, blue=2')
    #plt.legend()
    plt.savefig('thaat_diff-1,2,3,4.png',dpi=300)
    #return 'thaat_diff-1,2.png'
    #plt.show()

&#x2026; and finally up to four notes (in red).

![img]({{ site.url}}/assets/images//thaat_diff-1,2,3,4.png)

What thaats are similar to all other thaats? Look at number of thaats at most 2 notes different

    degreedict = {}
    for i in range(1,11):
       count =0
       degreedict[i] = {'count':0,'name':labels[i]}
       for j in range(1, 11):
          #print(G[i][j]['weight'])
          if  i!=j and G[i][j]['weight'] <= 2.0:
             count += 1
       degreedict[i]['count'] = count
    
    for k in degreedict.keys():
       print(degreedict[k]['name'],degreedict[k]['count'])

What thaats are most different from other thaats? Look at number of thaats that are more than 3 notes different.

    degreedict = {}
    for i in range(1,11):
       count =0
       degreedict[i] = {'count':0,'name':labels[i]}
       for j in range(1, 11):
          #print(G[i][j]['weight'])
          if  i!=j and G[i][j]['weight'] > 3.0:
             count += 1
       degreedict[i]['count'] = count
    
    for k in degreedict.keys():
       print(degreedict[k]['name'],degreedict[k]['count'])


![and as an animated gif!]({{ site.url}}/assets/images/thaat_graph_1.gif)
While these are purely abstract relationships between thaats, we will be exploring the significance of these relationships on the raags that constitute each thaat next week!

