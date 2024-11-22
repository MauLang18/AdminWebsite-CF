import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

  useEffect(() => {
    // Llamada a la API
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("users"));
        const { name, acr, email, family_name } = user;

        const response = await axios.get(
          `https://api.logisticacastrofallas.com/api/Cotizacion?numFilter=3&textFilter=${name}`
        );

        // Filtrar por new_clienteweb === true
        const filteredData = (response.data.data.value || []).filter(
          (item) => item.new_clienteweb === true
        );

        setApiData(filteredData);

        // Registro del log en caso de éxito
        await axios.post(
          "https://api.logisticacastrofallas.com/api/Logs/Register",
          {
            Usuario: `${family_name} / ${email} / ${acr}`,
            Modulo: "Cotizaciones",
            TipoMetodo: "Busqueda",
            Parametros: "",
            Estado: 1,
          }
        );
      } catch (error) {
        console.error("Error al obtener los datos:", error);

        // Registro del log en caso de error
        await axios.post(
          "https://api.logisticacastrofallas.com/api/Logs/Register",
          {
            Usuario: `${family_name} / ${email} / ${acr}`,
            Modulo: "Cotizaciones",
            TipoMetodo: "Busqueda",
            Parametros: "",
            Estado: 0,
          }
        );
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

  return (
    <>
      {/* Tabla */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID INTERNO</TableCell>
              <TableCell align="center">CLIENTE</TableCell>
              <TableCell align="center">COTIZACIÓN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{row.quotenumber}</TableCell>
                <TableCell align="center">{row._customerid_value}</TableCell>
                <TableCell align="center">
                  {row.new_enlacecotizacion ? (
                    <Typography
                      variant="body2"
                      color="primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleOpenModal(row.new_enlacecotizacion)}
                    >
                      Ver enlace
                    </Typography>
                  ) : (
                    "No disponible"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Enlace de Cotización
          </Typography>
          {selectedLink && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              <a href={selectedLink} target="_blank" rel="noopener noreferrer">
                {selectedLink}
              </a>
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
}
