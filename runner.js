const { chromium } = require('playwright-chromium');

(async () => {
    const browser = await chromium.launch({ headless: false })
    const page = await browser.newPage({ offline: true })
    await page.goto('https://goiteens.ua/').catch(e=> {})
    await page.waitForSelector('.runner-canvas')

    page.exposeFunction('playwrightJump', () =>{
        page.keyboard.press('Space')
    })

    page.evaluate(() => {
        function maybeJump() {
            const obstacles = Runner.instance_.horizon.obstacles
            if (obstacles.length && obstacles[0].xPos < 100){
                playwrightJump()
            }
            requestAnimationFrame(maybeJump)
        }
        maybeJump()
    })
    await page.keyboard.press('Space')
})()