import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Dashboard components
import TrackingForm from "layouts/tracking/components/Projects";

function Tracking() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={1}>
        <TrackingForm />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tracking;
