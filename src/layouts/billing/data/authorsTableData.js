import React, { useState, useEffect } from "react";
import MDTypography from "components/MDTypography";
import axios from "axios";

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
          `https://api.logisticacastrofallas.com/api/Itinerario`
        );
        setApiData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  return {
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

    rows: apiData.map((rowData) => ({
      origen: <img src={rowData.origen} alt="origen" />,
      pol: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.pol}
        </MDTypography>
      ),
      destino: <img src={rowData.destino} alt="destino" />,
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
    })),
  };
}
