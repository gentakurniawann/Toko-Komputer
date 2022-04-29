import React from "react";
import axios from "axios";
import CustomerList from "../component/customerList";
import Navbar from "../component/navbar";
import { Modal, Button,Form } from "react-bootstrap"
import "./style/customer.css"

export default class Customer extends React.Component{
    constructor(){
        super()
        this.state = {
            customers: [],
            name: "",
            phone: "",
            address: "",
            image: null,
            username: "",
            password: "",
            token: "",
            customerCount: "",
            customer_id: "",
            isModalOpen: false,
            action: ""

        }
        if(localStorage.getItem('token')){
            this.state.token = localStorage.getItem('token')
        }
        else{
            window.location = "/login"
        }
    }
    headerConfig = () => {
        let header = {
            headers: {Authorization: `Bearer ${this.state.token}`}        
        }
        return header
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
    handleFile = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }
    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            name: "",
            phone: "",
            address: "",
            image: null,
            username: "",
            password: "",
            action: "insert"
        })
    }
    handleEdit = (selectedItem) => {
        this.setState({
            isModalOpen: true,
            customer_id: selectedItem.customer_id,
            name: selectedItem.name,
            phone: selectedItem.phone,
            address: selectedItem.address,
            image: null,
            username: selectedItem.username,
            password: "",
            action: "update"
        })
    }
    handleDelete = (customer_id) => {
        let url = "http://localhost:8080/customer/" + customer_id

        if(window.confirm("Apakah anda yakin ?")){
            axios.delete(url, this.headerConfig())
            .then(res => {
                console.log(res.message)
                this.getCustomers()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }
    handleSave = (e) => {
        e.preventDefault()
        let form = new FormData()
        form.append("name", this.state.name)
        form.append("phone", this.state.phone)
        form.append("address", this.state.address)
        form.append("image", this.state.image)
        form.append("username", this.state.username)
        form.append("password", this.state.password)

        let url = ""

        if(this.state.action === "insert"){
            url = "http://localhost:8080/customer"

            // panggil api backend
            axios.post(url, form, this.headerConfig())
            .then(res => {
                this.getCustomers()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }else if(this.state.action === "update"){
            url = "http://localhost:8080/customer/" + this.state.customer_id
            axios.put(url, form, this.headerConfig())
            .then(res => {
                this.getCustomers()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }

    getCustomers = () => {
        let url = "http://localhost:8080/customer"
        axios.get(url, this.headerConfig())
        .then(res => {
            this .setState({
                customers: res.data.customer
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    componentDidMount = () => {
        this.getCustomers()
    }
    render(){
        return(
            <div className="customer">
                <Navbar/>
                <div className="container">
                    <div className="title-page d-flex justify-content-between align-items-center">
                        <div>
                            <h1>Data Customer</h1>
                        </div>
                        <button className="btn btn-add" onClick={()=>this.handleAdd()}>Add Customer</button>
                    </div>
                    <div className="row">
                        {this.state.customers.map((item,index) => {
                            return(
                                <CustomerList key={index}
                                    nameImage={item.image}
                                    image={"http://localhost:8080/image/customer/" + item.image}
                                    customer_id={item.customer_id}
                                    name={item.name}
                                    phone={item.phone}
                                    address={item.address}
                                    onEdit={() => this.handleEdit(item)}
                                    onDrop={() => this.handleDelete(item.customer_id)}
                                />
                            )
                        })}
                    </div>            
                </div>
                {/* Modal */}
                <Modal classname="modal" show={this.state.isModalOpen} onHide={this.handleClose}>
                <Modal.Header classname="modal-header" closeButton>
                    <Modal.Title>Input Customer Data</Modal.Title>
                </Modal.Header>
                <Form onSubmit={e => this.handleSave(e)}>
                <Modal.Body className="modal-body">
                <Form.Group className="mb-3" controlId="nip">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Insert Your Name" value={this.state.name} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" placeholder="Insert your phone number" value={this.state.phone} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" placeholder="Insert Your Address" value={this.state.address} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="Image" placeholder="Insert Image" value={this.state.Image} onChange={this.handleFile}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Insert Your UserName" value={this.state.username} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Insert Your Password" value={this.state.password} onChange={this.handleChange}/>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer classname="modal-footer">
                    <button className="btn btn-md btn-closes" onClick={this.handleClose}>Close</button>
                    <button className="btn btn-md btn-submit" type="submit">save</button>
                </Modal.Footer>
                </Form>
                </Modal>
            </div>
        )
    }
}