import axios from 'axios';
import React from 'react';
import { NavLink, Route, Routes } from "react-router-dom"
import { NumberParam, useQueryParam } from 'use-query-params';
import { API_URL } from '../constants';
import MyForm from './MyForm';
// import Myform from './dnu/Myform';
// import Myform2 from "./dnu/Myform2"
// import Myform3 from "./dnu/Myform3"
// import Myform4 from "./dnu/Myform4"
// import Myform5 from "./dnu/Myform5"

const CreateUser = () => {
    const [limit, setLimit] = useQueryParam('limit', NumberParam)
    const [page, setPage] = useQueryParam('page', NumberParam)
    const handlerUser =(values) => {
        axios.post(API_URL, {
            name: values.name,
            email: values.email,
            phone: values.phone,
            age: values.age,
            gender: values.gender
          })
    }
    return (
        <div>
            <p>Createuser</p>
            <button type="button"><NavLink to={`../users?limit=${limit}&page=${page}`}>Return to list of users</NavLink></button>
            <MyForm handleSubmit={handlerUser} initialValues={{ id: null, name: '', email: '', phone: '', age: '', gender: '' }}/>
            <Routes>
                <Route path="" element={<p>This page for create user</p>} />
            </Routes>
        </div>
    )
}

export default CreateUser 