import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { baseUrl } from '../global'
import Comment from '../components/Comment'
import './Comments.css'
import { Button } from '@material-ui/core'

function Comments() {
    const { request } = useHttp()
    const [list, setList] = useState([])

    const renderComments = async () => {
        try {
            const data = await request(
                `${baseUrl}/api/comments/commentsToCheck`,
                'POST'
            )
            setList(data)
        } catch (error) {}
    }

    const approveHandler = async (item, index) => {
        try {
            await request(`${baseUrl}/api/comments/approve`, 'POST', {
                ...item,
            })
        } catch (error) {}
    }

    const refuseHandler = async (item) => {
        try {
            await request(`${baseUrl}/api/comments/refuse`, 'DELETE', {
                ...item,
            })
        } catch (error) {}
    }

    useEffect(() => {
        renderComments()
    }, [])
    console.log(list)
    if (list.length > 0) {
        return (
            <div className="container">
                <p className="comments">Comments</p>
                {list.map((item, index) => {
                    return (
                        <>
                            <Comment comment={item} />
                            <div className="rowBtn">
                                <Button
                                    onClick={() => approveHandler(item, index)}
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
                        </>
                    )
                })}
            </div>
        )
    } else {
        return (
            <div className="empty">
                <h1>Nothing to approve</h1>
            </div>
        )
    }
}

export default Comments
