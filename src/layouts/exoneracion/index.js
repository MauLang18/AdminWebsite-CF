import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
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
import authorsTableData from "layouts/exoneracion/data/authorsTableData";
import axios from "axios";

function Exoneracion() {
  const { columns } = authorsTableData();
  const [rows, setRows] = useState([]);
  const [textFilter, setTextFilter] = useState("");
  const user = JSON.parse(localStorage.getItem("users"));
  const { name } = user;

  const handleTextFilterChange = (event) => {
    setTextFilter(event.target.value);
  };

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

  const handleSearch = async () => {
    try {
      let url;
      if (textFilter === "") {
        url = `https://api.logisticacastrofallas.com/api/Exoneracion/Cliente?cliente=${name}`;
      } else {
        url = `https://api.logisticacastrofallas.com/api/Exoneracion/Cliente?cliente=${name}&NumFilter=1&TextFilter=${textFilter}`;
      }

      const response = await axios.get(url);
      const newRows = response.data.data.map((rowData) => ({
        idtra: rowData.idtra,
        nombreCliente: rowData.nombreCliente,
        tipoExoneracion: rowData.tipoExoneracion,
        statusExoneracion: rowData.statusExoneracion,
        producto: rowData.producto,
        categoria: rowData.categoria,
        clasificacionArancelaria: rowData.clasificacionArancelaria,
        numeroSolicitud: rowData.numeroSolicitud,
        solicitud: (
          <a target="blank" href={rowData.solicitud}>
            SOLICITUD
          </a>
        ),
        numeroAutorizacion: rowData.numeroAutorizacion,
        autorizacion: (
          <a target="blank" href={rowData.autorizacion}>
            AUTORIZACION
          </a>
        ),
        desde: formatDate(rowData.desde),
        hasta: formatDate(rowData.hasta),
        descripcion: rowData.descripcion,
        showFullDescription: false,
      }));

      setRows(newRows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleDescription = (index) => {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, showFullDescription: !row.showFullDescription } : row
      )
    );
  };

  useEffect(() => {
    handleSearch();
  }, [textFilter]);

  const handleDownloadExcel = () => {
    let url;
    if (textFilter === "") {
      url = `https://api.logisticacastrofallas.com/api/Exoneracion/Cliente?cliente=${name}&Download=True`;
    } else {
      url = `https://api.logisticacastrofallas.com/api/Exoneracion/Cliente?cliente=${name}&NumFilter=1&TextFilter=${textFilter}&Download=True`;
    }

    axios
      .get(url, { responseType: "blob" })
      .then((response) => {
        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        const filename = "tramites_activos.xlsx";
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
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
                flexWrap="wrap"
              >
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
                    <MenuItem value={"En Tramite"}>En Tramite</MenuItem>
                    <MenuItem value={"Autorizada"}>Autorizada</MenuItem>
                    <MenuItem value={"Vencida"}>Vencida</MenuItem>
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
                  table={{
                    columns,
                    rows: rows.map((row, index) => ({
                      ...row,
                      descripcion: (
                        <MDTypography variant="caption" color="text" fontWeight="medium">
                          {row.showFullDescription
                            ? row.descripcion
                            : `${row.descripcion.slice(0, 10)}... `}
                          <button onClick={() => toggleDescription(index)}>
                            {row.showFullDescription ? "Ver menos" : "Ver más"}
                          </button>
                        </MDTypography>
                      ),
                    })),
                  }}
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

export default Exoneracion;
