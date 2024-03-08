import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  /*{
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },*/
  {
    type: "collapse",
    name: "Perfil",
    key: "perfil",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/perfil",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Tramites",
    key: "tramites",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tramites",
    component: <Tables />,
  },
  /*{
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },*/
  {
    key: "login",
    route: "/",
    component: <SignIn />,
  },
  {
    key: "registro",
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
