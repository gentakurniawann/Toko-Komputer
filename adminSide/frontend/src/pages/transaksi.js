import React from 'react';
import $ from 'jquery';
import Navbar from '../component/navbar';
// import '../pages/style/'
import axios from 'axios';
import TransactionList from '../component/transactionList';
import "./style/transaction.css"

export default class Transaksi extends React.Component{
    constructor(){
        super()
        this.state={
            token: "",
            transaksi: [],
            selectedItem: null
        }
        if(localStorage.getItem('token')){
            this.state.token = localStorage.getItem('token')
        }
        else{
            window.location = '/login'
        }
    }
    headerConfig=() =>{
        let header = {
            headers: {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }
    getTransaksi = () => {
        let url = "http://localhost:8080/transaksi"
        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                transaksi: res.data.transaksi
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    componentDidMount = () => {
        this.getTransaksi()
    }

    render(){
        return(
            <div className='transaction'>
                <Navbar/>
                <div className='container'>
                    <h1>Transactions List</h1>
                    {this.state.transaksi.map(item => (
                        <TransactionList
                            key = {item.transaksi_id}
                            transaksi_id= {item.transaksi_id}
                            customer_name= {item.customer.name}
                            customer_address = {item.customer.address}
                            time = {item.waktu}
                            products = {item.detail_transaksi}
                        />
                    ))}
                </div>
            </div>
        )
    }
}