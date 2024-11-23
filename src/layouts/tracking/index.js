import MDBox from "components/MDBox";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Dashboard components
import TrackingForm from "layouts/tracking/components/Projects";

const theme = createTheme({
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          transform: "scale(2.5)", // Escalar íconos globalmente
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderWidth: "6px", // Grosor global de líneas
        },
      },
    },
  },
});

function Tracking() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={1}>
        <ThemeProvider theme={theme}>
          <TrackingForm />
        </ThemeProvider>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tracking;
