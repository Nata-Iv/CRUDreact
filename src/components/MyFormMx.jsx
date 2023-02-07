import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import "yup-phone";
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const MyFormMx = ({handleSubmit, initialValues}) => {

  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          phone: Yup.string().required("This field is Required")
            .matches(
              /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              "Phone number is not valid"
            )
            .max(11, 'Must be 10 characters or less'),
          age: Yup.string().max(2, "Must be 1 or 2 characters")
        })}

        onSubmit={(values) => {
          setUsers((prevState) => [...prevState, { ...values, id: `${Date.now()}` }])
          handleSubmit(values, navigate)
        }}

      >
        <Form  >
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />

          <label htmlFor="email">Email Address</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />

          <label htmlFor="phone">Phone</label>
          <Field name="phone" type="tel" />
          <ErrorMessage name="phone" />

          <label htmlFor="age">Age</label>
          <Field name="age" type="number" />
          <ErrorMessage name="age" />

          <label htmlFor="gender">Gender</label>
          <Field name="gender" as="select" className="my-select">
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Field>

          <button id='subm' type="submit">Submit</button>
        </Form>
      </Formik>
      <div>
        {users.map((user, index) => (
          <div className='oneCard' key={user.id}>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.age}</p>
            <p>{user.gender}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyFormMx