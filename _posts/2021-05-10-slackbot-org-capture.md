---
title: "Writing a slackbot for org-capture"
layout: post
description: Or how I learned to appreciate ngrok and my raspberry pi
tag:
- emacs
- python
blog: true
---
One of the problems of my quantified self workflow is how I should capture times when I am away from my personal laptop. (I prefer not to have personal org files on work machines). While there are other solutions out there, including running emacs on `tmux`, one method that hasn't received much attention seems to be using things like slackbots to interact with a remote server. I describe here my first attempt at setting up a python bot to execute org-capture using the org-protocol.

What you will need to follow these instructions:
1. Access to a slack channel where you can experiment. I just made a free workspace for myself.
2. Python3
3. ngrok - [from their website](https://ngrok.com/)

# Step 1 - Make a new slackbot on the Slack developer interface
Login to slack, and [Create A New App](https://api.slack.com/apps). I am not going to outline all the steps here because honestly, I mucked around with the settings myself. But you can follow the instructions [on these pages](https://api.slack.com/start/overview).

The hardest part of understanding the API infrastructure for me was to wrap my head around [scopes](https://api.slack.com/tutorials/understanding-oauth-scopes-bot) and [events](https://api.slack.com/apis/connections/events-api). In my understanding, the former limits the permissions of what the bot has access to in Slack, and the latter defines what types of events the bot should listen for.

Once you create an app and follow the instructions on how to install it I got the keys I needed from here:
1. `Settings > Install App : Bot User OAuth Token`. 
   I've stored this key in my `.bashrc` as `export SLACK_BOT_TOKEN="xoxb-XXXX`
2. `Settings > Basic Information : Signing Secret`, 
   which I've stored as `export SLACK_SIGNING_SECRET="XXX`


I called my app the `capture-bot`, and named the bot in the workspace `capture`.

# Step 2 - Using a simple capture template to test the bot
Since I am using org-protocol, I need some way of sending information specifying which capture template to use. Consider a capture template as follows which simply records a time stamp and finishes the capture process.

```emacs-lisp
  (setq org-capture-templates
        '(
            ("c" "Record coffee" entry
           (file+datetree "~/orgs/qself.org" "Capture" )
           "* Coffee
                     :PROPERTIES:
                     :immediate-finish:
                     :coffee: %U
                     :END:"
           :immediate-finish t)))
```

To call this template using `org-protocol`, first run `M-x server-start` if the emacs server isn't already running, and then call the template as follows from the command line

```bash
emacsclient "org-protocol://capture?template=c"
```

# Step 3 - Write a python app 
(Using a virtual environment is always recommeneded).
This bit was a little confusing because all the prominent google hits for "build python slackbot" are outdated. The latest python SDK is documented [here](https://github.com/slackapi/python-slack-sdk). I have simply followed [this tutorial](https://github.com/slackapi/python-slack-sdk/tree/main/tutorial).

A valid bot interaction to call the capture template above would look like `@capture do coffee`. 
I am choosing full words because they are easier to type with swipe on a touch interface.

I also had to install the following python libraries. You might need to install `Flask` if you don't have it already.
```bash
pip install slack_sdk
pip install slackeventsapi
```

I am dumping my entire `capturebot.py` script here. The magic is in the `do_capture()` function.

```python
import os
import time
from slack_sdk.web import WebClient
from slackeventsapi import SlackEventAdapter
import logging
from flask import Flask

### Setup keys by reading from ~/.bashrc
app = Flask(__name__)
slack_events_adapter = SlackEventAdapter(os.environ['SLACK_SIGNING_SECRET'], "/slack/events", app)
slack_web_client = WebClient(token=os.environ['SLACK_BOT_TOKEN'])

### Setup a dictionary to specify the capture template
mapper = {"coffee":"c"}

@slack_events_adapter.on(event="message")
def do_capture(payload):
    print("recieved payload...")
    data = payload['event']
    command = data['text'].split(' ')
    if len(command) == 3:
        if 'do' in command[1]:
            channel_id = data['channel']
            user = data['user']
            thread_ts = data['ts']
            slack_web_client.chat_postMessage(channel=channel_id,
                                          text="Hi amogh, you've requested command: \"" +\
                                          command[2]+ "\"", thread_ts=thread_ts)
        if command[2] in ["coffee", "wake", "lunch", "dinner", "toilet", "sleep"]:
            os.system("emacsclient \"org-protocol://capture?template=" + mapper[command[2]] + "\"")

if __name__ == "__main__":
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    logger.addHandler(logging.StreamHandler())
    app.run(port=3000)
```
# Step 4 - Start flask server 
At this point, running `python capturebot.py` will start the bot locally. In order for Slack to communicate with this local Flask server, I used `ngrok`. So simply (download the setup the ngrok binaries and) run `ngrok 3000`. Finally, copy this ngrok URL and paste it into `Features > Event Subscriptions : Request URL` on the app dashboard.

# Caveats 
1. The capture template that you invoke will have to be non interactive. So this method is mostly useful for adding todos, and capturing links. I'd appreciate links to creative uses of org-protocol.
2. Running the ngrok server still needs a persistent internet connection. Luckily, I've had a raspberry pi lying around for a couple of years now that was perfect for this application.
3. Running a free slack bot probably has a limit on the number of bot interactions. But this post is really about the proof of concept.
