import React from "react";
import "./customerList.css"
export default class CustomerList extends React.Component{
    render(){
        return(
            <div className="col-lg-6 col-sm-12">
                <div className="card">
                    <div className="card-body row">
                        <div className="col-sm-2">
                            <img alt={this.props.nameimage} src={this.props.image} className='img rounded-circle' width="89px" height="89px" />
                        </div>
                    <div className="col-sm-6">
                        <p className="text-bold">ID: {this.props.customer_id} </p>
                        <p className="text-bold">Name: {this.props.name} </p>
                        <p className="text">phone: {this.props.phone} </p>
                        <p className="text">address: {this.props.address} </p>
                    </div>
                    <div className="col-sm-4">
                        <button className="btn btn-edit" onClick={this.props.onEdit}>Edit</button>
                        <button className="btn btn-delete" onClick={this.props.onDrop}>Delete</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}