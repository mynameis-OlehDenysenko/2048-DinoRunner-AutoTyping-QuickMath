const { chromium } = require('playwright-chromium');

(async () => {
    const browser = await chromium.launch({ headless: false })
    const page = await browser.newPage()

    await page.goto('https://www.ratatype.ua/typing-test/test/en/')

    await page.click('#startButton')

    const textContent = await page.textContent('.mainTxt')
    for (let i = 0; i < textContent.length; i++){
        await page.waitForTimeout(100)
        await page.keyboard.press(textContent[i])
    }
})()