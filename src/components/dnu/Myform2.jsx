import { Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import "yup-phone";
import React, {useState} from 'react'
import '../../css/style.css'

const Myform2 = () => {
  const [users, setUsers] = useState([])
  return (
    <div>
      <Formik    
        initialValues={{ id: null, firstName: '', email: '', phone: '', age: '', gender: '' }}

        validationSchema={Yup.object({
          firstName: Yup.string()
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
          //console.log(values)
          setUsers((prevState) => [...prevState, {...values, id: `${Date.now()}`}])
        }}
      >
        <Form  >
          <label htmlFor="firstName">Name</label>
          <Field name="firstName" type="text" />
          <ErrorMessage name="firstName" />

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
            <option value="red"></option>
            <option value="green">Male</option>
            <option value="blue">Female</option>
          </Field>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <div>
            {users.map((user, index) => (
                    <div className='oneCard' key={user.id}>
                        <h1>{user.firstName}</h1>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                        <p>{user.age}</p>
                        <p>{user.gender}</p>
                        <button >edit</button>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Myform2