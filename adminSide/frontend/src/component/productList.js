import React from "react";

export default class ProductList extends React.Component{
    render(){
        return(
            <div classname="productList">
                <div className="album">         
                        <div classname="">
                            <div className="col">
                                <div className="card shadow-sm">
                                    <img alt={this.props.name} src={this.props.image}
                                    width="100%" height="100%"/>
                                    <div className="card-body">
                                        <p className="card-text">{this.props.name}</p>
                                        <p classname="card-text">{this.props.price}</p>
                                        <p classname="card-text">{this.props.stock}</p>
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-edit" onClick={this.props.onEdit}>Edit</button>
                                            <button className="btn btn-delete" onClick={this.props.onDrop}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            
        )
    }
}