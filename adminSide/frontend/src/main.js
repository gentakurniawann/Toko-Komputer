import React from "react"
import Login from "./pages/login"
import Customer from "./pages/customer"
import Home from "./pages/home"
import Product from "./pages/product"
import Admin from "./pages/admin"
import Transaksi from "./pages/transaksi"
import { Route,Switch } from "react-router-dom"

export default class Main extends React.Component{
    render(){
        return(
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/Login' component={Login}/>
                <Route exact path='/customer' component={Customer}/>
                <Route exact path='/product' component={Product}/>
                <Route exact path='/admin' component={Admin}/>
                <Route exact path='/transaksi' component={Transaksi}/>
            </Switch>
        )
    }
}