import React, { useState, useEffect } from "react";
import MDTypography from "components/MDTypography";
import axios from "axios";
import Avatars from "./Avatars";

// Agrega las importaciones de las otras imágenes aquí

export default function MyComponent(pol) {
  const [apiData, setApiData] = useState([]); // Estado para almacenar los datos de la API

  const user = JSON.parse(localStorage.getItem("users"));
  const { name } = user;

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

  return {
    columns: [
      { Header: "ID INTERNO", accessor: "idtra", align: "center" },
      { Header: "# WHS", accessor: "numeroWHS", align: "center" },
      { Header: "CLIENTE", accessor: "nombreCliente", align: "center" },
      { Header: "TIPO REGISTRO", accessor: "tipoRegistro", align: "center" },
      { Header: "FECHA REGISTRO", accessor: "fechaCreacionAuditoria", align: "center" },
      { Header: "PO", accessor: "po", align: "center" },
      { Header: "STATUS", accessor: "statusWHS", align: "center" },
      { Header: "POL", accessor: "pol", align: "center" },
      { Header: "POD", accessor: "pod", align: "center" },
      { Header: "CANT. BULTOS", accessor: "cantidadBultos", align: "center" },
      { Header: "TIPO BULTOS", accessor: "tipoBultos", align: "center" },
      { Header: "VINCULADO", accessor: "vinculacionOtroRegistro", align: "center" },
      { Header: "WHS Receipt", accessor: "whsReceipt", align: "center" },
      { Header: "Documentación Registro", accessor: "documentoregistro", align: "center" },
      { Header: "IMAGENES", accessor: "imagen", align: "center" },
      { Header: "DETALLE", accessor: "detalle", align: "center" },
    ],

    rows: apiData.map((rowData) => ({
      idtra: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.idtra}
        </MDTypography>
      ),
      numeroWHS: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.numeroWHS}
        </MDTypography>
      ),
      nombreCliente: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.nombreCliente}
        </MDTypography>
      ),
      tipoRegistro: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.tipoRegistro}
        </MDTypography>
      ),
      fechaCreacionAuditoria: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {formatDateTime(rowData.fechaCreacionAuditoria)}
        </MDTypography>
      ),
      po: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.po}
        </MDTypography>
      ),
      statusWHS: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.statusWHS}
        </MDTypography>
      ),
      pol: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.pol}
        </MDTypography>
      ),
      pod: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.pod}
        </MDTypography>
      ),
      detalle: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.detalle}
        </MDTypography>
      ),
      cantidadBultos: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.cantidadBultos}
        </MDTypography>
      ),
      tipoBultos: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.tipoBultos}
        </MDTypography>
      ),
      vinculacionOtroRegistro: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.vinculacionOtroRegistro}
        </MDTypography>
      ),
      whsReceipt: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          <a href={rowData.whsReceipt}>WHS Receipt</a>
        </MDTypography>
      ),
      documentoregistro: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          <a href={rowData.documentoregistro}>Documentación Registro</a>
        </MDTypography>
      ),
      imagen: (
        <Avatars
          members={[
            rowData.imagen1,
            rowData.imagen2,
            rowData.imagen3,
            rowData.imagen4,
            rowData.imagen5,
          ].map((image, index) => [image, `Image ${index + 1}`])}
        />
      ),
    })),
  };
}
