(async () => {
    const puppeteer = require('puppeteer')
    const bot = require('textnow-bot')
    const fs = require('fs').promises
  
    let browser = null
    let page = null


  for (let i = 0; i < 10; i++)  {
  
  

    try {
      browser = await puppeteer.launch({ headless: true })
      page = await browser.newPage()
  
      const client = await page.target().createCDPSession()
      let cookies = null
  
      // Provide existing saved cookies from file
      try {
        const cookiesJSON = await fs.readFile('./cookies.json')
        cookies = JSON.parse(cookiesJSON)
  
        // Log in and get updated cookies
        await page.setCookie(...cookies)
        cookies = await bot.login(page, client)
      }
      catch (error) {qaQ    
        console.info('Unable to log in using existing cookies...')
  
        // Provide account credentials for fallback login
        const username = 'we09r09i09we'
        const password = 'fvkjenvkjnkjwedfmlkam'
  
        cookies = await bot.login(page, client, username, password)
      }
  
      // Save cookies to local file
      await fs.writeFile('./cookies.json', JSON.stringify(cookies))
  
      // Select a conversation
      const recipient = '(678) 794-1361'
      await bot.selectConversation(page, recipient)
  
      // Send message in conversation
      const message = 'big pp man'
      const delay = 100
      await bot.sendMessage(page, message, delay)
    }
    catch (error) {
      console.error(error)
  
      if (page !== null) {
        await page.screenshot({ path: './error-main.jpg', type: 'jpeg' })
      }
  
      process.exit(1)
    }
    finally {
      if (browser !== null) {
        await browser.close()
      }
    }
  }
  })()