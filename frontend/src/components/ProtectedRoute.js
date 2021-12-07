import { Route, Redirect } from "react-router";

const ProtectedRoute = ({ component: Component, ...props }) => {
    return (
        <Route>
            {
                () => props.loggedIn ? <Component {...props} /> : <Redirect to="./login" />
            }
        </Route>
    )
}

export default ProtectedRoute;