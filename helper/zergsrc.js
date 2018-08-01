const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')
const {promisify} = require('util').promisify
const writeFile = promisify(fs.writeFile)

module.exports = (src) => {
    console.log(src)
}
// url => img
const urlToImg = promisify( (url, dir, callback)=>{
    const ext = path.basename(url)
    const file = path.join(dir, `${Date.now()}${ext}`)
    const mod = /^https:/.test(url)?https:http
    mod.get(url, res=>{
        res.pipe(fs.createWriteStream(file))
            .on('finish', () => {
                callback()
            })
    })
})
// base64 => img
const baseToImg = async (baseUrl, dir) => {
    const matches = baseUrl.match(/^data:(.+?);base64,(.+)$/)
    try {
        const ext = matches[1].split('/')[1].replace('jpeg', 'jpg')
        const file = path.join(dir, `${Date.now()}.${ext}`)
        await writeFile(file, content, 'base64')
    }catch (e) {
        console.log('不合法')
    }

}