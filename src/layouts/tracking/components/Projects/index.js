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
  const apiUrl = `https://api.logisticacastrofallas.com/api/LoginTracking/${searchOption}?${searchOption}=${searchText}`;

  const handleSearch = async () => {
    try {
      const response = await axios.get(apiUrl);
      setSearchResults(response.data.data.value || []);
    } catch (error) {
      console.error("Error fetching data:", error);
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
          date: "Confirmacion de Arribo",
          label: `ENTREGA: ${formatDate(result.new_eta) || ""}`,
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
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString("es-ES", options);
    return formattedDate;
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

        {searchResults.map((result, index) => (
          <Box key={index} sx={{ marginBottom: 4 }}>
            <Typography variant="h6">IDTRA:</Typography>
            <Typography>{result.title}</Typography>
            <Typography variant="h6">BL:</Typography>
            <Typography>{result.new_bcf}</Typography>
            <Typography variant="h6">#CONTENEDOR:</Typography>
            <Typography>{result.new_contenedor}</Typography>
            <Typography variant="h6">PO:</Typography>
            <Typography>{result.new_po}</Typography>
            <Typography variant="h6">#FACTURA:</Typography>
            <Typography>{result.new_factura}</Typography>
            <Typography variant="h6">SHIPPER:</Typography>
            <Typography>{result._new_shipper_value}</Typography>
            <Typography variant="h6">STATUS:</Typography>
            <Typography>{getStatusName(result.new_preestado2)}</Typography>
            <Typography variant="h6">STATUS CLIENTE:</Typography>
            <Typography>{result.new_statuscliente}</Typography>
            <Typography variant="h6">FECHA MODIFICACIÓN:</Typography>
            <Typography>{formatDate(result.modifiedon)}</Typography>
            <Typography variant="h6">ORIGEN:</Typography>
            <Typography>{getOrigenName(result.new_origen)}</Typography>
            <Typography variant="h6">DESTINO:</Typography>
            <Typography>{getDestinoName(result.new_destino)}</Typography>
            <Typography variant="h6">TRANSPORTE:</Typography>
            <Typography>{getTransporteName(result.new_transporte)}</Typography>
            <Typography variant="h6">CANTIDAD DE BULTOS:</Typography>
            <Typography>{result.new_contidadbultos}</Typography>
            <Typography variant="h6">COMMODITY:</Typography>
            <Typography>{result.new_commodity}</Typography>
            <Typography variant="h6">PESO BRUTO:</Typography>
            <Typography>{result.new_peso}</Typography>

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
      </CardContent>
    </Card>
  );
};

export default TrackingForm;
