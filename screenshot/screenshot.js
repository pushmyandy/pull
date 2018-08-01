const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        headless: true,
        timeout: 100000
    });
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com');
    await page.screenshot({path: `${Date.now()}.png`});
    await browser.close();
})();
