import React from "react"
import { observer } from 'mobx-react-lite'
import { Routes, Route, NavLink } from "react-router-dom"
import MyFormMx from "./MyFormMx"
import usersStore from "./store/usersStore"

const CreateMx = observer(() => {

    return (
        <div>
            <p>Createuser with mobx</p>
            <button type="button"><NavLink to={`../mobx/?page=${usersStore.page}`}>Return to mobx start</NavLink></button>
            <MyFormMx handleSubmit={usersStore.handlerUser} initialValues={{ id: null, name: '', email: '', phone: '', age: '', gender: '' }} />
            {/* <MyFormMx handleSubmit={usersStore.handlerUser} initialValues={usersStore.initialValues} /> */}
            <Routes>
                <Route path="" element={<p>This page for create user</p>} />
            </Routes>
        </div>
    )
})

export default CreateMx