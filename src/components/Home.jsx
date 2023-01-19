import { NavLink, Route, Routes } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <p>Home</p>
            <NavLink to="users?limit=3&page=1"><b>Go to the list of users</b></NavLink>
            <Routes>
                <Route path="" element={<p>This page for home</p>} />
            </Routes>
        </div>
    )
}

export default Home 