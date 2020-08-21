const { chromium } = require('playwright-chromium');

(async () => {
    const browser = await chromium.launch({ headless: false })
    const page = await browser.newPage()

    await page.goto('https://arithmetic.zetamac.com/game?key=a7220a92')
    do {
        const problem = await page.innerText('.problem')
        let firstArgument = problem.match(/^\d+/gm)
        let sign = String(problem.match(/[×÷–+]/gm))
        let secondArgument = problem.match(/\d+$/gm)
        let answer = 0
        switch (sign) {
            case '+':
                answer = Number(firstArgument) + Number(secondArgument)
                break
            case '–':
                answer = Number(firstArgument) - Number(secondArgument)
                break
            case '×':
                answer = Number(firstArgument) * Number(secondArgument)
                break
            case '÷':
                answer = Number(firstArgument) / Number(secondArgument)
                break
            default:
                console.log('sth is wrong')
        }
        await page.fill('.answer', String(answer))
        await page.keyboard.press('Enter')
    }   
    while (await page.innerText('.left') !== 'Seconds left: 0')
})()