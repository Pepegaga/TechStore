import React, { useState } from 'react'
import './Card.css'

export default ({ item }) => {
    return (
        <div className="orderCard">
            <div className="img">
                <img src={item.img} />
            </div>
            <div className="description">
                <p className="title-text">{item.product_title}</p>
                <p className="description-text">{item.product_description}</p>
                <div style={{ display: 'flex' }}>
                    <div className="description">
                        <p>Name: {item.name}</p>
                        <p>Address: {item.address}</p>
                        <p>Date: {item.date}</p>
                        <p>Order ID: {item.order_id}</p>
                    </div>
                </div>
                <p></p>
            </div>
        </div>
    )
}
