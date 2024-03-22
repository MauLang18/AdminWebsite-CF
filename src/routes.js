import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Cotizacion from "layouts/cotizacion";

// @mui icons
import Icon from "@mui/material/Icon";
import Users from "layouts/users";
import Tracking from "layouts/tracking";

const routes = [
  {
    type: "collapse",
    name: "Perfil",
    key: "perfil",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/perfil",
    accessibleFor: ["1", "2"],
    component: <Profile />,
  },
  {
    type: "dropdown",
    name: "Tramites",
    key: "tramites",
    accessibleFor: ["2"],
    icon: <Icon fontSize="small">table_view</Icon>,
    children: [
      {
        name: "Transporte Internacional",
        key: "tramites logisticos",
        route: "/tramites/logisticos",
        accessibleFor: ["2"],
        component: <Tables />,
      },
      {
        name: "Agenciamiento Aduanal",
        key: "tramites aduanales",
        route: "/tramites/aduanales",
        accessibleFor: ["2"],
        // component: <Billing />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Directorio Interno",
    key: "directorio",
    icon: <Icon fontSize="small">store_mall_directory</Icon>,
    route: "/directorio",
    accessibleFor: ["2"],
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Itinerarios",
    key: "itinerarios",
    icon: <Icon fontSize="small">calendar_month</Icon>,
    route: "/itinerarios",
    accessibleFor: ["2"],
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Cotizacion",
    key: "cotizacion",
    icon: <Icon fontSize="small">request_quote</Icon>,
    route: "/cotizacion",
    accessibleFor: ["2"],
    component: <Cotizacion />,
  },
  {
    type: "collapse",
    name: "Tracking",
    key: "tracking",
    icon: <Icon fontSize="small">map</Icon>,
    route: "/tracking",
    accessibleFor: ["2"],
    component: <Tracking />,
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
    key: "tramites logisticos",
    route: "/tramites/logisticos",
    accessibleFor: ["2"],
    component: <Tables />,
  },
  {
    key: "tramites aduanales",
    route: "/tramites/aduanales",
    accessibleFor: ["2"],
    // component: <Billing />,
  },
];

export default routes;
