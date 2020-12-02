import React from 'react'

export default ({ item }) => {
    return (
        <div className="userCard">
            <p className="userName">User name: {item.user_name}</p>
            <p className="userName">User login: {item.user_login}</p>
            <p className="userName">
                User is admin: {item.user_isadmin.toString()}
            </p>
        </div>
    )
}
