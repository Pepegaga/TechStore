import React, { useState, useEffect, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import { baseUrl } from '../global'
import Card from '../components/Card'
import './Orders.css'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import OrderCard from '../components/OrderCard'

function Orders() {
    const { request } = useHttp()

    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')

    const renderList = async () => {
        try {
            const data = await request(`${baseUrl}/api/orders/orders`, 'POST')

            data.map(async (product) => {
                const id = product.product_id
                const prodData = await request(
                    `${baseUrl}/api/products/cartList`,
                    'POST',
                    { id }
                )
                console.log(list)
                setList((list) => [...list, prodData.item])
            })
        } catch (error) {}
    }

    useEffect(() => {
        renderList()
    }, [])

    return (
        <div className="container">
            <div>
                <p className="orders">Orders</p>
                {list.map((item) => {
                    return (
                        <>
                            <OrderCard item={item} />
                            <div className="rowBtn">
                                <Button
                                    //onClick={() => approveHandler(item, index)}
                                    variant="contained"
                                    color="primary"
                                >
                                    Approve
                                </Button>

                                <Button
                                    //onClick={() => refuseHandler(item)}
                                    variant="contained"
                                    color="secondary"
                                >
                                    Refuse
                                </Button>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default Orders
