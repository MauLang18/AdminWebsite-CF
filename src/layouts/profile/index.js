import React from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/profile/components/Header";
import Carrousel from "layouts/profile/components/PlatformSettings";
import Charts from "layouts/profile/components/Charts";

function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Header />
      <MDBox mb={2} />
      <Charts />
      <MDBox mb={2} />
      <Carrousel />
      <MDBox mb={2} />
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
