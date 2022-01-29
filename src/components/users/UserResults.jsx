import React from 'react';
import { useState, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem'
function UserResults() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true) // set to false when data is retrieved


    useEffect(() => {
        fetchUsers()
    }, [])


    const fetchUsers = async () => {
        const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`,
            {
                headers: {
                    Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}` // send bearer token also
                },
            })
    
        const data = await response.json()

        setUsers(data)
        setLoading(false)

        // console.log(data);
    }

    if (!loading) {

        return <div className='grid grid-cols-1 gap-9 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        
            {users.map((user) =>
                <UserItem key={user.id} user={user}/>
        
        
            )}
    
        </div>
        
    } else {
        return <Spinner/>
    }

}
export default UserResults
