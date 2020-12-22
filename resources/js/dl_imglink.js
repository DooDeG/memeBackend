const puppeteer = require('puppeteer')
const fs = require('fs')

const url = 'https://s.weibo.com/'
const imgKeyword = '表情包'

function wait(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}

var createFolder = (description) => {
    fs.writeFile(__dirname + `/imgLink.json` , description, function() {})
}


;(async () => {
    
    const browser = await puppeteer.launch({
        headless: false,
        
    })
    const page = await browser.newPage()
    await page.goto(url, {
        waitUntil: 'domcontentloaded',
    })
    console.log('正在抓虫中...')
    await page.click('a[title="图片"]')
    await page.focus('input')
    await page.keyboard.sendCharacter(imgKeyword)
    await page.click('.s-btn-b')

    await page.waitForSelector('img')

    const bodyHandle = await page.$('body')
    const { height } = await bodyHandle.boundingBox()
    await bodyHandle.dispose()

    const viewportHeight = page.viewport().height
    let viewportIncr = 0
    while (viewportIncr + viewportHeight < height) {
        await page.evaluate(_viewportHeight => {
            window.scrollBy(0, _viewportHeight)
        }, viewportHeight)
        await wait(20)
        viewportIncr = viewportIncr + viewportHeight
    }


    await page.evaluate(_ => {
        window.scrollTo(0, 0)
    })

    await wait(2000)


    let imageLink = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'))
        return images.map(img => img.src)
        .filter(img => img.includes('wx')
        )
        // .filter(img => img.includes('https:'))
        
    })
    
    let arr = []
    arr.push({"keyword": imgKeyword})
    for (var i=1; i<imageLink.length; i++){
        arr.push({"imgName": imgKeyword+i, "imageLink": imageLink[i]})
    }
    let text = JSON.stringify(arr)
    console.log(arr)
    createFolder(text)

    await browser.close()
})()

// process.on('unhandledRejection', error => {
//     console.log('unhandledRejection', error.message)
//   })
//   new Promise((_, reject) => reject(new Error('woops')))
//   .catch(error => { console.log('caught', err.message)
// })