import React, { useState, useEffect } from "react";
import axios from "axios";
import MDTypography from "components/MDTypography";

// Estilo para el modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

export default function MyComponent() {
  const [apiData, setApiData] = useState([]); // Datos de la API
  const [modalOpen, setModalOpen] = useState(false); // Controla la visibilidad del modal
  const [selectedLink, setSelectedLink] = useState(""); // Enlace seleccionado para el modal
  const [loading, setLoading] = useState(true); // Indica si la API está cargando
  const [error, setError] = useState(null); // Almacena errores si ocurren

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = JSON.parse(localStorage.getItem("users"));
        if (!user)
          throw new Error(
            "No se encontraron datos del usuario en localStorage"
          );

        const { name } = user;

        const response = await axios.get(
          `https://api.logisticacastrofallas.com/api/Cotizacion?numFilter=3&textFilter=${name}`
        );

        const filteredData =
          response?.data?.data?.value?.filter((item) => item.new_clienteweb) ||
          [];

        setApiData(filteredData); // Asegurarte de que sea un array

        await axios.post(
          "https://api.logisticacastrofallas.com/api/Logs/Register",
          {
            Usuario: `${user.family_name} / ${user.email} / ${user.acr}`,
            Modulo: "Cotizaciones",
            TipoMetodo: "Busqueda",
            Parametros: "",
            Estado: 1,
          }
        );
      } catch (err) {
        console.error("Error al obtener los datos:", err);
        setError(err.message);

        // Manejo de errores
        const user = JSON.parse(localStorage.getItem("users")) || {};
        await axios.post(
          "https://api.logisticacastrofallas.com/api/Logs/Register",
          {
            Usuario: `${user.family_name || "Desconocido"} / ${
              user.email || "Desconocido"
            } / ${user.acr || "Desconocido"}`,
            Modulo: "Cotizaciones",
            TipoMetodo: "Busqueda",
            Parametros: "",
            Estado: 0,
          }
        );

        setApiData([]); // Evitar errores al mapear
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (link) => {
    setSelectedLink(link);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLink("");
  };

  return {
    columns: [
      { Header: "ID INTERNO", accessor: "idtra", align: "center" },
      { Header: "CLIENTE", accessor: "nombreCliente", align: "center" },
      {
        Header: "COTIZACION",
        accessor: "tipoExoneracion",
        align: "center",
      },
    ],

    rows: apiData.map((rowData) => ({
      idtra: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.quotenumber}
        </MDTypography>
      ),
      nombreCliente: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData._customerid_value}
        </MDTypography>
      ),
      tipoExoneracion: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          <a href={rowData.new_enlacecotizacion}>SOLICITUD</a>
        </MDTypography>
      ),
    })),
  };
}
