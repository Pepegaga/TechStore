import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { baseUrl } from '../global'
import './Users.css'
import UserCard from '../components/UserCard'
import { Button } from '@material-ui/core'

function Users() {
    const { request } = useHttp()

    const [list, setList] = useState([])

    const renderList = async () => {
        try {
            const data = await request(`${baseUrl}/api/users/users`, 'POST')
            setList(data)
            console.log(data)
        } catch (error) {}
    }

    useEffect(() => {
        renderList()
    }, [])

    const changeHandler = async (item) => {
        try {
            const flag = await request(
                `${baseUrl}/api/users/changeRole`,
                'PUT',
                { ...item }
            )
            if (flag) alert('Role changed')
            else alert('Something went wrong')
        } catch (error) {}
    }

    return (
        <div>
            <p className="users">Users</p>
            {list.map((item) => {
                return (
                    <>
                        <div>
                            <UserCard item={item} />
                            {!item.user_isadmin ? (
                                <div className="makeAdmin">
                                    <Button
                                        onClick={() => changeHandler(item)}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Give admin
                                    </Button>
                                </div>
                            ) : (
                                <div className="makeAdmin">
                                    <Button
                                        onClick={() => changeHandler(item)}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Take away
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default Users
