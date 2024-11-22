// useRoutes.js

import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Cotizacion from "layouts/cotizacion";
import Notifications from "layouts/notifications";
import Tracking from "layouts/tracking";
import WHS from "layouts/whs";
import Exoneracion from "layouts/exoneracion";
import Finance from "layouts/finance";
import { Icon } from "@mui/material";
import Cotizaciones from "layouts/cotizaciones";

const fetchWHSData = async () => {
  try {
    const response = await axios.get(
      "https://api.logisticacastrofallas.com/api/Pol/Whs"
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching WHS data", error);
    return [];
  }
};

const generateWHSRoutes = (whsData) => {
  return whsData
    .filter((whs) => whs.whs === 1)
    .map((whs) => {
      const routeName = whs.nombre.replace(/ /g, "-").toLowerCase();
      return {
        name: whs.nombre,
        key: uuidv4(),
        route: `/${routeName}`,
        accessibleFor: ["2"],
        component: <WHS pol={whs.nombre} />,
      };
    });
};

const useRoutes = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const initializeRoutes = async () => {
      const whsData = await fetchWHSData();
      const whsRoutes = generateWHSRoutes(whsData);

      setRoutes([
        {
          type: "collapse",
          name: "Perfil",
          key: "1",
          icon: <Icon>person</Icon>,
          route: "/perfil",
          accessibleFor: ["1", "2"],
          component: <Profile />,
        },
        {
          type: "dropdown",
          name: "Tramites",
          key: "2",
          accessibleFor: ["2"],
          icon: <Icon>table_view</Icon>,
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
          icon: <Icon>calendar_month</Icon>,
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
          icon: <Icon>request_quote</Icon>,
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
            {
              name: "Cotizaciones",
              key: "",
              route: "/cotizaciones",
              accessibleFor: ["23"],
              component: <Cotizaciones />,
            },
          ],
        },
        {
          type: "collapse",
          name: "My Documentation",
          key: "11",
          icon: <Icon>file_copy</Icon>,
          route: "/documentation",
          accessibleFor: ["2"],
          component: <Notifications />,
        },
        {
          type: "collapse",
          name: "Exoneraciones",
          key: "12",
          icon: <Icon>receipt_long</Icon>,
          route: "/exoneraciones",
          accessibleFor: ["2"],
          component: <Exoneracion />,
        },
        {
          type: "dropdown",
          name: "WHS",
          key: "13",
          accessibleFor: ["2"],
          icon: <Icon>warehouse</Icon>,
          children: whsRoutes,
        },
        {
          type: "collapse",
          name: "My Finance",
          key: "21",
          icon: <Icon>monetization_on</Icon>,
          route: "/finance",
          accessibleFor: ["2"],
          component: <Finance />,
        },
        {
          type: "collapse",
          name: "Directorio Interno",
          key: "22",
          icon: <Icon>store_mall_directory</Icon>,
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
          key: "23",
          route: "/cotizaciones",
          accessibleFor: ["2"],
          component: <Cotizaciones />,
        },
        {
          key: "10",
          route: "/tarifarios",
          accessibleFor: ["2"],
          component: <Notifications />,
        },
        ...whsRoutes,
      ]);
    };

    initializeRoutes();
  }, []);

  return routes;
};

export default useRoutes;
