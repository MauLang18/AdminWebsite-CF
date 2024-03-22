import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Dashboard components
import CotizacionForm from "layouts/cotizacion/components/Projects";

function Cotizacion() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={1}>
        <CotizacionForm />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Cotizacion;
