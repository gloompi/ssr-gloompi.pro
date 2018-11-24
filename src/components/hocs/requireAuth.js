import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {jwtSecretName} from 'Root/configClient'
import Loader from 'Components/Loader'

export default (ChildComponent) => {
  class RequireAuth extends Component {
    state = {
      token: null
    }

    componentDidMount() {
      const token = localStorage.getItem(jwtSecretName)
      if(!token) return this.props.history.push('/sign-in')
      else if(token) return this.setState({token})
    }

    componentWillReceiveProps(nextProps) {
      const token = localStorage.getItem(jwtSecretName)
      if(token) return this.setState({token})
      else if(!token) return this.props.history.push('/sign-in')
    }

    render() {
      const {token} = this.state
      switch(token) {
        case null:
          return <Loader />
        default:
          return <ChildComponent {...this.props} {...this.state} />
      }
    }
  }

  return RequireAuth
}