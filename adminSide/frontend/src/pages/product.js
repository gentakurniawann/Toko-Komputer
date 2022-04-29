import React from "react";
import axios from "axios";
import Navbar from "../component/navbar";
import ProductList from "../component/productList";
import { Modal, Button,Form } from "react-bootstrap"
import "./style/product.css"

export default class Product extends React.Component{
    constructor(){
        super()
        this.state = {
            product: [],
            token: "",
            action: "",
            name: "",
            price: 0,
            stock: 0,
            image: null,
            isModalOpen: false,
            product_id: ""
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
    handleFile = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }
    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            name: "",
            price: "",
            stock: "",
            image: null,
            action: "insert"
        })
    }
    handleEdit = (selectedItem) => {
        this.setState({
            isModalOpen: true,
            product_id: selectedItem.product_id,
            name: selectedItem.name,
            price: selectedItem.price,
            stock: selectedItem.stock,
            image: null,
            action: "update"
        })
    }
    handleDelete = (product_id) => {
        let url = "http://localhost:8080/product/" + product_id

        if(window.confirm("Apakah anda yakin ?")){
            axios.delete(url, this.headerConfig())
            .then(res => {
                console.log(res.message)
                this.getProduct()
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
        form.append("price", this.state.price)
        form.append("stock", this.state.stock)
        form.append("image", this.state.image)

        let url = ""

        if(this.state.action === "insert"){
            url = "http://localhost:8080/product"

            // panggil api backend
            axios.post(url, form, this.headerConfig())
            .then(res => {
                this.getProduct()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }else if(this.state.action === "update"){
            url = "http://localhost:8080/product/" + this.state.product_id
            axios.put(url, form, this.headerConfig())
            .then(res => {
                this.getProduct()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }

    getProduct = () => {
        let url = "http://localhost:8080/product/"
        axios.get(url, this.headerConfig())
        .then(res=> {
            this.setState({
                product: res.data.product
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    componentDidMount = () => {
        this.getProduct()
    }

    render(){
        return(
            <div className="product">
                <Navbar/>
                <div className="container">
                    <div className="title-page d-flex justify-content-between align-items-center">
                        <div>
                            <h1>Data Product</h1>
                        </div>
                        <button className="btn btn-add" onClick={()=>this.handleAdd()}>Add Product</button>
                    </div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-md-4 g-3">
                    {this.state.product.map( (item,index) => (
                        <ProductList
                        key = {index}
                        name = {item.name}
                        price = {item.price}
                        stock = {item.stock}
                        nameImage={item.image}
                        image = {"http://localhost:8080/image/product/" + item.image}
                        onEdit= {() => this.handleEdit(item)}
                        onDrop= {() => this.handleDelete(item.product_id)}
                        />
                    ))}
                    </div>
                    {console.log(this.state.product)}
                </div>
                {/* Modal */}
                <Modal className="modal" show={this.state.isModalOpen} onHide={this.handleClose}>
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>Input Product Data</Modal.Title>
                </Modal.Header>
                <Form onSubmit={e => this.handleSave(e)}>
                <Modal.Body className="modal-body">
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Insert Product Name" value={this.state.name} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" name="price" placeholder="Insert Product Price" value={this.state.price} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="stock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="text" name="stock" placeholder="Insert Your Address" value={this.state.stock} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="Image" placeholder="Insert Image" value={this.state.Image} onChange={this.handleFile}/>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                <button className="btn btn-md btn-closes" onClick={this.handleClose}>Close</button>
                    <button className="btn btn-md btn-submit" type="submit">save</button>
                </Modal.Footer>
                </Form>
                </Modal>
            </div>
        )
    }
}