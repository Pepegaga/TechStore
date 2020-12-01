import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { baseUrl } from '../global'

export default ({ comment }) => {
    const { request } = useHttp()

    const id = comment.product_id
    const [title, setTitle] = useState([])

    const prodTitle = async () => {
        try {
            const title = await request(
                `${baseUrl}/api/products/title`,
                'POST',
                { id }
            )
            console.log(title)
            setTitle(title)
        } catch (error) {}
    }

    useEffect(() => {
        prodTitle()
    }, [])

    return (
        <div className="messageCard">
            <div className="textRow">
                <p className="name">{comment.user_name}</p>
                <p className="date">{comment.date}</p>
                <p className="prodTitle">{title}</p>
                <p className="rating">Rating: {comment.rating}/5</p>
            </div>
            <p className="commentTitle">{comment.comment_title}</p>
            <p className="comment">{comment.comment}</p>
            <p className="plus">{comment.pluses}</p>
            <p className="minus">{comment.minuses}</p>
        </div>
    )
}
