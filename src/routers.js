import React from 'react'
import {Switch, Route} from 'react-router-dom'
import HomePage from './pages/Home/Home'
import ProductsPage from './pages/Products/Products'

const MainRouter = () => (
    <main>
        <Switch>
            <Route exact path='/' component={HomePage}></Route>
            <Route path='/Products' component={ProductsPage}></Route>
        </Switch>
    </main>
)

export default MainRouter