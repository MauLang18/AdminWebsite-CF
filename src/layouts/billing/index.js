import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/billing/data/authorsTableData";
import axios from "axios";
import Avatars from "../billing/data/Avatars";

function Billing() {
  const { columns } = authorsTableData();
  const [rows, setRows] = useState([]);
  const [numFilter, setNumFilter] = useState(0); // Valor inicial del combobox
  const [textFilter, setTextFilter] = useState(""); // Valor inicial del campo de texto

  const [secondSelectOptions, setSecondSelectOptions] = useState([]);

  const handleNumFilterChange = (event) => {
    setNumFilter(event.target.value);
    setTextFilter("");
  };

  const handleTextFilterChange = (event) => {
    setTextFilter(event.target.value);
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    var formattedDate;
    if (dateString !== null) {
      formattedDate = new Date(dateString).toLocaleDateString("es-ES", options);
    } else {
      formattedDate = "";
    }
    return formattedDate;
  };

  const handleSearch = async () => {
    try {
      let url;
      if (numFilter === 0 && textFilter === "") {
        url = `https://api.logisticacastrofallas.com/api/Itinerario`;
      } else {
        url = `https://api.logisticacastrofallas.com/api/Itinerario?NumFilter=${numFilter}&TextFilter=${textFilter}`;
      }

      const response = await axios.get(url);
      const newRows = response.data.data
        .filter((rowData) => rowData.estado === 1) // Filtrar las filas con estado igual a 1
        .map((rowData) => ({
          origen: (
            <Avatars
              members={[rowData.origen].map((image, index) => [image, `Image ${index + 1}`])}
            />
          ),
          pol: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {rowData.pol}
            </MDTypography>
          ),
          destino: (
            <Avatars
              members={[rowData.destino].map((image, index) => [image, `Image ${index + 1}`])}
            />
          ),
          pod: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {rowData.pod}
            </MDTypography>
          ),
          closing: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {formatDate(rowData.closing)}
            </MDTypography>
          ),
          etd: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {formatDate(rowData.etd)}
            </MDTypography>
          ),
          eta: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {formatDate(rowData.eta)}
            </MDTypography>
          ),
          carrier: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {rowData.carrier}
            </MDTypography>
          ),
          vessel: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {rowData.vessel}
            </MDTypography>
          ),
          voyage: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {rowData.voyage}
            </MDTypography>
          ),
          transporte: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {rowData.transporte}
            </MDTypography>
          ),
          modalidad: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {rowData.modalidad}
            </MDTypography>
          ),
        }));

      setRows(newRows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [textFilter]);

  useEffect(() => {
    // Definir las opciones para el segundo select según la opción seleccionada en el primero
    if (numFilter === 1) {
      // Si se selecciona POL
      setSecondSelectOptions([
        "Ningbo, China",
        "Shanghai, China",
        "Qingdao, China",
        "Xiamen, China",
        "Yantian, China",
        "Guangzhou, China",
        "Miami, USA",
        "SJO, CRC",
        "PVG, China",
        "NKG, China",
        "PEK, China",
        "CFZ, Panama",
        "Ciudad Hidalgo, MX",
        "Ciudad de Guatemala, Guatemala",
        "Managua, Nicaragua",
        "San Pedro Sula, Honduras",
        "San Salvador, El Salvador",
      ]);
    } else if (numFilter === 2) {
      // Si se selecciona POD
      setSecondSelectOptions([
        "CFZ, Panama",
        "SJO, CRC",
        "Ciudad Guatemala, Guatemala",
        "San Pedro Sula, Honduras",
        "San Salvador, El Salvador",
        "Managua, Nicaragua",
        "Newark (New Jersey), USA",
        "Los Angeles (California), USA",
        "Port Everglades (Florida), USA",
        "Savannah (Georgia), USA",
        "Wilmington (North Carolina), USA",
        "Houston (Texas), USA",
      ]);
    } else if (numFilter === 3) {
      // Si se selecciona POD
      setSecondSelectOptions(["Aereo", "Maritimo", "Terrestre"]);
    } else if (numFilter === 4) {
      // Si se selecciona POD
      setSecondSelectOptions(["LCL", "LTL", "FCL", "FTL", "Multimodal"]);
    } else {
      // Si se selecciona Todos, reinicia las opciones del segundo select
      setSecondSelectOptions([]);
    }
  }, [numFilter]);

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
                <MDTypography variant="h6" color="white">
                  Itinerarios
                </MDTypography>
                <Select
                  value={numFilter}
                  onChange={handleNumFilterChange}
                  variant="standard"
                  size="medium"
                  className="mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
                >
                  <MenuItem value={0}>Todos</MenuItem>
                  <MenuItem value={1}>Filtrar por POL</MenuItem>
                  <MenuItem value={2}>Filtrar por POD</MenuItem>
                  <MenuItem value={3}>Filtrar por Transporte</MenuItem>
                  <MenuItem value={4}>Filtrar por Modalidad</MenuItem>
                </Select>
                {/* Mostrar el segundo select si se selecciona POL o POD */}
                {numFilter !== 0 && (
                  <Select
                    value={textFilter}
                    onChange={handleTextFilterChange}
                    variant="standard"
                    size="medium"
                    className="mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
                  >
                    {secondSelectOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                <Button
                  variant="contained"
                  color="white"
                  size="medium"
                  startIcon={<SearchIcon />}
                  onClick={handleSearch}
                  className="md:mt-0 w-full md:w-auto"
                >
                  Buscar
                </Button>
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

export default Billing;
