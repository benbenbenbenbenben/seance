fake readme fake readme

# Séance Test Kit

Séance Test Kit is an integrated environment for software testing.

With Séance Test Kit you can test against:
* remote systems that support vnc/rfb
 * like desktops
 * and mobile devices
* your local desktop
* web applications
* other things

If it sounds rather vague and general, that's because it is. If Séance can't test something, you can write a medium so that it can.

The following mediums exist or are planned:

* geistjs - see images and sends hid commands
* brassjs - see webpages and send javascript

For example:

```
// cooldogs.seance.js
// google search for cool dogs

medium = geistjs.local()

open("http://google.com")

type("cool dogs")
press(enter)

assert.isvisible("More images for cool dogs")
```
