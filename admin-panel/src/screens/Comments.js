import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { baseUrl } from '../global'
import Comment from '../components/Comment'

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

    useEffect(() => {
        renderComments()
    }, [])
    console.log(list)
    return (
        <div>
            {list.map((item) => {
                return (
                    <>
                        <Comment comment={item} />
                    </>
                )
            })}
        </div>
    )
}

export default Comments
