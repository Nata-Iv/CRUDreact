import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import "yup-phone";
import '../../css/style.css'

const Myform3 = () => {
    const [users, setUsers] = useState([])
    const formik = useFormik({
        initialValues: {
            id: null,
            firstName: '',

            email: '',
            userPhone : '',
            userAge: '',
            userGender: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less'),
            email: Yup.string().email('Invalid email address').required('Required'),
            userPhone: Yup.string().required("This field is Required")
            .matches(
              /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              "Phone number is not valid"
            )
            .max(11, 'Must be 10 characters or less'),
            
            userAge: Yup.string().max(2, "Must be 1 or 2 characters")
        }),
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            console.log(setUsers((prevState) => [...prevState, { ...values, id: `${Date.now()}` }]))
        },
    })
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
            ) : null}

            <label htmlFor="lastName">Last Name</label>
            <input
                id="lastName"
            />

            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
            ) : null}

            <label htmlFor="userPhone">Phone</label>
            <input id="userPhone" name="userPhone" type="text"
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userPhone} />
                {formik.touched.userPhone && formik.errors.userPhone ? (
                <div>{formik.errors.userPhone}</div>
            ) : null}
            <label htmlFor="userAge">Age</label>
            <input id="userAge" name="userAge" type="text"
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userAge} />
                {formik.touched.userAge && formik.errors.userAge ? (
                <div>{formik.errors.userAge}</div>
            ) : null}
            <label htmlFor="userGender">Gender</label>
            <select id="userGender" name="userGender"
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userGender}>
                <option value=""></option>
                <option value="Mail">Male</option>
                <option value="Femail">Female</option>
            </select>

            <button type="submit">Submit</button>
        </form>
        <div>
            {users.map((user, index) => (
                    <div className='oneCard' key={user.id}>
                        <h1>{user.firstName}</h1>
                        <p>{user.email}</p>
                        <p>{user.userPhone}</p>
                        <p>{user.userAge}</p>
                        <p>{user.userGender}</p>
                        <button >edit</button>
                    </div>
                ))}
            </div>
        </div>
    )
}


// const schema = () => {
//     return Yup.object({
//     firstName: Yup.string()
//       .max(15, 'Must be 15 characters or less')
//       ,
//     email: Yup.string().email('Invalid email address'),
//     phone: Yup.string()
//       .matches(
//         /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
//         "Phone number is not valid"
//       )
//       .max(11, 'Must be 10 characters or less'),
//     age: Yup.string().max(2, "Must be 1 or 2 characters")
//   })
// }

// const Myform3 = () => {
//     // const [users, setUsers] = useState([])
//     const formik = useFormik({
//         initialValues: {
//             id: null,
//             userName: '',
//             userEmail: '',
//             userPhone: '',
//             userAge: '',
//             userGender: ''
//         },
//         // validationSchema: schema,
//         validationSchema: Yup.object({
//             firstName: Yup.string()
//               .max(15, 'Must be 15 characters or less')
//               .required('Required'),
//             lastName: Yup.string()
//               .max(20, 'Must be 20 characters or less')
//               .required('Required'),
//             email: Yup.string().email('Invalid email address').required('Required'),
//         }),
//         onSubmit: values => {
//             console.log(values)
//             // setUsers((prevState) => [...prevState, {...values, id: `${Date.now()}`}])

//           },

//     })
//     console.log(formik.errors) 
//     return (

//             <form onSubmit={formik.handleSubmit}>
//                 <label htmlFor="userName">Name</label>
//                 <input id="userName" name="userName" type="text"
//                     onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userName} />
//                 {formik.touched.userName && formik.errors.userName ? (
//                     <div>{formik.errors.userName}</div>
//                 ) : null}
//                 <label htmlFor="userEmail">Email</label>
//                 <input id="userEmail" name="userEmail" type="text"
//                     onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userEmail} />
//                 {formik.touched.userEmail && formik.errors.userEmail ? (
//                     <div>{formik.errors.userEmail}</div>
//                 ) : null}
//                 <label htmlFor="userPhone">Phone</label>
//                 <input id="userPhone" name="userPhone" type="text"
//                     onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userPhone} />
//                 <label htmlFor="userAge">Age</label>
//                 <input id="userAge" name="userAge" type="text"
//                     onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userAge} />
//                 <label htmlFor="userGender">Gender</label>
//                 <select id="userGender" name="userGender"
//                     onChange={formik.handleChange}onBlur={formik.handleBlur}  value={formik.values.userGender}>
//                     <option value=""></option>
//                     <option value="Mail">Male</option>
//                     <option value="Femail">Female</option>
//                 </select>
//                 <button type='submit'>Add</button>
//             </form>


//     )
// }

export default Myform3