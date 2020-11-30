import React, { useState } from 'react'
import './Card.css'

export default ({ item }) => {
    const [visible, setVisible] = useState(false)

    const editHandler = async () => {
        try {
        } catch (error) {}
    }

    const deleteHandler = async () => {
        try {
        } catch (error) {}
    }

    return (
        <div className="card">
            <div className="img">
                <img src={item.product_thumb} />
            </div>
            <div className="description">
                <p className="title-text">{item.product_title}</p>
                <p className="description-text">{item.product_description}</p>
                <div style={{ display: 'flex' }}>
                    <div className="description">
                        <p>Brand: {item.product_brand}</p>
                        <p>OS: {item.product_os}</p>
                        <p>Size: {item.product_size}</p>
                        <p>Resolution: {item.product_resolution}</p>
                        <p>RAM: {item.product_ram}</p>
                    </div>
                    <div className="row2">
                        <p>Memory: {item.product_memory}</p>
                        <p>Camera: {item.product_camera}</p>
                        <p>SIM: {item.product_sim}</p>
                        <p>Category: {item.category}</p>
                        <p>Cost: {item.product_cost}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
