import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink, Route, Routes, useParams } from "react-router-dom"
import { NumberParam, useQueryParam } from "use-query-params"
import { API_URL } from "../constants"
import MyForm from "./MyForm"

const EditUser = () => {
    const [limit, setLimit] = useQueryParam('limit', NumberParam)
    const [page, setPage] = useQueryParam('page', NumberParam)
    // const initialValues={ firstName: '', email: '', phone: '', age: '', gender: '' }
    // const [userData, setUserData] = useState(initialValues)
   
    const [editableUserData, setEditableUserData] = useState(null)
    
    const params = useParams()
    // console.log(params)

    useEffect(() => {
        axios.get(`${API_URL}/${params.id}`).then(res => {
            console.log(res.data.id, res.data)
            setEditableUserData(res.data)
        })
    },[])

    const handleEditUser = (values) => {
            axios.patch(`${API_URL}/${params.id}`, values)
            .then(res => { console.log(res)})
        // console.log(params.id, values)  
    }

    if (!editableUserData) {
        return null
    }
    return (
        <div>
            <p>Edituser</p>
            <button type="button"><NavLink to={`../users?limit=${limit}&page=${page}`}>Return to list of users</NavLink></button>
            <MyForm handleSubmit={handleEditUser} initialValues={editableUserData} />
            <Routes>
                <Route path="" element={<p>This page for edit user</p>} />
            </Routes>
        </div>
    )
}

export default EditUser 