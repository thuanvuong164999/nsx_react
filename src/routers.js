import React from 'react'
import {Switch, Route} from 'react-router-dom'
import HomePage from './pages/Home/Home'
import ProductsPage from './pages/Products/Products'
import FarmsPage from './pages/farms/farms'
import DetailPage from './pages/Products/detail/detail'

const MainRouter = () => (
    <main>
        <Switch>
            //tao api
            <Route exact path='/' component={HomePage}></Route>
            <Route path='/Products' component={ProductsPage}></Route>
            <Route path='/Farms' component={FarmsPage}></Route>
            <Route path='/product/:id' component={DetailPage}></Route>
        </Switch>
    </main>
)

export default MainRouter