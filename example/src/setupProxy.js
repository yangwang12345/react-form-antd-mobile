const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/open-api/upload_static_file',
    createProxyMiddleware({
      target: 'http://api.knxgalaxy.com',
      changeOrigin: true,
      onProxyReq(proxyReq) {
        proxyReq.setHeader('hostname', 'static');
        proxyReq.setHeader('apiKey', '9lqcKUairGYvJC27tQzAVeTHxMfhrhy0');
      }
    })
  );
  app.use(
    '/upload_assets',
    createProxyMiddleware({
      target: 'http://static.knxgalaxy.com',
      changeOrigin: true
    })
  );
  app.use('/convert/toImage',createProxyMiddleware({
    target: 'http://10.55.10.45:7002'
  }));
};
