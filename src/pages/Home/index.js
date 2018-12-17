import React from 'react'
import { ExpanseUp } from 'animate-components'

import Header from 'Components/Header'

const Home = () => (
  <ExpanseUp
    duration='1s'
    component={() => <Header homePage />}
  />
)

export default Home