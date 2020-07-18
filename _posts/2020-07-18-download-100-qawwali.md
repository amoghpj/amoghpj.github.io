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

Copied from here:
<https://docs.python.org/3/library/html.parser.html>
```python
    from html.parser import HTMLParser
    from html.entities import name2codepoint
    
    class MyHTMLParser(HTMLParser):
        def __init__(self):
            HTMLParser.__init__(self)
            self.links = []
    
        def handle_starttag(self, tag, attrs):
            for attr in attrs:
                k, v = attr
                if k == 'href' and ('thesufi.com/sufimusic/' in v and  '.html' in v) and (len(v.split('/')) > 5):
                    self.links.append(v)

    parser = MyHTMLParser()
    data = ""
    with open(datapath, 'r') as infile:
        data = "".join(infile.readlines())
    parser.feed(data)
    with open('data/alllinks','w') as outfile:
        for l in parser.links:
            outfile.write(l+'\n')
```

Next, download each link from `alllinks`, parse them for a .mp3 link attr, and use wget to download that file

Here is the parser which stores all links that end with .mp3

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

Read the list of links stored to file

```python
    alllinks = []
    with open('data/alllinks','r') as infile:
        for link in infile.readlines():
            alllinks.append(link.strip())
```

This is the main loop. For each link the the file:

1.  download the webpage if it doesn't exist, while handling 404 errors with a try block
2.  read the webpage in as a string
3.  parse the webpage and collect all links which end with .mp3 using the ParseMP3 class.
4.  download the mp3 file, while handling any request errors.

```python
    for link in tqdm(alllinks[1:]):
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

