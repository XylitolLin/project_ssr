var webpackHotMiddleware = require('webpack-hot-middleware');

function middleware(doIt, req, res) {
    const { end: originalEnd } = res;
  
    return new Promise((resolve) => {
      res.end = function end() {
        originalEnd.apply(this, arguments);
        resolve(0);
      };
      doIt(req, res, () => {
        resolve(1);
      })
    });
  }

module.exports = function(compiler, option) {
    var action = webpackHotMiddleware(compiler, option);
    return async function (ctx, next) {
        var nextStep = await middleware(action, ctx.req,  ctx.res);
        if (nextStep && next) {
            await next();
        }
    };
};