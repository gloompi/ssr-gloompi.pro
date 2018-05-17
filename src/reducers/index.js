import { combineReducers } from 'redux'
import auth from '../ducks/auth'

export default (asyncReducers) => combineReducers({
  auth,
  ...asyncReducers
})
