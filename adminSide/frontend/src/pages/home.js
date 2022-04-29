import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faDesktop } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import Navbar from "../component/navbar";
import "./style/home.css"

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            adminName: "",
            adminCount: 0,
            customerCount: 0,
            productCount: 0,
            transaksi:[],
            transaksiCount: 0
        }
        if(localStorage.getItem('token')){
            this.state.token = localStorage.getItem('token')
        }
        else{
            window.location = "/login"
        }
    }
    headerConfig = () =>{
        let header = {
            headers: {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }

    getAdmin = () => {
        let admin = localStorage.getItem('name')
        let url = "http://localhost:8080/admin"
        axios.get(url, this.headerConfig())
        .then(res => {
            this .setState({
                adminName: admin,
                adminCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
        console.log(this.state.adminCount)
    }
    getCustomer = () => {
        let url = "http://localhost:8080/customer"
        axios.get(url, this.headerConfig())
        .then(res => {
            this .setState({
                customerCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
        console.log(this.state.customerCount)
    }
    getProduct = () => {
        let url = "http://localhost:8080/product"
        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                productCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
        console.log(this.state.productCount)
    }
    getTransaksi = () => {
        let url = "http://localhost:8080/transaksi"
        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                transaksiCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })

    }

    componentDidMount = () => {
        this.getAdmin()
        this.getCustomer()
        this.getProduct()
        this.getTransaksi()
    }
    render(){
        return(
            <div className="home">
                <Navbar/>
                <div className="container my-4">
                    <div className="greeting">
                        <h1>Hi, {this.state.adminName}</h1>
                        <p>Welcome to your dashboard</p>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <div className="mini-stat mini-stat-admin">
                                <div className="icon">
                                    <FontAwesomeIcon className="icon-stat" icon={faUsers} size="2x"/>
                                </div>
                                <div className="text">
                                    <h3 className="mt-2">Total Customer</h3>
                                    <h4>{this.state.customerCount}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="mini-stat mini-stat-customer">
                                <div className="icon">
                                    <FontAwesomeIcon className="icon-stat" icon={faUserTie} size="2x"/>
                                </div>
                                <div className="text">
                                    <h3 className="mt-2">Total Admin</h3>
                                    <h4>{this.state.adminCount}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="mini-stat mini-stat-product">
                                <div className="icon">
                                    <FontAwesomeIcon className="icon-stat" icon={faDesktop} size="2x"/>
                                </div>
                                <div className="text">
                                    <h3 className="mt-2">total Product</h3>
                                    <h4>{this.state.productCount}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="mini-stat mini-stat-order">
                                    <div className="icon">
                                        <FontAwesomeIcon className="icon-stat" icon={faShoppingCart} size="2x"/>
                                    </div>
                                <div className="text">
                                    <h3 className="mt-2">Total Order</h3>
                                    <h4>{this.state.transaksiCount}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}