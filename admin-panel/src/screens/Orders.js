import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { baseUrl } from '../global'
import './Orders.css'
import { Button } from '@material-ui/core'
import OrderCard from '../components/OrderCard'

function Orders() {
    const { request } = useHttp()

    const [list, setList] = useState([])

    const renderList = async () => {
        try {
            const data = await request(`${baseUrl}/api/orders/orders`, 'POST')
            setList(data)
            console.log(data)
        } catch (error) {}
    }

    useEffect(() => {
        renderList()
    }, [])

    const approveHandler = async (item) => {
        try {
            console.log(item)
            const flag = await request(
                `${baseUrl}/api/orders/approveOrder`,
                'POST',
                { ...item }
            )
            if (flag) {
                alert('Order approved')
            } else {
                alert('Something went wrong')
            }
        } catch (error) {}
    }

    const refuseHandler = async (item) => {
        try {
            const flag = await request(
                `${baseUrl}/api/orders/refuseOrder`,
                'DELETE',
                { ...item }
            )
            if (flag) {
                alert('Order refused')
            } else {
                alert('Something went wrong')
            }
        } catch (error) {}
    }

    return (
        <div>
            <p className="orders">Orders</p>
            {list.map((item) => {
                return (
                    <>
                        <div className="rows">
                            <div>
                                <OrderCard item={item} />
                            </div>

                            <div className="buttons">
                                <Button
                                    onClick={() => approveHandler(item)}
                                    variant="contained"
                                    color="primary"
                                >
                                    Approve
                                </Button>

                                <Button
                                    onClick={() => refuseHandler(item)}
                                    variant="contained"
                                    color="secondary"
                                >
                                    Refuse
                                </Button>
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default Orders
