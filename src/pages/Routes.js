import React from 'react'
import universal from 'react-universal-component'

const UniversalComponent = (path) => (
  universal(path, {
    onLoad(module, info, props, context) {
      if (module.reducers) {
        context.store.injectReducers(module.reducers)
      }
    }
  })
)

export default [
  {
    component: UniversalComponent(import('Pages/App')),
    routes: [
      {
        component: UniversalComponent(import('Pages/Home')),
        path: '/',
        exact: true
      },
      {
        component: UniversalComponent(import('Pages/Works')),
        path: '/portfolio',
        exact: true
      },
      {
        component: UniversalComponent(import('Pages/About')),
        path: '/about',
        exact: true
      },
      {
        component: UniversalComponent(import('Components/articleComponents/ArticleModal')),
        path: '/blog/article/:slug',
        exact: true
      },
      {
        component: UniversalComponent(import('Pages/Articles')),
        path: '/blog/:page',
        exact: true
      },
    ]
  }
]