import React from "react";
import Login from "./pages/login";
import { Route, Switch } from "react-router-dom";
export default class Main extends React.Component{
    render(){
        return(
            <Switch>
                <Route exact path='/Login' component={Login}/>
            </Switch>
        )
    }
}