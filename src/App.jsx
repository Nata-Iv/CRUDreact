import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Users from "./components/Users"
import CreateUser from "./components/CreateUser"
import EditUser from "./components/EditUser"
import { QueryParamProvider } from "use-query-params"
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'
import UsersMx from "./components/UsersMx"
import CreateMx from "./components/CreateMx"
import EditMx from "./components/EditMx"

function App() {

  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="mobx/*" element={<UsersMx />} />
        <Route path="mobx/new/*" element={<CreateMx />} />
        <Route path="mobx/:id/*" element={<EditMx />} />
        <Route path="users/*" element={<Users />} />
        <Route path="users/new/*" element={<CreateUser />} />
        <Route path="users/:id/*" element={<EditUser />} />
      </Routes>
    </QueryParamProvider>
  )
}

export default App;
