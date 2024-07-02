import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/CloudDownloadTwoTone";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/whs/data/authorsTableData";
import axios from "axios";
import Avatars from "../whs/data/Avatars";

function WHS(props) {
  const { pol } = props;
  const { columns } = authorsTableData(pol);
  const [rows, setRows] = useState([]);
  const [numFilter, setNumFilter] = useState(0); // Valor inicial del combobox
  const [textFilter, setTextFilter] = useState(""); // Valor inicial del campo de texto
  const [countryImage, setCountryImage] = useState(null); // Estado para almacenar la imagen del país
  const user = JSON.parse(localStorage.getItem("users"));
  const { name, acr, family_name, email } = user;

  const handleTextFilterChange = (event) => {
    setTextFilter(event.target.value);
  };

  useEffect(() => {
    // Función para obtener la imagen del país desde la API local
    const fetchCountryImage = async () => {
      try {
        const response = await axios.get("https://api.logisticacastrofallas.com/api/Origen/Select");  // URL dinámica
        const responseData = response.data;  // Deserializar los datos aquí

        if (responseData.isSuccess) {
          const data = responseData.data;  // Obtener directamente la propiedad 'data'

          // Asegurarse de que 'data' sea un arreglo y tenga al menos un elemento
          if (Array.isArray(data) && data.length > 0) {
            const countryData = data.find(
              (item) => item.description && item.description.toLowerCase() === pol.split(", ")[1].toLowerCase()
            );
            if (countryData) {
              console.log(countryData.description); // Verificar la descripción del país
              setCountryImage(countryData.id); // Guardar la URL de la imagen encontrada
            } else {
              console.warn(`No se encontró la imagen para ${pol.split(", ")[1].toLowerCase()}`);
              setCountryImage(null); // No mostrar ninguna imagen si no se encuentra ninguna válida
            }
          } else {
            console.warn("La respuesta no contiene datos válidos.");
            setCountryImage(null); // No mostrar ninguna imagen si no hay datos válidos
          }
        } else {
          console.error("Error en la respuesta de la API:", responseData.message);
          setCountryImage(null); // No mostrar ninguna imagen en caso de error en la respuesta
        }
      } catch (error) {
        console.error("Error fetching country image:", error);
        setCountryImage(null); // No mostrar ninguna imagen en caso de error al obtener la imagen
      }
    };
  
    fetchCountryImage();
  }, [pol]);

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

  const handleSearch = async () => {
    try {
      let url;
      if (numFilter === 0 && textFilter === "") {
        url = `https://api.logisticacastrofallas.com/api/Whs/Cliente?order=desc&whs=${pol}&cliente=${name}`;
      } else {
        url = `https://api.logisticacastrofallas.com/api/Whs/Cliente?order=desc&whs=${pol}&cliente=${name}&NumFilter=1&TextFilter=${textFilter}`;
      }

      const response = await axios.get(url);
      const newRows = response.data.data
        .filter((rowData) => rowData.estado === 1) // Filtrar los elementos con estado igual a 1
        .map((rowData) => ({
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
              <a target="_blank" rel="noopener noreferrer" href={rowData.whsReceipt}>
                WHS Receipt
              </a>
            </MDTypography>
          ),
          documentoregistro: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              <a target="_blank" rel="noopener noreferrer" href={rowData.documentoregistro}>
                Documentación Registro
              </a>
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
        }));

      setRows(newRows);

      // Logging request for success
      await axios.post("https://api.logisticacastrofallas.com/api/Logs/Register", {
        Usuario: `${family_name} / ${email} / ${acr}`,
        Modulo: "WHS",
        TipoMetodo: "Busqueda",
        Parametros: JSON.stringify({ pol, textFilter }),
        Estado: 1,
      });
    } catch (error) {
      console.error("Error fetching data:", error);

      // Log the error
      await axios.post("https://api.logisticacastrofallas.com/api/Logs/Register", {
        Usuario: `${family_name} / ${email} / ${acr}`,
        Modulo: "WHS",
        TipoMetodo: "Busqueda",
        Parametros: JSON.stringify({ pol, textFilter }),
        Estado: 0,
      });
    }
  };

  const handleDownloadExcel = () => {
    let url;
    if (numFilter === 0 && textFilter === "") {
      url = `https://api.logisticacastrofallas.com/api/Whs/Cliente?order=desc&whs=${pol}&cliente=${name}&Download=True`;
    } else {
      url = `https://api.logisticacastrofallas.com/api/Whs/Cliente?order=desc&whs=${pol}&cliente=${name}&NumFilter=1&TextFilter=${textFilter}&Download=True`;
    }

    axios
      .get(url, { responseType: "blob" })
      .then((response) => {
        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        const filename = "tramites_activos.xlsx";
        if (window.navigator.msSaveOrOpenBlob) {
          // IE
          window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
          // Otros navegadores
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
      })
      .catch((error) => {
        console.error("Error al descargar el archivo:", error);
      });
  };

  useEffect(() => {
    handleSearch();
  }, [pol, textFilter]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap" // Añadir flexWrap para que los elementos se envuelvan en dispositivos móviles
              >
                <MDTypography variant="h6" color="white">
                  {countryImage && (
                    <img
                      src={countryImage}
                      alt={`${pol.split(", ")[1]} flag`}
                      style={{ width: "30px", height: "auto", marginRight: "10px" }}
                    />
                  )}
                  {pol}
                </MDTypography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <MDTypography variant="h6" color="white" style={{ marginRight: "10px" }}>
                    FILTRO:
                  </MDTypography>
                  <Select
                    value={textFilter}
                    onChange={handleTextFilterChange}
                    variant="standard"
                    size="medium"
                    className="mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
                    style={{ color: "white" }}
                    displayEmpty
                    inputProps={{ "aria-label": "FILTRO" }}
                  >
                    <MenuItem value="" disabled>
                      FILTRO
                    </MenuItem>
                    <MenuItem value={""}>Todos</MenuItem>
                    <MenuItem value={"En WHS"}>En WHS</MenuItem>
                    <MenuItem value={"Preparando para Envio"}>Preparando para Envio</MenuItem>
                    <MenuItem value={"Salida"}>Salida</MenuItem>
                  </Select>
                </div>

                <Button
                  variant="contained"
                  color="white"
                  size="medium"
                  startIcon={<SearchIcon />}
                  onClick={handleDownloadExcel}
                  sx={{ ml: 2, backgroundColor: "black" }}
                >
                  Descargar Excel
                </Button>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

WHS.propTypes = {
  pol: PropTypes.string.isRequired,
};

export default WHS;
