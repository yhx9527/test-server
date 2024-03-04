const express = require('express');
const app = express();

// Middleware to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  html: '&lt;iframe width="640" height="360" src="https://applications.zoom.us/integration/phone/embeddablephone/home" frameborder="0" allowfullscreen&gt;&lt;/iframe&gt;'
};

// oEmbed endpoint
app.get('/oembed', (req, res) => {
    const { url } = req.query;
    const xmlResponse = `
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
      <url>${url}</url>
    </oembed>
  `;

    // Set content type as XML
    res.set('Content-Type', 'text/xml');
    // Send the XML response
    res.send(xmlResponse);
});

// Start the server
const PORT = process.env.PORT || 3013;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

