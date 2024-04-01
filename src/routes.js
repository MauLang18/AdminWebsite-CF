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
import Tracking from "layouts/tracking";
import WHS from "layouts/whs";

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
    type: "dropdown",
    name: "WHS",
    key: "13",
    accessibleFor: ["2"],
    icon: <Icon fontSize="small">warehouse</Icon>,
    children: [
      {
        name: "Miami, USA",
        key: "14",
        route: "/miami",
        accessibleFor: ["2"],
        component: <WHS pol={"Miami, USA"} />,
      },
      {
        name: "CFZ, Panama",
        key: "15",
        route: "/panama",
        accessibleFor: ["2"],
        component: <WHS pol={"CFZ, Panama"} />,
      },
      {
        name: "SJO, CRC",
        key: "16",
        route: "/sanjose",
        accessibleFor: ["2"],
        component: <WHS pol={"SJO, CRC"} />,
      },
      {
        name: "Ningbo, China",
        key: "17",
        route: "/ningbo",
        accessibleFor: ["2"],
        component: <WHS pol={"Ningbo, China"} />,
      },
      {
        name: "Shanghai, China",
        key: "18",
        route: "/shanghai",
        accessibleFor: ["2"],
        component: <WHS pol={"Shanghai, China"} />,
      },
      {
        name: "Ciudad Guatemala, Guatemala",
        key: "19",
        route: "/guatemala",
        accessibleFor: ["2"],
        component: <WHS pol={"Ciudad Guatemala, Guatemala"} />,
      },
      {
        name: "San Pedro Sula, Honduras",
        key: "20",
        route: "/honduras",
        accessibleFor: ["2"],
        component: <WHS pol={"San Pedro Sula, Honduras"} />,
      },
    ],
  },
  {
    type: "collapse",
    name: "My Finance",
    key: "21",
    icon: <Icon fontSize="small">monetization_on</Icon>,
    route: "/finance",
    accessibleFor: ["2"],
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Directorio Interno",
    key: "22",
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
  {
    key: "14",
    route: "/miami",
    accessibleFor: ["2"],
    component: <WHS pol={"Miami, USA"} />,
  },
  {
    key: "15",
    route: "/panama",
    accessibleFor: ["2"],
    component: <WHS pol={"CFZ, Panama"} />,
  },
  {
    key: "16",
    route: "/sanjose",
    accessibleFor: ["2"],
    component: <WHS pol={"SJO, CRC"} />,
  },
  {
    key: "17",
    route: "/ningbo",
    accessibleFor: ["2"],
    component: <WHS pol={"Ningbo, China"} />,
  },
  {
    key: "18",
    route: "/shanghai",
    accessibleFor: ["2"],
    component: <WHS pol={"Shanghai, China"} />,
  },
  {
    key: "19",
    route: "/guatemala",
    accessibleFor: ["2"],
    component: <WHS pol={"Ciudad Guatemala, Guatemala"} />,
  },
  {
    key: "20",
    route: "/honduras",
    accessibleFor: ["2"],
    component: <WHS pol={"San Pedro Sula, Honduras"} />,
  },
];

export default routes;
