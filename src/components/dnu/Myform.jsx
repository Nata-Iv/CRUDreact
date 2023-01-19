// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as yup from 'yup'
import React, { useState } from 'react'
import '../../css/style.css'

const initialValues = { userName: '', userEmail: '', userPhone: '', userAge: '', userGender: '' }

const Myform = () => {
    const [userData, setUserData] = useState(initialValues)
    const [users, setUsers] = useState([])
    const [editableUserData, setEditableUserData] = useState({
        isEdit: false,
        userIndex: null
    })
    const isFilled = userData.userName && userData.userEmail  
    const handlerSubmitUser = (e) => {
        e.preventDefault()
        if (isFilled) {
            if (editableUserData.isEdit) {
                const editedData = users
                editedData.splice(editableUserData.userIndex, 1, userData)
                setUsers(editedData)
                setEditableUserData({
                    isEdit: false,
                    userIndex: null
                })
            } else {
                setUsers((prevState) => [...prevState, userData])
            }
            setUserData(initialValues)
        }
    }
    const handleEditClick = (data, index) => {
        setUserData(data)
        setEditableUserData({
            isEdit: true,
            userIndex: index
        })
    }
    // console.log('users:', users)
    const handleCleanClick = () => setUserData(initialValues)

    const handleDeleteClick = (index) => {
        setUsers(users.filter((user, userIndex) => userIndex !== index))
    }

    return (
        <div>
            <p>Form</p>
            <form onSubmit={handlerSubmitUser} onReset={handleCleanClick}>
                <label>
                    Name*
                    <input type="text" name="name"
                        onChange={(e) => setUserData((prevState) => ({
                            ...prevState,
                            userName: e.target.value
                        }))}
                        value={userData.userName}
                    />
                </label>
                <label>
                    Email*
                    <input type="text" name="email"
                        onChange={(e) => setUserData((prevState) => ({
                            ...prevState,
                            userEmail: e.target.value
                        }))}
                        value={userData.userEmail} />
                </label>
                <label>
                    Phone
                    <input type="text" name="phone"
                        onChange={(e) => setUserData((prevState) => ({
                            ...prevState,
                            userPhone: e.target.value
                        }))}
                        value={userData.userPhone} />
                </label>
                <label>
                    Age
                    <input type="text" name="age"
                        onChange={(e) => setUserData((prevState) => ({
                            ...prevState,
                            userAge: e.target.value
                        }))}
                        value={userData.userAge} />
                </label>
                <label>
                    Gender
                    <select onChange={(e) => setUserData((prevState) => ({
                        ...prevState,
                        userGender: e.target.value
                    }))}
                        value={userData.userGender}>
                        <option value=""></option>
                        <option value="Mail">Male</option>
                        <option value="Femail">Female</option>
                    </select>
                </label>
                <button type="reset" value="Clean">Clean</button>
                <button disabled={!isFilled} type="submit" value="Add">Add</button>
            </form>
            <div>
                {users.map((user, index) => (
                    <div className='oneCard'>
                        <h1>{user.userName}</h1>
                        <p>{user.userEmail}</p>
                        <p>{user.userPhone}</p>
                        <p>{user.userAge}</p>
                        <p>{user.userGender}</p>
                        <button onClick={() => handleEditClick(user, index)}>edit</button>
                        <button onClick={() => handleDeleteClick(index)}>remove</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Myform 
