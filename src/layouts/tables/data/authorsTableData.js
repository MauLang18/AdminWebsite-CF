import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import axios from "axios"; // Importar axios para hacer llamadas a la API
import poeMapping from "../data/json/poe.json";
import polMapping from "../data/json/pol.json";
import destinoMapping from "../data/json/destino.json";
import origenMapping from "../data/json/origen.json";
import transporteMapping from "../data/json/transporte.json";
import statusMapping from "../data/json/status.json";
import incotermMapping from "../data/json/incoterm.json";
import cantEquipoMapping from "../data/json/cantEquipo.json";
import tamanoEquipoMapping from "../data/json/tamanoEquipo.json";

// Agrega las importaciones de las otras imágenes aquí

export default function MyComponent() {
  const [apiData, setApiData] = useState([]); // Estado para almacenar los datos de la API

  const user = JSON.parse(localStorage.getItem("users"));
  const { name } = user;

  useEffect(() => {
    // Llamada a la API al montar el componente
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.logisticacastrofallas.com/api/TrackingLogin/Activo?cliente=${name}`
        );
        setApiData(response.data.data.value);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  const getDestinoName = (destino) => {
    return destinoMapping[destino] || "";
  };

  const getOrigenName = (origen) => {
    return origenMapping[origen] || "";
  };

  const getTransporteName = (transporte) => {
    return transporteMapping[transporte] || "";
  };

  const getStatusName = (status) => {
    return statusMapping[status] || "";
  };

  const getIncotermName = (incoterm) => {
    return incotermMapping[incoterm] || "";
  };

  const getCantEquipoName = (cantEquipo) => {
    return cantEquipoMapping[cantEquipo] || "";
  };

  const getTamanoEquipoName = (tamanoEquipo) => {
    return tamanoEquipoMapping[tamanoEquipo] || "";
  };

  return {
    columns: [
      { Header: "IDTRA", accessor: "IDTRA", align: "center" },
      { Header: "CONTENEDOR", accessor: "CONTENEDOR", align: "center" },
      { Header: "BCF", accessor: "BCF", align: "center" },
      { Header: "PO", accessor: "PO", align: "center" },
      { Header: "Estado", accessor: "estado", align: "center" },
      { Header: "Status cliente", accessor: "status", align: "center" },
      { Header: "Modificado", accessor: "employed", align: "center" },
      { Header: "Origen", accessor: "origen", align: "center" },
      { Header: "Destino", accessor: "destino", align: "center" },
      { Header: "Dias de transito", accessor: "diaTransito", align: "center" },
      { Header: "ETD", accessor: "ETD", align: "center" },
      { Header: "POL", accessor: "POL", align: "center" },
      { Header: "Confirmacion de Zarpe", accessor: "confZarpe", align: "center" },
      { Header: "Buque", accessor: "buque", align: "center" },
      { Header: "Viaje", accessor: "viaje", align: "center" },
      { Header: "ETA", accessor: "ETA", align: "center" },
      { Header: "POE", accessor: "POE", align: "center" },
      { Header: "INCOTERM", accessor: "incoterm", align: "center" },
      { Header: "TRANSPORTE", accessor: "transporte", align: "center" },
      { Header: "SEAL", accessor: "seal", align: "center" },
      { Header: "# Factura", accessor: "factura", align: "center" },
      { Header: "Cant. Equipo", accessor: "cantEquipo", align: "center" },
      { Header: "Tamaño Equipo", accessor: "tamanoEquipo", align: "center" },
      { Header: "BULTOS", accessor: "bultos", align: "center" },
      { Header: "Shipper", accessor: "shipper", align: "center" },
      { Header: "Commodity", accessor: "commodity", align: "center" },
      { Header: "Tarifa Asignada", accessor: "tarifa", align: "center" },
      { Header: "Estimado Facturar", accessor: "costo", align: "center" },
      { Header: "Facturas CF", accessor: "facturasCf", align: "center" },
    ],

    rows: apiData.map((rowData) => ({
      IDTRA: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {rowData.title}
        </MDTypography>
      ),
      CONTENEDOR: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {rowData.new_contenedor}
        </MDTypography>
      ),
      BCF: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {rowData.new_bcf}
        </MDTypography>
      ),
      PO: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {rowData.new_po}
        </MDTypography>
      ),
      estado: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={getStatusName(rowData.new_preestado2)}
            color="success"
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      status: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {rowData.new_statuscliente}
        </MDTypography>
      ),
      employed: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {formatDate(rowData.modifiedon)}
        </MDTypography>
      ),
      origen: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {getOrigenName(rowData.new_origen)}
        </MDTypography>
      ),
      destino: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {getDestinoName(rowData.new_destino)}
        </MDTypography>
      ),
      diaTransito: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {rowData.new_diasdetransito}
        </MDTypography>
      ),
      ETD: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {formatDate(rowData.new_etd1)}
        </MDTypography>
      ),
      POL: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {getPolName(rowData.new_pol)}
        </MDTypography>
      ),
      confZarpe: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {formatDate(rowData.new_confirmacinzarpe)}
        </MDTypography>
      ),
      buque: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {rowData.new_barcodesalida}
        </MDTypography>
      ),
      viaje: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {rowData.new_viajedesalida}
        </MDTypography>
      ),
      ETA: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {formatDate(rowData.new_eta)}
        </MDTypography>
      ),
      POE: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {getPoeName(rowData.new_poe)}
        </MDTypography>
      ),
      incoterm: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {getIncotermName(rowData.new_incoterm)}
        </MDTypography>
      ),
      transporte: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {getTransporteName(rowData.new_transporte)}
        </MDTypography>
      ),
      seal: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {rowData.new_seal}
        </MDTypography>
      ),
      factura: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {rowData.new_factura}
        </MDTypography>
      ),
      cantEquipo: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {getCantEquipoName(rowData.new_cantequipo)}
        </MDTypography>
      ),
      tamanoEquipo: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {getTamanoEquipoName(rowData.new_tamaoequipo)}
        </MDTypography>
      ),
      bultos: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {rowData.new_contidadbultos}
        </MDTypography>
      ),
      shipper: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {rowData._new_shipper_value}
        </MDTypography>
      ),
      commodity: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {rowData.new_commodity}
        </MDTypography>
      ),
      tarifa: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {rowData.new_ofertatarifaid}
        </MDTypography>
      ),
      costo: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {rowData.new_montocostoestimado}
        </MDTypography>
      ),
      facturasCf: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {rowData.new_new_facturacompaia}
        </MDTypography>
      ),
    })),
  };
}
