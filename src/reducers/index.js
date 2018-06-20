import { combineReducers } from 'redux'
import about from '../ducks/about'
import skills from '../ducks/skills'

export default (asyncReducers) => combineReducers({
  about, skills,
  ...asyncReducers
})
