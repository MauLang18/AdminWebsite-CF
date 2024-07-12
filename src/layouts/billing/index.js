import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

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
import Avatars from "../billing/data/Avatars";

function Billing() {
  const user = JSON.parse(localStorage.getItem("users"));
  const { acr, email, family_name } = user;
  const { columns } = authorsTableData();
  const [rows, setRows] = useState([]);
  const [transportMode, setTransportMode] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [pol, setPol] = useState("");
  const [pod, setPod] = useState("");
  const [polOptions, setPolOptions] = useState([]);
  const [podOptions, setPodOptions] = useState([]);

  const handleTransportChange = (event) => {
    const selectedTransport = event.target.value;
    const [transporte, mod] = selectedTransport.split(" ");
    setTransportMode(transporte);
    setModalidad(mod);
  };

  const handlePolChange = (event, value) => {
    setPol(value);
  };

  const handlePodChange = (event, value) => {
    setPod(value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.logisticacastrofallas.com/api/Itinerario?polFilter=${pol}&poeFilter=${pod}&transporteFilter=${transportMode}&modalidadFilter=${modalidad}`
      );
      const newRows = response.data.data
        .filter((rowData) => rowData.estado === 1)
        .map((rowData) => ({
          origen: (
            <Avatars
              members={[rowData.origen].map((image, index) => [
                image,
                `Image ${index + 1}`,
              ])}
            />
          ),
          pol: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {rowData.pol}
            </MDTypography>
          ),
          destino: (
            <Avatars
              members={[rowData.destino].map((image, index) => [
                image,
                `Image ${index + 1}`,
              ])}
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

      // Logging request
      await axios.post(
        "https://api.logisticacastrofallas.com/api/Logs/Register",
        {
          Usuario: `${family_name} / ${email} / ${acr}`,
          Modulo: "Itinerario",
          TipoMetodo: "Busqueda",
          Parametros: JSON.stringify({
            pol,
            pod,
            transportMode,
            modalidad,
          }),
          Estado: 1,
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);

      // Log the error
      await axios.post(
        "https://api.logisticacastrofallas.com/api/Logs/Register",
        {
          Usuario: `${family_name} / ${email} / ${acr}`,
          Modulo: "Itinerario",
          TipoMetodo: "Busqueda",
          Parametros: JSON.stringify({
            pol,
            pod,
            transportMode,
            modalidad,
          }),
          Estado: 0,
        }
      );
    }
  };

  const fetchPolPodOptions = async () => {
    try {
      const response = await axios.get(
        "https://api.logisticacastrofallas.com/api/Pol/Select"
      );
      const options = response.data.data.map((option) => option.description);
      setPolOptions(options);
      setPodOptions(options);
    } catch (error) {
      console.error("Error fetching POL/POD options:", error);
    }
  };

  useEffect(() => {
    fetchPolPodOptions();
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
                <MDTypography variant="h6" color="white">
                  Itinerarios
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={3}>
                <RadioGroup
                  row
                  value={`${transportMode} ${modalidad}`}
                  onChange={handleTransportChange}
                >
                  <FormControlLabel
                    value="maritimo LCL"
                    control={<Radio />}
                    label="Ocean LCL"
                  />
                  <FormControlLabel
                    value="maritimo FCL"
                    control={<Radio />}
                    label="Ocean FCL"
                  />
                  <FormControlLabel
                    value="aereo LCL"
                    control={<Radio />}
                    label="Air Freight"
                  />
                  <FormControlLabel
                    value="terrestre LTL"
                    control={<Radio />}
                    label="Ground LTL"
                  />
                  <FormControlLabel
                    value="terrestre FTL"
                    control={<Radio />}
                    label="Ground FTL"
                  />
                </RadioGroup>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6}>
                    <Autocomplete
                      options={polOptions}
                      getOptionLabel={(option) => option}
                      onChange={handlePolChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="POL"
                          variant="outlined"
                          fullWidth
                          sx={{ color: "black" }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      options={podOptions}
                      getOptionLabel={(option) => option}
                      onChange={handlePodChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="POD"
                          variant="outlined"
                          fullWidth
                          sx={{ color: "black" }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="black"
                  onClick={handleSearch}
                  startIcon={<SearchIcon />}
                  sx={{ mt: 3 }}
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

function formatDate(dateString) {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", options);
}
