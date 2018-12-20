import { combineReducers } from 'redux'
import about from 'Ducks/about'
import skills from 'Ducks/skills'
import works from 'Ducks/works'
import articles from 'Ducks/articles'

export default (asyncReducers) => combineReducers({
  about, skills, works, articles,
  ...asyncReducers
})
