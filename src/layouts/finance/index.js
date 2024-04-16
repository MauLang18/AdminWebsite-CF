import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import axios from "axios";

function Finance() {
  // const { columns } = authorsTableData();
  const [latestRecord, setLatestRecord] = useState(null);
  const [textFilter, setTextFilter] = useState(""); // Valor inicial del campo de texto
  const user = JSON.parse(localStorage.getItem("users"));
  const { name, acr } = user;

  const handleTextFilterChange = (event) => {
    setTextFilter(event.target.value);
  };

  const handleSearch = async () => {
    try {
      let url = `https://api.logisticacastrofallas.com/api/Finance/Cliente?cliente=${name}`;
      const response = await axios.get(url);
      const data = response.data.data;
      const latest = data[data.length - 1]; // Obtener el último registro
      setLatestRecord(latest);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construye el cuerpo del correo electrónico en formato HTML
    const emailBody = `
    <h1>Solicitud de estado de cuenta</h1>
    <p>El cliente ${acr}, esta solicitando una actualizacion de su estado de cuenta.</p>
    <p>Porfavor enviar la actualizacion por medio de correo electronico y por medio del sitio web</p>
  `;

    fetch("https://api.logisticacastrofallas.com/api/Mail/Send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        para: "cxc@grupocastrofallas.com",
        asunto: `Actualización de Estado de Cuenta para Cliente ${acr}`,
        contenido: emailBody,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Solicitud enviada con éxito!");
          // Puedes hacer cualquier acción adicional aquí, como redireccionar al usuario a otra página
        } else {
          alert("Error al enviar la solicitud: " + response.statusText);
          // También puedes manejar errores, por ejemplo, mostrando un mensaje de error al usuario
        }
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <MDTypography variant="h6" color="white" style={{ marginRight: "10px" }}>
                    MY FINANCE: {acr}
                  </MDTypography>
                </div>
              </MDBox>
              <MDBox pt={3} px={2}>
                {latestRecord && (
                  <>
                    <iframe
                      src={latestRecord.estadoCuenta}
                      width="100%"
                      height="800px"
                      frameBorder="0"
                      scrolling="auto"
                      title="Estado de Cuenta"
                    />
                  </>
                )}
                <MDBox py={2} px={2} display="flex" justifyContent="center">
                  <Button variant="contained" color="black" onClick={handleSubmit} sx={{ ml: 2 }}>
                    Solicitar Actualización
                  </Button>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Finance;
