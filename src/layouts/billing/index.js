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

function Billing() {
  const { columns } = authorsTableData();
  const [rows, setRows] = useState([]);
  const [numFilter, setNumFilter] = useState(0); // Valor inicial del combobox
  const [textFilter, setTextFilter] = useState(""); // Valor inicial del campo de texto

  const [secondSelectOptions, setSecondSelectOptions] = useState([]);

  const handleNumFilterChange = (event) => {
    setNumFilter(event.target.value);
    // Resetear el valor del segundo select al cambiar el filtro
    setTextFilter("");
  };

  const handleTextFilterChange = (event) => {
    setTextFilter(event.target.value);
  };

  const handleSearch = async () => {
    try {
      var response;
      if (numFilter === 0 && textFilter === "") {
        response = await axios.get(`https://api.logisticacastrofallas.com/api/Itinerario`);
      } else {
        response = await axios.get(
          `https://api.logisticacastrofallas.com/api/Itinerario?NumFilter=${numFilter}&TextFilter=${textFilter}`
        );
      }

      setRows(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Realizar la solicitud inicial al cargar el componente
    handleSearch();
  }, []); // Se ejecutará solo una vez al montar el componente

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
      ]);
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
