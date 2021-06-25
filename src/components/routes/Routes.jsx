import React, { useContext } from "react";
import { useSelector, shallowEqual } from "react-redux";
import "./App.scss";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { history } from "../../helpers/history";
import PrivateRoute from "../private-routes/PrivateRoute";
import configs from "../../configs/index";

const { routes = [] } = configs;

function Routes() {
    return (
        <Router history={history}>
            <Switch>
                {routes.map((route) => {
                    const { path, exact = false, component, private: isPrivate } = route;
                    if (isPrivate) return <PrivateRoute exact={exact} path={path} component={component} />;
                    return <Route path={path} component={component} />;
                })}
                <Redirect from="*" to="/" />
            </Switch>
        </Router>

    );
}

export default Routes;
