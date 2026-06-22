const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  // Wait for the globe to render
  await page.waitForTimeout(2000);
  
  const rects = await page.evaluate(() => {
    const section = document.querySelector('section').getBoundingClientRect();
    const canvas = document.querySelector('canvas').getBoundingClientRect();
    const blueBox = document.querySelector('.absolute.left-1\\/2').getBoundingClientRect();
    return { section, canvas, blueBox };
  });
  
  console.log(JSON.stringify(rects, null, 2));
  await browser.close();
})();
