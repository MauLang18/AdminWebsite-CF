import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";

function Sidenav({ brandName, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");
  const user = JSON.parse(localStorage.getItem("users"));
  const given_name = user ? user.given_name : "";

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  const clearLocalStorage = () => {
    localStorage.removeItem("users");
  };

  useEffect(() => {
    window.addEventListener("beforeunload", clearLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);

  const [dropdownStates, setDropdownStates] = useState({});

  useEffect(() => {
    if (Array.isArray(routes)) {
      const dropdownInitialStates = {};
      routes.forEach((route) => {
        if (route.type === "dropdown") {
          dropdownInitialStates[route.name] = false;
        }
      });
      setDropdownStates(dropdownInitialStates);
    }

    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();

    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, routes, transparentSidenav, whiteSidenav]);

  const toggleDropdown = (dropdownName) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };

  const renderRoutes = Array.isArray(routes)
    ? routes.map(
        ({ type, name, icon, title, noCollapse, key, href, route, children, accessibleFor }) => {
          if (accessibleFor && !accessibleFor.includes(given_name)) {
            return null;
          }

          let returnValue;

          if (type === "dropdown") {
            returnValue = (
              <div key={key} onClick={() => toggleDropdown(name)}>
                <SidenavCollapse name={name} icon={icon} noCollapse={noCollapse} />
              </div>
            );

            if (dropdownStates[name]) {
              returnValue = (
                <>
                  {returnValue}
                  {children.map((child) => (
                    <NavLink key={child.key} to={child.route}>
                      <SidenavCollapse
                        name={child.name}
                        icon={child.icon}
                        active={child.key === collapseName}
                        noCollapse={noCollapse}
                      />
                    </NavLink>
                  ))}
                </>
              );
            }
          } else if (type === "collapse") {
            returnValue = href ? (
              <Link
                href={href}
                key={key}
                target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: "none" }}
              >
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  active={key === collapseName}
                  noCollapse={noCollapse}
                />
              </Link>
            ) : (
              <NavLink key={key} to={route}>
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  active={key === collapseName}
                  noCollapse={noCollapse}
                />
              </NavLink>
            );
          } else if (type === "title") {
            returnValue = (
              <MDTypography
                key={key}
                color={textColor}
                display="block"
                variant="caption"
                fontWeight="bold"
                textTransform="uppercase"
                pl={3}
                mt={2}
                mb={1}
                ml={1}
              >
                {title}
              </MDTypography>
            );
          } else if (type === "divider") {
            returnValue = (
              <Divider
                key={key}
                light={
                  (!darkMode && !whiteSidenav && !transparentSidenav) ||
                  (darkMode && !transparentSidenav && whiteSidenav)
                }
              />
            );
          }

          return returnValue;
        }
      )
    : null;

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox
          component={NavLink}
          to="/"
          display="flex"
          alignItems="center"
          onClick={clearLocalStorage}
        >
          {brandName && (
            <MDBox
              component="img"
              src={"logoblanco.png"} // Reemplaza con la ruta correcta de tu imagen
              alt="Brand"
              width="2rem"
            />
          )}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

Sidenav.propTypes = {
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["dropdown", "collapse", "title", "divider"]).isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]), // Cambiado aquí
      title: PropTypes.string,
      noCollapse: PropTypes.bool,
      key: PropTypes.string.isRequired,
      href: PropTypes.string,
      route: PropTypes.string,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]), // Cambiado aquí
          route: PropTypes.string.isRequired,
        })
      ),
      accessibleFor: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};

export default Sidenav;
