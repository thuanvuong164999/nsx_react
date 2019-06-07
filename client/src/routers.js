import React from 'react'
import {Switch, Route} from 'react-router-dom'
import HomePage from './pages/Home/Home'
import ProductsPage from './pages/Products/Products'
import FarmsPage from './pages/farms/farms'
import DetailPage from './pages/Products/detail/detail'
import Auth from './components/auth-component/auth-component'
import LoginPage from './pages/login/login'

const MainRouter = () => (
    <main>
        <Switch>
        <Route exact path='/' render={
            () => (
                <Auth orRedirectTo='/login' orRender={
                    <HomePage></HomePage>
                }></Auth>
            )
        }></Route>
            //tao api
            <Route exact path='/' component={HomePage}></Route>
            <Route path='/Products' component={ProductsPage}></Route>
            <Route path='/Farms' component={FarmsPage}></Route>
            <Route path='/product/:id' component={DetailPage}></Route>
            <Route path='/login' component={LoginPage}></Route>
        </Switch>
    </main>
)

export default MainRouter