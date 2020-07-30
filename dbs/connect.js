const mongoose = require('mongoose')

const db = require('./config').dbs

const reConnect = (maxConnectTimes) => {
    maxConnectTimes++
    if(maxConnectTimes < 5) {
        mongoose.connect(db, {useNewUrlParser:true,useUnifiedTopology: true})
    } else {
        throw new Error('数据库连接失败')
    }
}

module.exports = {
    connect: () => {
        let maxConnectTimes = 0
        return new Promise((resolve, reject) => {
            if(process.env.NODE_ENV === 'development') {
                mongoose.set('debug', true)
            }
            mongoose.connect(db, {useNewUrlParser:true,useUnifiedTopology: true})
            
            mongoose.connection.on('disconnected', () => {
                reConnect(maxConnectTimes)
            })
            
            mongoose.connection.on('error', err => {
                console.log(err)
                reConnect(maxConnectTimes)
            })
            mongoose.connection.once('open', () => {
                resolve()
                console.log('MongoDB Connected successfully')
            })
        })
    }
}