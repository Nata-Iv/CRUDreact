import React, {useEffect, useRef} from "react"
import { observer } from 'mobx-react-lite'
import { Routes, Route, NavLink, useParams } from "react-router-dom"
import MyFormMx from "./MyFormMx"
import usersStore from "./store/usersStore"

const EditMx = observer(() => {

    const params = useParams()
    
    useEffect(() => {
        usersStore.fetchUserById(params.id)
    }, [])

    if (!usersStore.initialValues.id) return null

    return (
        <div>
            <p>Edit user with mobx</p>
            <button type="button">
                <NavLink to={`../mobx`}>Return to mobx start</NavLink>
            </button>
            <MyFormMx handleSubmit={usersStore.handleEditUser} initialValues={usersStore.initialValues}/>
            <Routes>
                <Route path="" element={<p>This page for create user</p>} />
            </Routes>
        </div>
    )
})

export default EditMx