import { combineReducers } from 'redux'
import about from 'Ducks/about'
import skills from 'Ducks/skills'
import works from 'Ducks/works'

export default (asyncReducers) => combineReducers({
  about, skills, works,
  ...asyncReducers
})
