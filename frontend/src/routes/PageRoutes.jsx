import { Routes, Route } from "react-router-dom";
import Layout from '../components/Navbar/index';
import Home from '../pages/Home';
import Register from '../pages/auth/screens/register';
import Login from '../pages/auth/screens/login';
import Dashboard from '../pages/user/screens/Dashboard'
import PrivateRoute from "./PrivateRoutes";
import Profile from "../pages/user/screens/Profile";
import PublicRoute from "./PublicRoutes";
import NotFound from "../components/common/components/NotFound";
import Users1 from "../pages/user/screens/Users1";
import Users2 from "../pages/user/screens/Users2";
import Users3 from "../pages/user/screens/Users3";
import Users4 from "../pages/user/screens/Users4";

export default function PageRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route element = {<PublicRoute />}>
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                </Route>
                <Route element = {<PrivateRoute />}>
                    <Route path="dashboard" element={<Dashboard />}/>
                    <Route path="profile" element={<Profile />}/>
                    <Route path="users1" element = {<Users1 />}/>
                    <Route path="users2" element = {<Users2 />}/>
                    <Route path="users3" element = {<Users3 />}/>
                    <Route path="users4" element = {<Users4 />}/>
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

/* 
index means it is a prop, Home page renders when parent route matches.
instead of writing path again it is like default page.
it is used in nested routes.
*/