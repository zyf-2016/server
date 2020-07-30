const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = {
    name: 'foo'
  }
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
