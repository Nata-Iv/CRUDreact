import { NavLink, Route, Routes } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import axios from "axios"
import { API_URL } from "../constants"
// import Pagination from "./Pagination"
import { Pagination, PaginationItem, Stack } from '@mui/material'
import { NumberParam, useQueryParam } from "use-query-params"
// async function getUsers() {
//     const res = await fetch('http://localhost:3001/users/')
//     const allUsers = await res.json()
//     // console.log(res, allUsers)
//     allUsers.forEach(user => listOfUsers(user))
// }
// window.addEventListener('DOMContentLoaded', getUsers)

// function listOfUsers({ name, email, phone, gender, age }) {
//     const usersList = document.getElementById('root')
//     usersList.insertAdjacentHTML('beforeend', `
//       <div class="oneCard">
//         <h1>${name}</h1>
//         <p>${email}</p>
//         <p>${phone}</p>
//         <p>${gender}</p>
//         <p>${age}</p>
//       </div>
//     `)
// }
const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 3

const Users = () => {
    const [limit, setLimit] = useQueryParam('limit', NumberParam)
    const [page, setPage] = useQueryParam('page', NumberParam)
    console.log(limit, page)
    const [users, setUsers] = useState([])

    // const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [usersPerPage] = useState(3)
    // const lastUserIndex = page * usersPerPage
    // const firstUserIndex = lastUserIndex - usersPerPage
    // const currentUser = users.slice(firstUserIndex, lastUserIndex)
 
    // const [currentPage, setCurrentPage] = useState(1)
    // const [usersPerPage] = useState(3)
    // const lastUserIndex = currentPage * usersPerPage
    // const firstUserIndex = lastUserIndex - usersPerPage
    // const currentUser = users.slice(firstUserIndex, lastUserIndex)
    // const paginate = pageNumber => setCurrentPage(pageNumber)

    // const handleDeleteClick = (index) => {
    //     setUsers(users.filter((user, userIndex) => userIndex !== index))
    // }

    const handleDeleteClick = (userData) => {
        if (window.confirm(`Delete ${userData.name} ?`))
            axios.delete(`${API_URL}/${userData.id}`)

        axios.get(`${API_URL}?_page=${page}&_limit=${limit}`)
            .then(data => {
                setUsers(data.data)
            })
    }

    // useEffect(() => {
    //     if (!limit ) {
    //         setLimit(DEFAULT_LIMIT)
    //     }
    //     if (!page) {
    //         setPage(DEFAULT_PAGE)
    //     }
    // }, [setLimit, setPage, limit, page])

    useEffect(() => {
        axios
            .get(`${API_URL}?_page=${page}&_limit=${limit}`)
            .then(data => {
                console.log(data.headers.get('X-Total-Count'))
                // setUsers(data.data)
                setUsers(data.data, data.data.id)
                setPageCount(Math.ceil(data.headers.get('X-Total-Count') / usersPerPage))

            })
    }, [page, limit, setUsers, setPageCount])
    
    return (
        <div>
            <p><b>Users' page</b></p>
            <button type="button" id="btn-add" >
                <NavLink to={`new?limit=${limit}&page=${page}`}>Add user</NavLink>
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
                                <NavLink to={`${user.id}?limit=${limit}&page=${page}`}>edit</NavLink>
                            </button>
                            <button onClick={() => handleDeleteClick(user)}
                            >delete</button>
                        </div>
                    )
                })}
            </div>

            {/* <div>
                <Pagination
                    usersPerPage={usersPerPage}
                    totalUsers={users.length}
                    paginate={paginate} />
            </div> */}

            <Stack spacing={2}>
                {!!pageCount && (
                    <Pagination shape="rounded" size="large"
                        count={pageCount}
                        page={page}
                        onChange={(e, num) => setPage(num)}
                        sx={{ marginY: 5, mx: 'auto' }} 
                        // renderItem={
                        //     (item) => (
                        //         <PaginationItem 
                        //             component={NavLink}
                        //             to={`/?page=${item.page}`}
                        //             {...item}
                        //         />
                        //     )
                        // }
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