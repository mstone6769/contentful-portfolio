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
    space_id: 'sx4b7m2fosu5',
    access_token: '65a7a0532ea85cafc91b69f0a79b28dd31af5cabfe11a4f93ea1284a8e5760c7'
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
