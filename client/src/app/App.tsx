import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import * as pages from '../pages'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={pages.Home} />
        <Route path="/login" exact component={pages.Login} />
        <Route path="/register" exact component={pages.Register} />
        <Route component={pages.NotFound} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
