const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// Mock data for oEmbed response
const oembedData = {
  version: '1.0',
  type: 'rich',
  width: 640,
  height: 360,
  title: 'test',
  author_name: 'John Doe',
  author_url: 'http://example.com/johndoe',
  provider_name: 'wb Provider',
  provider_url: 'http://zoom.us',
  html: '&lt;iframe width="640" height="360" src="https://applications.zoom.us/integration/phone/embeddablephone/home" frameborder="0" allowfullscreen&gt;&lt;/iframe &gt;'
};

// oEmbed route
router.get('/oembed', ctx => {
  ctx.type = 'application/xml';
  ctx.body = `
    <oembed>
      <version>${oembedData.version}</version>
      <type>${oembedData.type}</type>
      <width>${oembedData.width}</width>
      <height>${oembedData.height}</height>
      <title>${oembedData.title}</title>
      <author_name>${oembedData.author_name}</author_name>
      <author_url>${oembedData.author_url}</author_url>
      <provider_name>${oembedData.provider_name}</provider_name>
      <provider_url>${oembedData.provider_url}</provider_url>
      <html>${oembedData.html}</html>
    </oembed>
  `;
});

// Apply router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Start server
const port = process.env.PORT || 3013;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
