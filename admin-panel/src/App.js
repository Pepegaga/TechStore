import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './screens/Home'
import Orders from './screens/Orders'
import Products from './screens/Products'
import Comments from './screens/Comments'
import Edit from './screens/EditScreen'
import Add from './screens/AddScreen'
import Users from './screens/Users'
import SignIn from './screens/SignIn'

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/products" component={Products} />
                    <Route path="/comments" component={Comments} />
                    <Route path="/edit" component={Edit} />
                    <Route path="/add" component={Add} />
                    <Route path="/users" component={Users} />
                    <Route path="/signin" component={SignIn} />
                </Switch>
            </Router>
        </>
    )
}

export default App
