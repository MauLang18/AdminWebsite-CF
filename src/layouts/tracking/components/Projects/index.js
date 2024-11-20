import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Grid,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BusinessIcon from "@mui/icons-material/Business";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import poeMapping from "./data/json/poe.json";
import polMapping from "./data/json/pol.json";
import destinoMapping from "./data/json/destino.json";
import origenMapping from "./data/json/origen.json";
import statusMapping from "./data/json/status.json";

const TrackingForm = () => {
  const [searchOption, setSearchOption] = useState("IDTRA");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [progress, setProgress] = useState({});
  const user = JSON.parse(localStorage.getItem("users"));
  const { name } = user;

  const apiUrl = `https://api.logisticacastrofallas.com/api/LoginTracking/${searchOption}?${searchOption}=${searchText}&cliente=${name}`;

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl);
      setSearchResults(response.data.data.value || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const progressStates = [
    { label: "Salida de Origen", icon: <BusinessIcon />, key: "salidaOrigen" },
    { label: "En Tránsito", icon: <DirectionsBoatIcon />, key: "enTransito" },
    {
      label: "Llegada al Destino",
      icon: <LocalShippingIcon />,
      key: "llegadaDestino",
    },
    {
      label: "Entrega Finalizada",
      icon: <CheckCircleIcon />,
      key: "entregaFinalizada",
    },
  ];

  const prestados = {
    100000001: ["salidaOrigen"],
    100000002: ["enTransito"],
    100000004: ["llegadaDestino"],
    100000008: ["entregaFinalizada"],
  };

  const getProgress = (states) => {
    let progress = 0;
    if (states.includes("salidaOrigen")) progress = 25;
    if (states.includes("enTransito")) progress = 50;
    if (states.includes("llegadaDestino")) progress = 75;
    if (states.includes("entregaFinalizada")) progress = 100;
    return progress;
  };

  const getStepColor = (stepIndex, currentStep) => {
    if (stepIndex < currentStep) return "green";
    if (stepIndex === currentStep) return "blue";
    return "gray";
  };

  const getPoeName = (poe) => {
    return poeMapping[poe] || "";
  };

  const getPolName = (pol) => {
    return polMapping[pol] || "";
  };

  const getDestinoName = (destino) => {
    return destinoMapping[destino] || "";
  };

  const getOrigenName = (origen) => {
    return origenMapping[origen] || "";
  };

  const getStatusName = (status) => {
    return statusMapping[status] || "";
  };

  return (
    <Card sx={{ padding: 4 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Tracking System
      </Typography>

      <Box sx={{ display: "flex", gap: 2, marginBottom: 4 }}>
        <Select
          value={searchOption}
          onChange={(e) => setSearchOption(e.target.value)}
          fullWidth
        >
          <MenuItem value="IDTRA">IDTRA</MenuItem>
          <MenuItem value="CONTENEDOR">#CONTENEDOR</MenuItem>
          <MenuItem value="BCF">BCF</MenuItem>
          <MenuItem value="PO">PO</MenuItem>
          <MenuItem value="BOOKING">BOOKING</MenuItem>
        </Select>

        <TextField
          label="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ backgroundColor: "#000", color: "#fff" }}
        >
          Search
        </Button>
      </Box>

      {loading && (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      )}

      {searchResults &&
        searchResults.map((result, index) => {
          const progressStatesForResult =
            prestados[result.new_preestado2] || [];
          const currentProgress = getProgress(progressStatesForResult);

          return (
            <Card key={index} sx={{ padding: 4, marginBottom: 4 }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Tracking Details: {result.title}
              </Typography>

              <Box sx={{ marginBottom: 4 }}>
                <Stepper alternativeLabel activeStep={currentProgress / 25}>
                  {progressStates.map((state, i) => (
                    <Step key={i}>
                      <StepLabel
                        icon={state.icon}
                        sx={{
                          color: getStepColor(i, currentProgress / 25),
                          "& .MuiStepLabel-icon": {
                            color: getStepColor(i, currentProgress / 25),
                          },
                        }}
                      >
                        {state.label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              {/* Sección 1: Información de Booking, IDTRA, PO, Seal, Factura, Contenedor, BCF */}
              <Box
                sx={{ marginBottom: 3, backgroundColor: "#f5f5f5", padding: 2 }}
              >
                <Typography variant="h6">Información de Tracking</Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">IDTRA</Typography>
                  <Typography>{result.title || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">Contenedor</Typography>
                  <Typography>{result.new_contenedor || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">BCF</Typography>
                  <Typography>{result.new_bcf || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">Booking</Typography>
                  <Typography>{result.new_booking || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">PO</Typography>
                  <Typography>{result.new_po || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">Seal</Typography>
                  <Typography>{result.new_seal || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">Factura</Typography>
                  <Typography>{result.new_factura || "N/A"}</Typography>
                </Grid>
              </Grid>

              {/* Sección 2: Información del Origen, POL, POE, Destino, ETA, ETD */}
              <Box
                sx={{ marginBottom: 3, backgroundColor: "#f5f5f5", padding: 2 }}
              >
                <Typography variant="h6">
                  Información de Origen y Destino
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">Origen</Typography>
                  <Typography>
                    {getOrigenName(result.new_origen) || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">POL</Typography>
                  <Typography>{getPolName(result.new_pol) || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">ETD</Typography>
                  <Typography>
                    {result.new_etd1
                      ? new Date(result.new_etd1).toLocaleString("es-ES")
                      : "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">Destino</Typography>
                  <Typography>
                    {getDestinoName(result.new_destino) || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">POE</Typography>
                  <Typography>{getPoeName(result.new_poe) || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">ETE</Typography>
                  <Typography>
                    {result.new_eta
                      ? new Date(result.new_eta).toLocaleString("es-ES")
                      : "N/A"}
                  </Typography>
                </Grid>
              </Grid>

              {/* Sección 3: Información de Carga - Peso, Commodity, Bultos */}
              <Box
                sx={{ marginBottom: 3, backgroundColor: "#f5f5f5", padding: 2 }}
              >
                <Typography variant="h6">Información de Carga</Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">Commodity</Typography>
                  <Typography>{result.new_commodity || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">Cantidad Bultos</Typography>
                  <Typography>{result.new_contidadbultos || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">Peso</Typography>
                  <Typography>{result.new_peso || "N/A"}</Typography>
                </Grid>
              </Grid>

              {/* Sección 4: Estado */}
              <Box
                sx={{ marginBottom: 3, backgroundColor: "#f5f5f5", padding: 2 }}
              >
                <Typography variant="h6">Estado del Tracking</Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Estado</Typography>
                  <Typography>{result.new_statuscliente || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Preestado</Typography>
                  <Typography>
                    {getStatusName(result.new_preestado2) || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          );
        })}
    </Card>
  );
};

export default TrackingForm;
