const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/users', createProxyMiddleware({
  target: 'http://user-service:3001',
  changeOrigin: true
}));

app.use('/products', createProxyMiddleware({
  target: 'http://product-service:3002',
  changeOrigin: true
}));

app.listen(3000, () => {
  console.log('API Gateway running on port 3000');
});