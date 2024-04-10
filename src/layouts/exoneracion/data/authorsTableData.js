import React, { useState, useEffect } from "react";
import MDTypography from "components/MDTypography";
import axios from "axios";
import Avatars from "../../billing/data/Avatars";

// Agrega las importaciones de las otras imágenes aquí

export default function MyComponent() {
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

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getDescriptionContent = (rowData) => {
    if (showFullDescription) {
      return rowData.descripcion;
    } else {
      const firstWords = rowData.descripcion.split(" ").slice(0, 10).join(" ");
      return (
        <div>
          {firstWords}
          <button onClick={toggleDescription}>Ver más</button>
        </div>
      );
    }
  };

  return {
    columns: [
      { Header: "ID INTERNO", accessor: "idtra", align: "center" },
      { Header: "CLIENTE", accessor: "nombreCliente", align: "center" },
      { Header: "TIPO EXONERACION", accessor: "tipoExoneracion", align: "center" },
      { Header: "STATUS", accessor: "statusExoneracion", align: "center" },
      { Header: "PRODUCTO", accessor: "producto", align: "center" },
      { Header: "CATEGORIA", accessor: "categoria", align: "center" },
      {
        Header: "CLASIFICACION ARANCELARIA",
        accessor: "clasificacionArancelaria",
        align: "center",
      },
      { Header: "# SOLICITUD", accessor: "numeroSolicitud", align: "center" },
      { Header: "SOLICITUD", accessor: "solicitud", align: "center" },
      { Header: "# AUTORIZACION", accessor: "numeroAutorizacion", align: "center" },
      { Header: "AUTORIZACION", accessor: "autorizacion", align: "center" },
      { Header: "VALIDA DESDE", accessor: "desde", align: "center" },
      { Header: "VALIDA HASTA", accessor: "hasta", align: "center" },
      { Header: "DESCRIPCION", accessor: "descripcion", align: "center" },
    ],

    rows: apiData.map((rowData) => ({
      idtra: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.idtra}
        </MDTypography>
      ),
      nombreCliente: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.nombreCliente}
        </MDTypography>
      ),
      tipoExoneracion: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.tipoExoneracion}
        </MDTypography>
      ),
      statusExoneracion: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.statusExoneracion}
        </MDTypography>
      ),
      producto: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.producto}
        </MDTypography>
      ),
      categoria: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.categoria}
        </MDTypography>
      ),
      clasificacionArancelaria: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.clasificacionArancelaria}
        </MDTypography>
      ),
      numeroSolicitud: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.numeroSolicitud}
        </MDTypography>
      ),
      solicitud: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          <a href={rowData.solicitud}>SOLICITUD</a>
        </MDTypography>
      ),
      numeroAutorizacion: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.numeroAutorizacion}
        </MDTypography>
      ),
      autorizacion: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          <a href={rowData.autorizacion}>AUTORIZACION</a>
        </MDTypography>
      ),
      desde: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {formatDate(rowData.desde)}
        </MDTypography>
      ),
      hasta: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {formatDate(rowData.hasta)}
        </MDTypography>
      ),
      descripcion: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {getDescriptionContent(rowData)}
        </MDTypography>
      ),
    })),
  };
}
