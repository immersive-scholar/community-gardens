https://github.com/stereobooster/react-snap/issues/240
add to puppeteer_utils.js, line 215:

```// old method has a 30 second timeout that is problematic with react-snap
    // await page.goto(pageUrl, { waitUntil: "networkidle0" });
    // add timeout: 0 param.
    await page.goto(pageUrl, {
        waitUntil: "networkidle0",
        timeout: 0
    });
```
