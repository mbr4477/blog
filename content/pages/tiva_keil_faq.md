---
title: TM4C123GXL (TM4C123GH6M) Development Board
description: "Quick FAQ for issues installing and working with the TIVA LaunchPad and Keil IDE"
date: "2020-02-05T09:17"
tags: ["tiva", "keil", "embedded"]
---
Hopefully this is a useful FAQ for Keil/TIVA IDE setup and basic getting started problems. Big thanks to [Paul Eberhart](https://pappp.net/) & Josh Flout for catching some of these errors.

## Installation & Setup
#### Can I do this on a Mac?
- Unfortunately not natively. Keil is only for Windows, so you'll need to use something like BootCamp or Parallels if you need to use a Mac.

#### When I browse through Device Manager for the drivers I downloaded, I can't find them.
- Make sure you have extracted the driver ZIP file before trying to install the drivers with Device Manager.

## First Attempts to Build & Flash
#### The project files have a yellow triangle on the names and/or Keil is complaining that things are read-only.
- You are likely running the project from within the zip file. Extract the zip file before opening the project.

#### Flash fails, no JTAG device detected.
- Make sure the Stellaris ICDI drivers are installed for the board. If they are correctly installed, no "In-Circuit Debug" devices or interfaces will appear under "Other devices" in the Device Manager.

#### Flash fails, No ULINK device found (or similar).
- Make sure you select *Stellaris ICDI* in the "Use" dropdown under Flash > Configure Flash Tools > Debug (tab). This tells Keil what device to look for.
- If *Stellaris ICDI* is not available, you likely have MDK v5.29+ which removed Stellaris ICDI support from the IDE. To re-add it, install the MDK Stellaris add-on from http://www.keil.com/support/docs/4196.htm

#### Flash fails, No *.axf file found.
- This occurs because the build failed and the *.axf build output was not generated. Make the build log pane at the bottom of the window larger by dragging up the border of the pane. The log output should say how many errors occurred in the build process, and a little farther up, it should say what lines of your files the errors were found on.

## Using the Debugger
#### Debug fails, no JTAG device detected (but normal flash works).
- Make sure drivers are installed for **ALL** In-Circuit Debug devices. The debug interface and flash interface show up as two different virtual devices that both need the same drivers installed

#### I started the debugger, but nothing is happening.
- Use the "Run" button (second from the left in the Debug toolbar) to start the code in debug mode. This button will always tell the board to run to the next breakpoint.
- Once you've hit a breakpoint you can use the "Step" button (looks like an arrow pointing into two curly braces {}) to step through your lines one by one.

#### My breakpoints don't work, or show up with "!" inside them.
- Make sure you only put breakpoints on lines with code. The debugger will ignore breakpoints on lines that are blank or only have comments.

#### I changed my code, but the debugger is acting like my new lines don't exist.
- Whenever you make code changes, make sure exit the debugger and rebuild your project. After building, you can reopen the debugger to step through the new code.

#### My debug console says `error 65: memory access violation` or similar when I try to run with the debugger.
- You are likely running in simulation mode instead of with the device itself. Make sure "Use" (instead of "Use Simulator") is selected in Flash > Configure Flash Tools > Debug (tab).

#### Keil crashes when I try to open the debugger.
- Probably a registry issue. Follow the instructions at this link: http://users.ece.utexas.edu/~valvano/Volume1/Window8KeilDebuggerFix.htm

#### I can't see *X* pane anymore!
- The pane likely was minimized or closed. Use the debug toolbar buttons to reopen the pane (i.e. Register or Memory Window) that you need.