import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { saveAs } from "file-saver";

function Cotizaciones() {
  const [columns, setColumns] = useState([]); // Columnas de la tabla
  const [rows, setRows] = useState([]); // Filas de datos
  const [search, setSearch] = useState(""); // Filtro de búsqueda
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [error, setError] = useState(null); // Manejo de errores
  const user = JSON.parse(localStorage.getItem("users"));
  const { name } = user;

  // Función para obtener datos de la API
  const fetchCotizaciones = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = search
        ? `https://api.logisticacastrofallas.com/api/Cotizacion/Cliente?cliente=${name}&textFilter=${search}`
        : `https://api.logisticacastrofallas.com/api/Cotizacion/Cliente?cliente=${name}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Error al obtener cotizaciones");
      }

      if (!response.ok) {
        throw new Error("Error al obtener cotizaciones");
      }

      const data = await response.json();
      const filteredData = data?.data?.value || [];

      // Configurar columnas y filas para DataTable
      setColumns([
        { Header: "ID INTERNO", accessor: "idtra", align: "center" },
        { Header: "CLIENTE", accessor: "nombreCliente", align: "center" },
        { Header: "COTIZACIÓN", accessor: "tipoExoneracion", align: "center" },
      ]);

      setRows(
        filteredData.map((rowData) => ({
          idtra: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {rowData.quotenumber}
            </MDTypography>
          ),
          nombreCliente: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {rowData._customerid_value}
            </MDTypography>
          ),
          tipoExoneracion: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              <a href={rowData.new_enlacecotizacion}>VER COTIZACIÓN</a>
            </MDTypography>
          ),
        }))
      );
    } catch (err) {
      console.error(err);
      setError(err.message);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar datos cada vez que cambia el filtro
  useEffect(() => {
    fetchCotizaciones();
  }, [search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value); // Actualizar el estado de búsqueda
  };

  const handleDownloadExcel = () => {
    fetch(
      `https://api.logisticacastrofallas.com/api/TrackingLogin/Activo/Download?cliente=${name}`
    )
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, "tramites_activos.xlsx");
      })
      .catch((error) => {
        console.error("Error al descargar el archivo:", error);
      });
  };

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
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Cotizaciones
                </MDTypography>
                {/*<Button
                  variant="contained"
                  color="white"
                  size="medium"
                  onClick={handleDownloadExcel}
                  sx={{ ml: 2, backgroundColor: "black" }}
                >
                  Descargar Excel
                </Button>*/}
              </MDBox>
              <MDBox pt={3} px={2}>
                <TextField
                  variant="outlined"
                  placeholder="Buscar..."
                  value={search}
                  onChange={handleSearchChange}
                  size="small"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <MDTypography color="error">{error}</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Cotizaciones;
