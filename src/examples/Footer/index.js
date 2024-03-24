// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import typography from "assets/theme/base/typography";

function Footer({ company, links }) {
  const { href, name } = company;
  const { size } = typography;
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Actualizar el año cada vez que cambie
    const intervalId = setInterval(() => {
      setYear(new Date().getFullYear());
    }, 1000 * 60 * 60); // Actualiza cada hora (puedes ajustar el intervalo según tus necesidades)

    // Limpiar el intervalo cuando el componente se desmonte para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, []); // Solo se ejecuta una vez al montar el componente

  const renderLinks = () =>
    links.map((link) => (
      <MDBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <MDTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </MDTypography>
        </Link>
      </MDBox>
    ));

  return (
    <MDBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        © {year} Grupo Castro Fallas |{" "}
        <a
          href="https://customcode-2c2f5.web.app"
          className="text-blue-500 font-bold hover:text-blue-700"
          target="blank"
        >
          Desarrollado por CustomCodeCR
        </a>
        <MDBox fontSize={size.md} color="text" mb={-0.5} mx={0.25}></MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "https://www.creative-tim.com/", name: "Creative Tim" },
  links: [
    { href: "https://www.creative-tim.com/", name: "Creative Tim" },
    { href: "https://www.creative-tim.com/presentation", name: "About Us" },
    { href: "https://www.creative-tim.com/blog", name: "Blog" },
    { href: "https://www.creative-tim.com/license", name: "License" },
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
