import React from 'react'
import { renderToString } from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Helmet } from 'react-helmet'
import flushChunks from 'webpack-flush-chunks'
import serialize from 'serialize-javascript'

import Routes from 'Src/pages/Routes'
import configureStore from 'Src/configureStore'

export default ({ clientStats }) => (req, res) => {
  const store = configureStore()
  const initialState = store.getState()
  const context = {}
  const app = renderToString(
    <Provider store={ store }>
      <StaticRouter location={ req.path } context={ context }>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  )
  const chunkNames = flushChunkNames()
  const helmet = Helmet.renderStatic()

  const {
    js,
    styles,
    cssHash,
    scripts,
    stylesheets
  } = flushChunks(clientStats, { chunkNames })

  console.log('PATH', req.path)
  console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
  console.log('SCRIPTS SERVED', scripts)
  console.log('STYLESHEETS SERVED', stylesheets)

  if(context.url) {
    return res.send(301, context.url)
  }
  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${styles}
          <meta name="theme-color" content="#000000">
        </head>
        <body>
          <script>
            window.__INITIAL_STATE__ = ${initialState}
          </script>
          <div id="root">${app}</div>
          ${cssHash}
          ${js}
        </body>
      </html>`
  )
}