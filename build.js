const Metalsmith = require('metalsmith')

const layouts = require('metalsmith-layouts')
const assets = require('metalsmith-assets')
const sass = require('metalsmith-sass')
const markdown = require('metalsmith-markdown')
const dataMarkdown = require('metalsmith-data-markdown')
const contentful = require('contentful-metalsmith')

const handlebars = require('handlebars')


Metalsmith(__dirname)
  .source('src/pages')
  .destination('dist')
  .use(contentful({
    space_id: process.env.SPACE_ID,
    access_token: process.env.ACCESS_TOKEN
  }))
  .use(layouts({
    engine: 'handlebars',
    partials: 'src/partials',
    directory: 'src/layouts'
  }))
  .use(sass({
    outputStyle: 'compressed'
  }))
  .use(markdown())
  .use(dataMarkdown({
    removeAttributeAfterwards: true
  }))
  .build((err) => {
    if (err) throw err
    console.log('Successfully build metalsmith')
  })
