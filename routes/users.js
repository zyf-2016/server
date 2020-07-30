const router = require('koa-router')()
const User= require('../dbs/models/user')

router.prefix('/users')

router.get('/login', function (ctx, next) {
  // ctx.body = 'this is a users response!'
  console.log(ctx.request)
  ctx.body = 'ok !'
})

router.post('/register', async (ctx, next) => {
  const user  = new User({
    username: ctx.request.body.username,
    password: ctx.request.body.password
  })
  let code
  try {
    await user.save()
    code = 0
  } catch(err) {
    code = 1
  }
  ctx.body = {
    code,
    username: ctx.request.body.username
  }
})

module.exports = router
