const sqlite = require('../sqlite/index')
const fs = require('fs');
const _ = require("underscore")
const fsextra = require('fs-extra')
const xxtebook = './src/content/xxtebook.db'
const SQLResult = './src/content/SQLResult.js'
const watch = require('gulp-watch');


const monitor = () => {
    watch(xxtebook, () => {
        console.log('【xxtebook.db is change!】')
        sqlite.resolve(() => {
            console.log('【new xxtebook.db is complete!】')
        })
    })
}


const get = function(path, files) {
    if (!files.length) {
        console.log('数据解析完毕')
        return
    }
    let file = files.shift()
    let url = path + file
    let stat = fs.lstatSync(url)
    if (stat.isDirectory()) {
        if (!fs.existsSync(url + '/SQLResult.js')) {
            console.log('【SQLResult.js not available!】')
            sqlite.resolve(url, url + '/xxtebook.db', function() {
                get(path, files)
            })
        } else {
            get(path, files)
        }
    } else {
        get(path, files)
    }
}



module.exports = (conf, spinner) => {
    let path = conf.srcDir + 'content/'
    let files = fs.readdirSync(path)
    get(path, files)
}
