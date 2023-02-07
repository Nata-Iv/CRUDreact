import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink, Route, Routes, useParams, useNavigate } from "react-router-dom"
import { NumberParam, useQueryParam } from "use-query-params"
import { API_URL } from "../constants"
import MyForm from "./MyForm"

const EditUser = () => {
    const [page] = useQueryParam('page', NumberParam)
    const [editableUserData, setEditableUserData] = useState(null)
    const navigate = useNavigate()
    const params = useParams()
    // console.log(params)

    useEffect(() => {
        axios.get(`${API_URL}/${params.id}`).then(res => {
            setEditableUserData(res.data)
        })
    },[])

    const handleEditUser = (values) => {
        axios.patch(`${API_URL}/${params.id}`, values)
        .then(res => { navigate(`/users/?page=${page}`)})
    }

    if (!editableUserData) {
        return null
    }
    return (
        <div>
            <p>Edituser</p>
            <button type="button"><NavLink to={'../users'}>Return to list of users</NavLink></button>
            <MyForm handleSubmit={handleEditUser} initialValues={editableUserData} />
            <Routes>
                <Route path="" element={<p>This page for edit user</p>} />
            </Routes>
        </div>
    )
}

export default EditUser 