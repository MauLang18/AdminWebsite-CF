import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import poeMapping from "layouts/tracking/components/Projects/data/json/poe.json";
import polMapping from "layouts/tracking/components/Projects/data/json/pol.json";
import destinoMapping from "layouts/tracking/components/Projects/data/json/destino.json";
import origenMapping from "layouts/tracking/components/Projects/data/json/origen.json";
import transporteMapping from "layouts/tracking/components/Projects/data/json/transporte.json";
import statusMapping from "layouts/tracking/components/Projects/data/json/status.json";
import axios from "axios";

const TrackingForm = () => {
  const [searchOption, setSearchOption] = useState("IDTRA");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([{}]);
  const [timelineData, setTimelineData] = useState([{}]);
  const user = JSON.parse(localStorage.getItem("users"));
  const { name, email, acr, family_name } = user ? user.name : "";
  const apiUrl = `https://api.logisticacastrofallas.com/api/LoginTracking/${searchOption}?${searchOption}=${searchText}&cliente=${name}`;

  const handleSearch = async () => {
    try {
      const response = await axios.get(apiUrl);
      setSearchResults(response.data.data.value || []);

      // Logging request for success
      await axios.post("https://api.logisticacastrofallas.com/api/Logs/Register", {
        Usuario: `${family_name} / ${email} / ${acr}`,
        Modulo: "Tracking",
        TipoMetodo: "Busqueda",
        Parametros: JSON.stringify({ searchOption, searchText }),
        Estado: 1,
      });
    } catch (error) {
      console.error("Error fetching data:", error);

      // Log the error
      await axios.post("https://api.logisticacastrofallas.com/api/Logs/Register", {
        Usuario: `${family_name} / ${email} / ${acr}`,
        Modulo: "Tracking",
        TipoMetodo: "Busqueda",
        Parametros: JSON.stringify({ searchOption, searchText }),
        Estado: 0,
      });
    }
  };

  useEffect(() => {
    fetchTimelineData();
  }, [searchResults]);

  const fetchTimelineData = () => {
    var timeline = [];

    searchResults.forEach((result, index) => {
      timeline.push(
        {
          date: "ETD",
          label: `ETD: ${formatDate(result.new_etd1) || ""}`,
          description: `POL: ${getPolName(result.new_pol) || ""}`,
        },
        {
          date: "Confirmación Zarpe",
          label: `BUQUE: ${result.new_barcodesalida || ""}`,
          description: `ZARPE: ${formatDate(result.new_confirmacinzarpe) || ""}`,
        },
        {
          date: "Notif. Aviso Arribo",
          label: `ARRIBO: ${formatDate(result.new_instcliente) || ""}`,
        },
        {
          date: "ETA",
          label: `ETA: ${formatDate(result.new_eta) || ""}`,
          description: `POE: ${getPoeName(result.new_poe) || ""}`,
        },
        {
          date: "ETA DESTINO",
          label: `ETA: ${formatDate(result.new_etadestino) || ""}`,
          description: `POD: ${getDestinoName(result.new_destino) || ""}`,
        },
        {
          date: "Confirmacion de Arribo",
          label: `OFICIALIZACION: ${formatDateTime(result.new_fechayhoraoficializacion) || ""}`,
        },
        {
          date: "ENTREGA",
          label: `ENTREGA: ${
            result.new_ingreso
              ? formatDate(result.new_ingreso)
              : result.new_ingresoabodegas
              ? formatDate(result.new_ingresoabodegas)
              : ""
          }`,
        }
      );
    });

    setTimelineData(timeline);
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

  const getPoeName = (poe) => {
    return poeMapping[poe] || "";
  };

  const getPolName = (pol) => {
    return polMapping[pol] || "";
  };

  const getStatusName = (pol) => {
    return statusMapping[pol] || "";
  };

  const getTransporteName = (pol) => {
    return transporteMapping[pol] || "";
  };

  const getDestinoName = (pol) => {
    return destinoMapping[pol] || "";
  };

  const getOrigenName = (pol) => {
    return origenMapping[pol] || "";
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h6">Elige una opción de búsqueda</Typography>
          <Select
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value)}
            fullWidth
            sx={{ marginTop: 1 }}
          >
            <MenuItem value="IDTRA">IDTRA</MenuItem>
            <MenuItem value="CONTENEDOR">#CONTENEDOR</MenuItem>
            <MenuItem value="BCF">BCF</MenuItem>
            <MenuItem value="PO">PO</MenuItem>
          </Select>
        </Box>

        <TextField
          label="Agrega el dato"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          color="primary"
          fullWidth
          sx={{
            backgroundColor: "#000", // Fondo negro
            color: "#fff", // Letras blancas
            marginBottom: 2,
          }}
        >
          Buscar
        </Button>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {searchResults.map((result, index) => (
            <Box key={index} sx={{ display: "grid", gap: 1 }}>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1 }}>
                <Typography variant="h6">IDTRA:</Typography>
                <Typography variant="h6">BL:</Typography>
                <Typography variant="h6">#CONTENEDOR:</Typography>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1 }}>
                <Typography>{result.title}</Typography>
                <Typography>{result.new_bcf}</Typography>
                <Typography>{result.new_contenedor}</Typography>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                <Typography variant="h6">PO:</Typography>
                <Typography variant="h6">#FACTURA:</Typography>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                <Typography>{result.new_po}</Typography>
                <Typography>{result.new_factura}</Typography>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                <Typography variant="h6">SHIPPER:</Typography>
                <Typography variant="h6">STATUS:</Typography>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                <Typography>{result._new_shipper_value}</Typography>
                <Typography>{getStatusName(result.new_preestado2)}</Typography>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                <Typography variant="h6">ULTIMO STATUS:</Typography>
                <Typography variant="h6">FECHA ACTUALIZACION:</Typography>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                <Typography>{result.new_statuscliente}</Typography>
                <Typography>{formatDate(result.modifiedon)}</Typography>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 1 }}>
                <Typography variant="h6">ORIGEN:</Typography>
                <Typography variant="h6">DESTINO:</Typography>
                <Typography variant="h6">PESO:</Typography>
                <Typography variant="h6">TRANSPORTE:</Typography>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 1 }}>
                <Typography>{getOrigenName(result.new_origen)}</Typography>
                <Typography>{getDestinoName(result.new_destino)}</Typography>
                <Typography>{result.new_peso}</Typography>
                <Typography>{getTransporteName(result.new_transporte)}</Typography>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                <Typography variant="h6">COMMODITY:</Typography>
                <Typography variant="h6">CANTIDAD DE BULTOS:</Typography>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                <Typography>{result.new_commodity}</Typography>
                <Typography>{result.new_contidadbultos}</Typography>
              </Box>

              <Timeline>
                {timelineData.map((event, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent color="textSecondary">
                      {event.date}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography>{event.label}</Typography>
                      <Typography>{event.description}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrackingForm;
