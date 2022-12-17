import React from "react";
import axios from "axios";
import Media from "../component/media";
import "./style/login.css"
export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username : "",
            password : ""
        }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleLogin = (e) => {
        e.preventDefault()
        let data = {
            username: this.state.username,
            password: this.state.password
        }
        let url = "http://localhost:8080/customer/auth"
        axios.post(url, data,)
        .then(res => {
            if(res.data.logged){
                let name = res.data.data.name
                let customer = res.data.data
                let token = res.data.token
                localStorage.setItem("name", name)
                localStorage.setItem("customer", JSON.stringify(customer))
                localStorage.setItem("token", token)
                window.location = "/"
            }
            else{
                window.alert(res.data.message)
            }
        })
    }
    render(){
        return(
            <div className="login">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-7">
                            <Media value image="login-1-01.png" width="90%" height="90%"/>
                        </div>
                        <div className="col-5">
                            <div className="form-login">
                                <h1>Login</h1>
                                <form onSubmit={e => this.handleLogin(e)}>
                                    <div className="username">
                                        <label for="username" className="form-label">Username</label>
                                        <input type="text" className="form-control" name="username" placeholder="Masukkan Username" onChange={this.handleChange} value={this.state.username}/>
                                    </div>
                                    <div className="password">
                                        <label for="password" className="form-label">Password :</label>
                                        <input type="password" name="password" className="form-control" placeholder="*****" onChange={this.handleChange} value={this.state.password} />
                                    </div>
                                    <button type="submit" className="btn btn-login">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}