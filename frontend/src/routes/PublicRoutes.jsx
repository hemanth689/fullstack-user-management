import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? <Navigate to="/profile" replace /> : <Outlet />;
};

export default PublicRoute;

/*
replace is the prop.
Instead of pushing the new route onto the browser history stack, It replaces the current entry.
-> Assume, If we are in dashboard page, we are going to login page so here we have used replace.
-> If we click back it won't go back to dashboard page because it is not in browser history stack.
-> It just replaces dashboard with login so that it will go to previous page based on history.
*/