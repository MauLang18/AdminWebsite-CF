import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
  const user = JSON.parse(localStorage.getItem("users"));
  const { acr, email, family_name } = user;
  const { columns } = authorsTableData();
  const [rows, setRows] = useState([]);
  const [steps, setSteps] = useState([
    { label: "POL", state: "" },
    { label: "POD", state: "" },
    { label: "Transporte", state: "" },
    { label: "Modalidad", state: "" },
  ]);
  const [activeStep, setActiveStep] = useState(0);
  const [secondSelectOptions, setSecondSelectOptions] = useState([]);
  const [polOptions, setPolOptions] = useState([]);
  const [podOptions, setPodOptions] = useState([]);

  const handleSelectChange = (value) => {
    const newSteps = [...steps];
    newSteps[activeStep].state = value;
    setSteps(newSteps);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleResetFilters = () => {
    setSteps([
      { label: "POL", state: "" },
      { label: "POD", state: "" },
      { label: "Transporte", state: "" },
      { label: "Modalidad", state: "" },
    ]);
    setActiveStep(0);
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return dateString ? new Date(dateString).toLocaleDateString("es-ES", options) : "";
  };

  const handleSearch = async () => {
    try {
      const polFilter = steps[0].state;
      const poeFilter = steps[1].state;
      const transporteFilter = steps[2].state;
      const modalidadFilter = steps[3].state;

      const response = await axios.get(
        `https://api.logisticacastrofallas.com/api/Itinerario?polFilter=${polFilter}&poeFilter=${poeFilter}&transporteFilter=${transporteFilter}&modalidadFilter=${modalidadFilter}`
      );
      const newRows = response.data.data
        .filter((rowData) => rowData.estado === 1)
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

      // Logging request
      await axios.post("https://api.logisticacastrofallas.com/api/Logs/Register", {
        Usuario: `${family_name} / ${email} / ${acr}`,
        Modulo: "Itinerario",
        TipoMetodo: "Busqueda",
        Parametros: JSON.stringify({ polFilter, poeFilter, transporteFilter, modalidadFilter }),
        Estado: 1,
      });
    } catch (error) {
      console.error("Error fetching data:", error);

      // Log the error
      await axios.post("https://api.logisticacastrofallas.com/api/Logs/Register", {
        Usuario: `${family_name} / ${email} / ${acr}`,
        Modulo: "Itinerario",
        TipoMetodo: "Busqueda",
        Parametros: JSON.stringify({ polFilter, poeFilter, transporteFilter, modalidadFilter }),
        Estado: 0,
      });
    }
  };

  const fetchPolPodOptions = async () => {
    try {
      const response = await axios.get("https://api.logisticacastrofallas.com/api/Pol/Select");
      const options = response.data.data.map((option) => ({
        value: option.id,
        label: option.description,
      }));
      setPolOptions(options);
      setPodOptions(options);
    } catch (error) {
      console.error("Error fetching POL/POD options:", error);
    }
  };

  useEffect(() => {
    fetchPolPodOptions();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [steps]);

  useEffect(() => {
    switch (activeStep) {
      case 0:
        setSecondSelectOptions(polOptions.map((option) => option.label));
        break;
      case 1:
        setSecondSelectOptions(podOptions.map((option) => option.label));
        break;
      case 2:
        setSecondSelectOptions(["Aereo", "Maritimo", "Terrestre"]);
        break;
      case 3:
        setSecondSelectOptions(["LCL", "LTL", "FCL", "FTL", "Multimodal"]);
        break;
      default:
        setSecondSelectOptions([]);
    }
  }, [activeStep, polOptions, podOptions]);

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
                <Box width="100%" display="flex" flexDirection="column" alignItems="center">
                  <Stepper
                    activeStep={activeStep}
                    orientation="horizontal"
                    style={{ width: "100%" }}
                  >
                    {steps.map((step, index) => (
                      <Step key={index}>
                        <StepLabel>{step.label}</StepLabel>
                        <StepContent>
                          <Select
                            value={step.state}
                            onChange={(e) => handleSelectChange(e.target.value)}
                            displayEmpty
                          >
                            <MenuItem value="">Seleccione una opción</MenuItem>
                            {secondSelectOptions.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      disabled={activeStep === steps.length - 1}
                      startIcon={<SearchIcon />}
                    >
                      {activeStep === steps.length - 1 ? "Buscar" : "Siguiente"}
                    </Button>
                  </Box>
                  <Button onClick={handleResetFilters} sx={{ mt: 1, mr: 1 }}>
                    Limpiar filtros
                  </Button>
                </Box>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "Origen", accessor: "origen", align: "center" },
                      { Header: "POL", accessor: "pol", align: "center" },
                      { Header: "Destino", accessor: "destino", align: "center" },
                      { Header: "POD", accessor: "pod", align: "center" },
                      { Header: "Closing", accessor: "closing", align: "center" },
                      { Header: "ETD", accessor: "etd", align: "center" },
                      { Header: "ETA", accessor: "eta", align: "center" },
                      { Header: "Carrier", accessor: "carrier", align: "center" },
                      { Header: "Vessel", accessor: "vessel", align: "center" },
                      { Header: "Voyage", accessor: "voyage", align: "center" },
                      { Header: "Transporte", accessor: "transporte", align: "center" },
                      { Header: "Modalidad", accessor: "modalidad", align: "center" },
                    ],
                    rows,
                  }}
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