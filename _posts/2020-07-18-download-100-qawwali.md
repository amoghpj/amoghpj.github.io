---
title: "Parsing webpages to build a collection of Qawwali performances"
layout: post
description: Attempting to parse webpages
tag:
- python
- music
blog: true
---

I've been itching to get better at web-parsing. I've been recently listening to a lot of qawwali on Youtube, but I've been meaning to expand the list of songs I listen to and not get locked in to the recommendations. I came across [this website](https://www.thesufi.com/sufimusic/100-best-qawwali-music-tracks-ever.html) of a list of "100 best Qawwali tracks". Below is my attempt at parsing webpages to automatically extract .mp3 links which I then downloaded using wget.

I started off with making two directories, one to hold the webpages and one to hold the music files
```bash
    mkdir data
    mkdir music
```

I was initally planning on using `wget` to download the actual files from URLs, but I realized there was a [wget module for python](https://pypi.org/project/wget/), so I installed that first.  Next, I downloaded the index page, hoping that it would list links to the MP3 files.
```python
    import wget
    import os
    from tqdm import tqdm
    frontpage = "https://www.thesufi.com/sufimusic/100-best-qawwali-music-tracks-ever.html"
    datapath = 'data/frontpage.html'
    
    if not os.path.exists(datapath):
        wget.download(frontpage, datapath)
```
Some quick grepping showed that this page contains links to other HTML webpages for each track, which in turn has a Download link for the track. To parse each page, I started off with the template example on the python documentation site for the [HTML parser](https://docs.python.org/3/library/html.parser.html) to store links from html `attr`s that lead to other webpages. I fine-tuned the conditional to get the links I was interested in. 
```python
    from html.parser import HTMLParser
    from html.entities import name2codepoint
    
    class MyHTMLParser(HTMLParser):
        def __init__(self):
            HTMLParser.__init__(self) # This is important to inherit HTMLParser's local variables
            self.links = []           # list to store links
    
        def handle_starttag(self, tag, attrs):
            for attr in attrs:
                k, v = attr
                # Somewhat arbitrary filter which gets the job done
                if k == 'href' and ('thesufi.com/sufimusic/' in v and  '.html' in v) and (len(v.split('/')) > 5):
                    self.links.append(v)
```

Using this parser, I extracted the relevant links to webapges and dumped them in a file called `data/alllinks`
 
```python

    parser = MyHTMLParser()
    data = ""
    with open(datapath, 'r') as infile:
        data = "".join(infile.readlines())
    parser.feed(data)
    with open('data/alllinks','w') as outfile:
        for l in parser.links:
            outfile.write(l+'\n')
```


This is the main loop. For each link the the file:

1.  download the webpage if it doesn't exist, while handling 404 errors with a try block
2.  read the webpage in as a string
3.  parse the webpage and collect all links which end with .mp3 using the ParseMP3 class.
4.  download the mp3 file, while handling any request errors.

First, I had to define another HTML parser to look for mp3 links

```python
    class ParseMP3(HTMLParser):
        def __init__(self):
            HTMLParser.__init__(self)
            self.mp3link = []
    
        def handle_starttag(self, tag, attrs):
            for attr in attrs:
                k, v = attr
                if k == "href" and v.endswith(".mp3"):
                    self.mp3link.append(v)
```

Next, I read the list of links from `data/alllinks`, which I will loop over

```python
    alllinks = []
    with open('data/alllinks','r') as infile:
        for link in infile.readlines():
            alllinks.append(link.strip())
```

Finally, here's the main loop, as described above

```python
    for link in tqdm(alllinks[1:]):  # Hack starting from second element, because first link was not relevant!
        print("Current link: ", link)
        # Download the webpage
        fname = 'data/' + link.split('/')[-1]
        if os.path.exists(fname):
            print("Skipping download...")
        else:
            print("Downloading: ", fname)
            try:
                wget.download(link, fname)
            except:
                print(link, "could not be downloaded. Skipping...")
    
        # load webpage
        with open(fname, 'r') as webp:
            page = "".join(webp.readlines())
    
        # Parse webpage for the mp3 link
        parser = ParseMP3()
        parser.feed(page)
        if len(parser.mp3link) == 0:
            print(fname, 'contains no links. skipping')
        else:
            mp3link = list(set(parser.mp3link))[0]        
            targetpath = 'music/' + mp3link.split('/')[-1]
            if os.path.exists(targetpath):
                print(mp3link, 'exists, skipping...')
            else:
                print("Downloading mp3: ", targetpath)
                try:
                    wget.download(mp3link,targetpath )
                except:
                    print(link, "could not be downloaded. Skipping...")
```

I added the try-except blocks after I first encountered a 404 error that caused the script to exit, and the code looks messy, but the code overall is quite straightforward.

Of the advertised 100, I could only find 91 links using my initial filter, but otherwise (discounting the handful that errored out), I now have a substantial collection of qawwali that I can listen to offline.

