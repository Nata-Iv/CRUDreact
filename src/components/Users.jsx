import { NavLink, Route, Routes } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import axios from "axios"
import { API_URL } from "../constants"
import { Pagination, Stack } from '@mui/material'
import { NumberParam, useQueryParam, withDefault } from "use-query-params"


const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 3

const Users = () => {
    const [limit] = useQueryParam('limit', withDefault(NumberParam, DEFAULT_LIMIT))
    const [page, setPage] = useQueryParam('page', withDefault(NumberParam, DEFAULT_PAGE))
   
    const [users, setUsers] = useState([])

    const [pageCount, setPageCount] = useState(0)
    const [usersPerPage] = useState(3)

    const handleDeleteClick = (userData) => {
        if (window.confirm(`Delete ${userData.name} ?`))
            axios.delete(`${API_URL}/${userData.id}`)

        axios.get(`${API_URL}?_page=${page}&_limit=${limit}`)
            .then(data => {
                setUsers(data.data)
            })
    }

    useEffect(() => {
        axios
            .get(`${API_URL}?_page=${page}&_limit=${limit}`)
            .then(data => {
                // console.log(data.headers.get('X-Total-Count'))
                setUsers(data.data, data.data.id)
                setPageCount(Math.ceil(data.headers.get('X-Total-Count') / usersPerPage))
            })
    }, [page, limit, setUsers, setPageCount])
    
    return (
        <div>
            <p><b>Users' page</b></p>
            <button type="button" id="btn-add" >
                <NavLink to={`new`}>Add user</NavLink>
            </button>
            <div className="allCard">
                {users.map((user, index) => {
                    return (
                        <div className="oneCard" key={user.id}>
                            <div className="placeUser">
                                <h1>{user.name}</h1>
                                <p>{user.email}</p>
                                <p>{user.phone}</p>
                                <p>{user.gender}</p>
                                <p>{user.age}</p>
                            </div>
                            <button >
                                <NavLink to={`${user.id}?page=${page}`}>edit</NavLink>
                            </button>
                            <button onClick={() => handleDeleteClick(user)}
                            >delete</button>
                        </div>
                    )
                })}
            </div>
            <Stack spacing={2}>
                {!!pageCount && (
                    <Pagination shape="rounded" size="large"
                        count={pageCount}
                        page={page}
                        onChange={(e, num) => setPage(num)}
                        sx={{ marginY: 5, mx: 'auto' }} 
                    />
                )}
            </Stack>
            <Routes>
                <Route path="" element={<p>List of Our users</p>} />
            </Routes>
        </div>
    )
}

export default Users 