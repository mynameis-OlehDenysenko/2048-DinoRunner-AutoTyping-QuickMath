const { chromium } = require('playwright-chromium');

(async () => {
    const browser = await chromium.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto('https://play2048.co/')
    do {
        let score = []
        score[0] = await page.innerText('.score-container')
        await page.keyboard.press('ArrowUp')
        await page.keyboard.press('ArrowLeft')
        score[1] = await page.innerText('.score-container')
            if (score[0] === score[1]) {
                await page.keyboard.press('ArrowRight')
            }
        if (await page.$('.game-over') !== null) {
            await page.click('.retry-button')
        }
    } while(true)
})()