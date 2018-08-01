const puppeteer = require('puppeteer');
const zergsrc = require('../helper/zergsrc');

(async () => {
    const brower = await puppeteer.launch({
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        headless: true,
        timeout: 100000
    });
    const page = await brower.newPage();
    await page.goto('https://image.baidu.com/');
    console.log('go to this url');

    await page.setViewport({
        width: 1920,
        height: 1080
    });
    console.log('set width and height');

    await page.focus('#kw');
    await page.keyboard.sendCharacter('爽哥');
    await page.click('.s_btn');
    console.log('pretend to input');

    page.on('load', async ()=>{
        console.log('load complete');
        const srcs = await page.evaluate(() => {
            const images = document.querySelectorAll('img.main_img');
            return Array.prototype.map.call(images, img =>
                img.src
            )
        });
        srcs.forEach(async src => {
            // sleep for a while
            await page.waitFor(300)
            console.log(src)
        })
    });
    await brower.close()
})();