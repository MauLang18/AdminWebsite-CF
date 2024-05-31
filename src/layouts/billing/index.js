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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [steps]);

  useEffect(() => {
    switch (activeStep) {
      case 0:
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
          "Puerto Moin, CRC",
          "Puerto Caldera, CRC",
        ]);
        break;
      case 1:
        setSecondSelectOptions([
          "CFZ, Panama",
          "SJO, CRC",
          "Ciudad Guatemala, Guatemala",
          "San Pedro Sula, Honduras",
          "San Salvador, El Salvador",
          "Managua, Nicaragua",
          "Newark (New Jersey), USA",
          "Los Angeles (California), USA",
          "Port Everglades (Florida), USA",
          "Savannah (Georgia), USA",
          "Wilmington (North Carolina), USA",
          "Houston (Texas), USA",
        ]);
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
  }, [activeStep]);

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
                            variant="standard"
                            size="medium"
                            className="mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
                          >
                            {secondSelectOptions.map((option, i) => (
                              <MenuItem key={i} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                          <Box sx={{ mt: 2 }}>
                            <Button
                              variant="contained"
                              color="white"
                              size="medium"
                              onClick={handleNext}
                              style={{
                                display: activeStep === steps.length - 1 ? "none" : "inline-block",
                              }}
                              sx={{ ml: 2, backgroundColor: "black" }}
                            >
                              Siguiente
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="white"
                      size="medium"
                      onClick={handleResetFilters}
                      sx={{ ml: 2, backgroundColor: "black" }}
                    >
                      Reiniciar filtros
                    </Button>
                  </Box>
                </Box>
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
