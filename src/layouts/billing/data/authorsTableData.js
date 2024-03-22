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
        const response = await axios.get(`https://api.logisticacastrofallas.com/api/Itinerario`);
        console.log(response.data);
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
      { Header: "POL", accessor: "pol", align: "center" },
      { Header: "POD", accessor: "pod", align: "center" },
      { Header: "Closing", accessor: "closing", align: "center" },
      { Header: "ETD", accessor: "etd", align: "center" },
      { Header: "ETA", accessor: "eta", align: "center" },
      { Header: "Carrier", accessor: "carrier", align: "center" },
      { Header: "Vessel", accessor: "vessel", align: "center" },
      { Header: "Voyage", accessor: "voyage", align: "center" },
    ],

    rows: apiData.map((rowData) => ({
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
    })),
  };
}
