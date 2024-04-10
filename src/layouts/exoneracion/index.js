import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/CloudDownloadTwoTone";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/exoneracion/data/authorsTableData";
import axios from "axios";

function Exoneracion() {
  const { columns } = authorsTableData();
  const [rows, setRows] = useState([]);
  const [numFilter, setNumFilter] = useState(0); // Valor inicial del combobox
  const [textFilter, setTextFilter] = useState(""); // Valor inicial del campo de texto
  const user = JSON.parse(localStorage.getItem("users"));
  const { name } = user;

  const handleTextFilterChange = (event) => {
    setTextFilter(event.target.value);
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

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getDescriptionContent = (rowData) => {
    if (showFullDescription) {
      return rowData.descripcion;
    } else {
      const firstWords = rowData.descripcion.split(" ").slice(0, 10).join(" ");
      return (
        <div>
          {firstWords}
          <button onClick={toggleDescription}>Ver más</button>
        </div>
      );
    }
  };

  const handleSearch = async () => {
    try {
      let url;
      if (numFilter === 0 && textFilter === "") {
        url = `https://api.logisticacastrofallas.com/api/Exoneracion/Cliente?cliente=${name}`;
      } else {
        url = `https://api.logisticacastrofallas.com/api/Exoneracion/Cliente?cliente=${name}&NumFilter=1&TextFilter=${textFilter}`;
      }

      const response = await axios.get(url);
      const newRows = response.data.data.map((rowData) => ({
        idtra: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {rowData.idtra}
          </MDTypography>
        ),
        nombreCliente: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {rowData.nombreCliente}
          </MDTypography>
        ),
        tipoExoneracion: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {rowData.tipoExoneracion}
          </MDTypography>
        ),
        statusExoneracion: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {rowData.statusExoneracion}
          </MDTypography>
        ),
        producto: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {rowData.producto}
          </MDTypography>
        ),
        categoria: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {rowData.categoria}
          </MDTypography>
        ),
        clasificacionArancelaria: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {rowData.clasificacionArancelaria}
          </MDTypography>
        ),
        numeroSolicitud: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {rowData.numeroSolicitud}
          </MDTypography>
        ),
        solicitud: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href={rowData.solicitud}>SOLICITUD</a>
          </MDTypography>
        ),
        numeroAutorizacion: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {rowData.numeroAutorizacion}
          </MDTypography>
        ),
        autorizacion: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href={rowData.autorizacion}>AUTORIZACION</a>
          </MDTypography>
        ),
        desde: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {formatDate(rowData.desde)}
          </MDTypography>
        ),
        hasta: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {formatDate(rowData.hasta)}
          </MDTypography>
        ),
        descripcion: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {getDescriptionContent(rowData)}
          </MDTypography>
        ),
      }));

      setRows(newRows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDownloadExcel = () => {
    let url;
    if (numFilter === 0 && textFilter === "") {
      url = `https://api.logisticacastrofallas.com/api/Exoneracion/Cliente?cliente=${name}&Download=True`;
    } else {
      url = `https://api.logisticacastrofallas.com/api/Exoneracion/Cliente?cliente=${name}&NumFilter=1&TextFilter=${textFilter}&Download=True`;
    }

    axios
      .get(url, { responseType: "blob" })
      .then((response) => {
        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        const filename = "tramites_activos.xlsx";
        if (window.navigator.msSaveOrOpenBlob) {
          // IE
          window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
          // Otros navegadores
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
      })
      .catch((error) => {
        console.error("Error al descargar el archivo:", error);
      });
  };

  useEffect(() => {
    handleSearch();
  }, [textFilter]);

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
                flexWrap="wrap" // Añadir flexWrap para que los elementos se envuelvan en dispositivos móviles
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <MDTypography variant="h6" color="white" style={{ marginRight: "10px" }}>
                    FILTRO:
                  </MDTypography>
                  <Select
                    value={textFilter}
                    onChange={handleTextFilterChange}
                    variant="standard"
                    size="medium"
                    className="mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
                    style={{ color: "white" }}
                    displayEmpty
                    inputProps={{ "aria-label": "FILTRO" }}
                  >
                    <MenuItem value="" disabled>
                      FILTRO
                    </MenuItem>
                    <MenuItem value={""}>Todos</MenuItem>
                    <MenuItem value={"En Tramite"}>En Tramite</MenuItem>
                    <MenuItem value={"Autorizada"}>Autorizada</MenuItem>
                    <MenuItem value={"Vencida"}>Vencida</MenuItem>
                  </Select>
                </div>

                {/* <Button
                  variant="contained"
                  color="white"
                  size="medium"
                  startIcon={<SearchIcon />}
                  onClick={handleDownloadExcel}
                  sx={{ ml: 2, backgroundColor: "black" }}
                >
                  Descargar Excel
                </Button> */}
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Exoneracion;
