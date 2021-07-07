import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Message from "../pages/message/Message";
import Devices from "../pages/devices/Devices";
import Monitors from "../pages/monitors/Monitors";

const configs = {
    routes: [
        {
            path: "/",
            component: Home,
            private: true,
            exact: true
        },
        {
            path: "/profile/:userId",
            component: Profile,
            private: true
        },
        {
            path: "/login",
            component: Login,
            private: false
        },
        {
            path: "/register",
            component: Register,
            private: false
        },
        // {
        //     path: "/message/:userId",
        //     component: Message,
        //     private: false
        // },
        {
            path: "/devices/:deviceId",
            component: Devices,
            private: false
        },
        {
            path: "/monitors/:deviceId",
            component: Monitors,
            private: false
        }
    ],
    pathPublic: ["/login", "/register"]
};

export default configs;
