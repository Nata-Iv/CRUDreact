import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Users from "./components/Users"
import CreateUser from "./components/CreateUser"
import EditUser from "./components/EditUser"
import { QueryParamProvider } from "use-query-params"
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

function App() {
  // const api = axios.create({
  //   baseURL: `http://localhost:3001/users/`
  // })
  // api.get('/').then(res => {
  //   console.log(res.data)
  // })

  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="users/*" element={<Users />} />
        <Route path="users/new/*" element={<CreateUser />} />
        <Route path="users/:id/*" element={<EditUser />} />
      </Routes>
    </QueryParamProvider>
  )
}

// class App extends Component {
//   api = axios.create({
//     baseURL: `http://localhost:3001/users/`
//   })
//   constructor() {
//     super()
//     this.api.get('/').then(res => {
//       console.log(res.data)
//     })
//   }
//   router = createBrowserRouter(createRoutesFromElements(
//   <Route>
//     <Route path="/*" element={<Home />} />
//     <Route path="users/*" element={<Users />} />
//     <Route path="users/new/*" element={<Createuser />} />
//     <Route path="users/:id/*" element={<Edituser />} />
//   </Route>
//   ))
//   render() {
//     return (
//       <RouterProvider router={this.router} />
//     )
//   }
// }

// class App extends Component {
//   api = axios.create({
//     baseURL: `http://localhost:3001/users/`
//   })
//   constructor () {
//     super()
//     this.api.get('/').then(res => {
//       console.log(res.data)
//     })
//   }
//   render() {
//     return (
//           <Routes>
//             <Route path="/*" element={<Home />} />
//             <Route path="users/*" element={<Users />} />
//             <Route path="users/new/*" element={<Createuser />} />
//             <Route path="users/:id/*" element={<Edituser />} />
//           </Routes>
//         )
//   }
// }

export default App;
