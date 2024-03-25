import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Cotizacion from "layouts/cotizacion";
import Notifications from "layouts/notifications";

// @mui icons
import Icon from "@mui/material/Icon";
import Users from "layouts/users";
import Tracking from "layouts/tracking";

const routes = [
  {
    type: "collapse",
    name: "Perfil",
    key: "1",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/perfil",
    accessibleFor: ["1", "2"],
    component: <Profile />,
  },
  {
    type: "dropdown",
    name: "Tramites",
    key: "2",
    accessibleFor: ["2"],
    icon: <Icon fontSize="small">table_view</Icon>,
    children: [
      {
        name: "Transporte Internacional",
        key: "3",
        route: "/tramites/logisticos",
        accessibleFor: ["2"],
        component: <Tables />,
      },
      {
        name: "Agenciamiento Aduanal",
        key: "4",
        route: "/tramites/aduanales",
        accessibleFor: ["2"],
        component: <Notifications />,
      },
    ],
  },
  {
    type: "dropdown",
    name: "Shedules",
    key: "5",
    accessibleFor: ["2"],
    icon: <Icon fontSize="small">calendar_month</Icon>,
    children: [
      {
        name: "Itinerarios",
        key: "6",
        route: "/itinerarios",
        accessibleFor: ["2"],
        component: <Billing />,
      },
      {
        name: "Tracking",
        key: "7",
        route: "/tracking",
        accessibleFor: ["2"],
        component: <Tracking />,
      },
    ],
  },
  {
    type: "dropdown",
    name: "Quote",
    key: "8",
    accessibleFor: ["2"],
    icon: <Icon fontSize="small">request_quote</Icon>,
    children: [
      {
        name: "Cotización",
        key: "9",
        route: "/cotizacion",
        accessibleFor: ["2"],
        component: <Cotizacion />,
      },
      {
        name: "Tarifarios",
        key: "10",
        route: "/tarifarios",
        accessibleFor: ["2"],
        component: <Notifications />,
      },
    ],
  },
  {
    type: "collapse",
    name: "My Documentation",
    key: "11",
    icon: <Icon fontSize="small">file_copy</Icon>,
    route: "/documentation",
    accessibleFor: ["2"],
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Exoneraciones",
    key: "12",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/exoneraciones",
    accessibleFor: ["2"],
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "WHS",
    key: "13",
    icon: <Icon fontSize="small">warehouse</Icon>,
    route: "/whs",
    accessibleFor: ["2"],
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "My Finance",
    key: "14",
    icon: <Icon fontSize="small">monetization_on</Icon>,
    route: "/finance",
    accessibleFor: ["2"],
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Directorio Interno",
    key: "15",
    icon: <Icon fontSize="small">store_mall_directory</Icon>,
    route: "/directorio",
    accessibleFor: ["2"],
    component: <Dashboard />,
  },
  {
    key: "login",
    route: "/",
    accessibleFor: ["1", "2", ""],
    component: <SignIn />,
  },
  {
    key: "registro",
    route: "/authentication/sign-up",
    accessibleFor: ["1", "2", ""],
    component: <SignUp />,
  },
  {
    key: "3",
    route: "/tramites/logisticos",
    accessibleFor: ["2"],
    component: <Tables />,
  },
  {
    key: "4",
    route: "/tramites/aduanales",
    accessibleFor: ["2"],
    component: <Notifications />,
  },
  {
    key: "6",
    route: "/itinerarios",
    accessibleFor: ["2"],
    component: <Billing />,
  },
  {
    key: "7",
    route: "/tracking",
    accessibleFor: ["2"],
    component: <Tracking />,
  },
  {
    key: "9",
    route: "/cotizacion",
    accessibleFor: ["2"],
    component: <Cotizacion />,
  },
  {
    key: "10",
    route: "/tarifarios",
    accessibleFor: ["2"],
    component: <Notifications />,
  },
];

export default routes;
