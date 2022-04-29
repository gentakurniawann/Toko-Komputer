import React from "react";
import axios from "axios";
import Navbar from "../component/navbar";
import { Modal, Form } from "react-bootstrap";
import "./style/admin.css"

export default class Admin extends React.Component{
    constructor(){
        super()
        this.state = {
            admin: [],
            name: "",
            username: "",
            password: "",
            token: "",
            admin_id: "",
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
            headers: { Authorization: `Bearer ${this.state.token}`}
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

    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            name: "",
            username: "",
            password: "",
            action: "insert"
        })
    }

    handleEdit = (selectedItem) => {
        this.setState({
            isModalOpen: true,
            admin_id: selectedItem.admin_id,
            name: selectedItem.name,
            username: selectedItem.username,
            password: "",
            action: "update"
        })
    }

    handleDelete = (admin_id) => {
        let url = "http://localhost:8080/admin/" + admin_id

        if(window.confirm("Apakah anda yakin ?")){
            axios.delete(url, this.headerConfig())
            .then(res => {
                console.log(res.message)
                this.getAdmin()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }

    handleSave = (e) => {
        e.preventDefault()
        let data = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password
        }
        let url = ""

        if(this.state.action === "insert"){
            url = "http://localhost:8080/admin"

            // panggil api backend
            axios.post(url, data, this.headerConfig())
            .then(res => {
                this.getAdmin()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }else if(this.state.action === "update"){
            url = "http://localhost:8080/admin/" + this.state.admin_id
            axios.put(url, data, this.headerConfig())
            .then(res => {
                this.getAdmin()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }

    getAdmin = () => {
        let url = "http://localhost:8080/admin"
        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                admin: res.data.admin
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    componentDidMount = () => {
        this.getAdmin()
    }
    render(){
        return(
            <div className="admin">
                <Navbar/>
                <div className="container">
                    <div className="">
                        <div className="title-page d-flex justify-content-between align-items-center">
                            <div>
                                <h1>Data Admin</h1>
                            </div>
                            <button className="btn btn-add" onClick={()=>this.handleAdd()}>Add Admin</button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <table className="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.admin.map((item,index) => (
                                        <tr key={index}>
                                            <td>{item.admin_id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.username}</td>
                                            <td>
                                                <button className="btn btn-edit" onClick={() => this.handleEdit(item)}>Edit</button>
                                                <button className="btn btn-delete" onClick={() => this.handleDelete(item.admin_id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Modal */}
                <Modal classname="modal" show={this.state.isModalOpen} onHide={this.handleClose}>
                <Modal.Header classname="modal-header" closeButton>
                    <Modal.Title>Input Admin Data</Modal.Title>
                </Modal.Header>
                <Form onSubmit={e => this.handleSave(e)}>
                <Modal.Body className="modal-body">
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Insert Your Name" value={this.state.name} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Insert Your UserName" value={this.state.username} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Insert Your Password" onChange={this.handleChange}/>
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