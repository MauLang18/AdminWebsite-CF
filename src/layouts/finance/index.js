import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import clienteMapping from "layouts/finance/data/cliente.json";
import condicionMapping from "layouts/finance/data/condicion.json";
import creditoMapping from "layouts/finance/data/credito.json";
import divisaMapping from "layouts/finance/data/divisa.json";
import axios from "axios";

function Finance() {
  // const { columns } = authorsTableData();
  const [latestRecord, setLatestRecord] = useState(null);
  const [textFilter, setTextFilter] = useState("");
  const [searchResults, setSearchResults] = useState([{}]);
  const user = JSON.parse(localStorage.getItem("users"));
  const { name, acr, email, family_name } = user;
  const apiUrl = `https://api.logisticacastrofallas.com/api/CreditoCliente?&code=${name}`;

  const handleSearch2 = async () => {
    try {
      const response = await axios.get(apiUrl);
      setSearchResults(response.data.data.value || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

      // Logging request for success
      await axios.post("https://api.logisticacastrofallas.com/api/Logs/Register", {
        Usuario: `${family_name} / ${email} / ${acr}`,
        Modulo: "My Finance",
        TipoMetodo: "Busqueda",
        Parametros: "",
        Estado: 1,
      });
    } catch (error) {
      console.error("Error fetching data:", error);

      // Log the error
      await axios.post("https://api.logisticacastrofallas.com/api/Logs/Register", {
        Usuario: `${family_name} / ${email} / ${acr}`,
        Modulo: "My Finance",
        TipoMetodo: "Busqueda",
        Parametros: "",
        Estado: 0,
      });
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

  const formatDate = (dateString) => {
    if (!dateString || dateString.trim() === "") {
      return "NO DISPONIBLE";
    }

    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString("es-ES", options);

    return formattedDate;
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString || dateTimeString.trim() === "") {
      return "NO DISPONIBLE";
    }

    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDateTime = new Date(dateTimeString).toLocaleString("es-ES", options);

    return formattedDateTime;
  };

  const getClienteName = (cliente) => {
    return clienteMapping[cliente] || "";
  };

  const getCondicionName = (condicion) => {
    return condicionMapping[condicion] || "";
  };

  const getCreditoName = (creditoStr) => {
    if (creditoStr == null) {
      return "No hay datos disponibles";
    }

    const creditos = creditoStr.split(",");

    const nombresEstados = [];

    creditos.forEach((credito) => {
      const nombreEstado = creditoMapping[credito.trim()] || "";
      nombresEstados.push(nombreEstado);
    });

    return nombresEstados.join(", ");
  };

  const getDivisaName = (divisa) => {
    return divisaMapping[divisa] || "";
  };

  useEffect(() => {
    handleSearch();
    handleSearch2();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                <Box sx={{ height: "50px" }} />
                {searchResults.map((result, index) => (
                  <Box
                    key={index}
                    sx={{ display: "grid", gap: 1, mx: "auto", textAlign: "center" }}
                  >
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 1 }}>
                      <Typography variant="h6">Tipo de cliente:</Typography>
                      <Typography variant="h6">Divisa:</Typography>
                      <Typography variant="h6">Limite de credito:</Typography>
                      <Typography variant="h6">Condiciones de pago:</Typography>
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 1 }}>
                      <Typography>{getClienteName(result.new_tipodeproveedor)}</Typography>
                      <Typography>{getDivisaName(result._transactioncurrencyid_value)}</Typography>
                      <Typography>
                        {result.creditlimit != null
                          ? result.creditlimit.toLocaleString()
                          : "Sin datos"}
                      </Typography>
                      <Typography>{getCondicionName(result.paymenttermscode)}</Typography>
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1 }}>
                      <Typography variant="h6">Dias de credito:</Typography>
                      <Typography variant="h6">Fecha inicio credito:</Typography>
                      <Typography variant="h6">Fecha renovacion credito:</Typography>
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1 }}>
                      <Typography>{result.new_diasdecredito}</Typography>
                      <Typography>{formatDate(result.new_fechadeiniciodecredito)}</Typography>
                      <Typography>{formatDate(result.new_fechaderenovaciondecredito)}</Typography>
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 1 }}>
                      <Typography variant="h6">CREDITO INCLUYE:</Typography>
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 1 }}>
                      <Typography>{getCreditoName(result.new_3)}</Typography>
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 1 }}>
                      <Typography variant="h6">CREDITO NO INCLUYE:</Typography>
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 1 }}>
                      <Typography>{getCreditoName(result.new_creditonoincluye)}</Typography>
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                      <Typography variant="h6">% FINANCIAMIENTO MENSUAL:</Typography>
                      <Typography variant="h6">INTERES MORATORIO MENSUAL:</Typography>
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                      <Typography>{result.new_financiamiento}</Typography>
                      <Typography>{result.new_intersmoratoriomensual}</Typography>
                    </Box>
                  </Box>
                ))}
              </MDBox>
            </Card>
          </Grid>
          <Box sx={{ height: "50px" }} />
          <Grid container spacing={6}></Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Finance;
