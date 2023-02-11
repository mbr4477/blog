---
title: Apparently You Can Hard Brick SD Cards
description: "Recently, I was attempting to setup a Raspberry Pi Zero W with the latest Raspbian Buster Lite image and ran into an ... uh ... issue."
date: "2019-12-29T07:58"
tags: ["raspberry-pi"]
---

Recently, I was attempting to setup a Raspberry Pi Zero W with the latest Raspbian Buster Lite image and ran into an ... uh ... issue. After dropping in an empty `ssh` file and a `wpa_supplicant.conf` to enable headless access over WiFi, I logged in, expanded the filesystem to the full SD card capacity (16 gigs in my case), rebooted and then ran the normally innocuous

```bash
sudo apt-get update
sudo apt-get upgrade
```

The update seemed to run fine, but then the upgrade felt much longer than I remember in the past. Everything appeared to still be going okay until the output started complaining that something went wrong when installing a package. I wish I had captured the log, but I didn't. Anyway, the SSH connection dropped, and my subsequent attempts to reconnect were met with the message that my connection was refused by the remote host. My next move was to reboot -- by power cycling, which may have not been advisable... 

After reconnecting the power USB cable, the activity light didn't come one. Oh no. I tried the SD card in another Pi Zero W and still had no luck. At this point, I figured I could just reflash the drive. I popped the card in my laptop and tried flashing with Etcher, but got a permissions error. After probably a half hour of DISKPART desperation from the command line and googling, I realized that I had likely bricked the SD card. Apparently, the cards have a hardware write-protect bit which kicks in when the contents might be corrupted in an attempt to preserve any data. It was a fresh install, so it didn't really help me here. But, hey, Samsung class 10 32 gig cards have dropped to barely $6 on Amazon, so I guess it's not the end of the world.

Not sure how to prevent this from happening again, so let's hope it's a fluke. I guess I could use a monitor so I'm not so dependent on maintaining the SSH network connection.