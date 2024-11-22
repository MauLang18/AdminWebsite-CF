import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import authorsTableData from "layouts/cotizaciones/data/authorsTableData";
import { saveAs } from "file-saver";
import SearchIcon from "@mui/icons-material/CloudDownloadTwoTone";

function Cotizaciones() {
  const { columns, rows } = authorsTableData();
  const user = JSON.parse(localStorage.getItem("users"));
  const { name } = user;

  const handleDownloadExcel = () => {
    fetch(
      `https://api.logisticacastrofallas.com/api/TrackingLogin/Activo/Download?cliente=${name}`
    )
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, "tramites_activos.xlsx");
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
                justifyContent="space-between" // Alinear elementos a los extremos
                alignItems="center" // Centrar verticalmente
              >
                <MDTypography variant="h6" color="white">
                  Cotizaciones
                </MDTypography>
                {/* <Button
                  variant="contained"
                  color="white"
                  size="medium"
                  startIcon={<SearchIcon />}
                  onClick={handleDownloadExcel}
                  sx={{ ml: 2, backgroundColor: "black" }}
                >
                  Descargar Excel
                </Button> */}
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

export default Cotizaciones;
