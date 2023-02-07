import axios from 'axios';
import React from 'react';
import { NavLink, Route, Routes, useNavigate } from "react-router-dom"
import { NumberParam, useQueryParam } from 'use-query-params';
import { API_URL } from '../constants';
import MyForm from './MyForm';

const CreateUser = () => {
    const [page] = useQueryParam('page', NumberParam)
    const navigate = useNavigate()
    const handlerUser = (values) => {
        axios.post(API_URL, {
            name: values.name,
            email: values.email,
            phone: values.phone,
            age: values.age,
            gender: values.gender
          })
          .then(response  => {
            {navigate(`/users/?page=${values.id}`)}
          })
    }
    return (
        <div>
            <p>Createuser</p>
            <button type="button"><NavLink to={`../users`}>Return to list of users</NavLink></button>
            <MyForm handleSubmit={handlerUser} initialValues={{ id: null, name: '', email: '', phone: '', age: '', gender: '' }}/>
            <Routes>
                <Route path="" element={<p>This page for create user</p>} />
            </Routes>
        </div>
    )
}

export default CreateUser 