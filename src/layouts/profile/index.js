import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import statusMapping from "../profile/json/status.json";

// Overview page components
import Header from "layouts/profile/components/Header";

function Overview() {
  const [dashboardData, setDashboardData] = useState(null);
  const [historialFilter, setHistorialFilter] = useState("mes"); // Mes, Trimestre, Año
  const user = JSON.parse(localStorage.getItem("users"));
  const { name } = user;

  const getStatusName = (status) => {
    return statusMapping[status] || "Desconocido";
  };

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.logisticacastrofallas.com/api/TrackingLogin/Activo?cliente=${name}`
        );

        if (response.data.isSuccess) {
          setDashboardData(response.data.data.value);
        } else {
          console.error("Error fetching data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!dashboardData) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox px={3} textAlign="center" mt={5}>
          <MDTypography variant="h6" color="text">
            Cargando datos...
          </MDTypography>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  // Cálculo de datos
  const currentData = dashboardData[0];
  const { new_eta, new_diasdetransito, new_cbm, new_preestado2, new_etd1 } =
    currentData;

  // Cálculo del porcentaje de progreso
  const etaDate = new Date(new_eta);
  const etdDate = new Date(new_etd1);
  const now = new Date();
  const elapsedTime = Math.max(0, now - new Date(currentData.new_etd1)); // Tiempo transcurrido desde ETD
  const totalTime = Math.max(0, etaDate - new Date(currentData.new_etd1)); // Tiempo total de tránsito
  const progress =
    totalTime > 0 ? ((elapsedTime / totalTime) * 100).toFixed(2) : 0;

  // Filtro de historial
  const filterHistorialData = () => {
    const now = new Date();
    let startDate;

    if (historialFilter === "mes") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (historialFilter === "trimestre") {
      const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3;
      startDate = new Date(now.getFullYear(), quarterStartMonth, 1);
    } else {
      startDate = new Date(now.getFullYear(), 0, 1);
    }

    return dashboardData.filter(
      (item) =>
        new Date(item.new_eta) >= startDate && new Date(item.new_eta) <= now
    );
  };

  const historialData = filterHistorialData();

  // Resumen de productos transportados
  const commodityData = {};
  let totalCbm = 0;

  dashboardData.forEach((item) => {
    totalCbm += item.new_cbm;
    if (commodityData[item.new_commodity]) {
      commodityData[item.new_commodity] += 1;
    } else {
      commodityData[item.new_commodity] = 1;
    }
  });

  const commodityChartData = {
    labels: Object.keys(commodityData),
    datasets: [
      {
        data: Object.values(commodityData),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header />
      <MDBox mb={2} />

      <MDBox px={3}>
        <Grid container spacing={3}>
          {/* Estado de la Carga */}
          <Grid item xs={12} md={4}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" color="text" fontWeight="medium">
                  Estado de la Carga
                </MDTypography>
                <MDBox mt={2}>
                  <MDTypography variant="h4" color="info">
                    {progress}% Completado
                  </MDTypography>
                  <MDTypography variant="body2" color="text">
                    Estado actual: {getStatusName(new_preestado2)}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          {/* Tiempos de Tránsito */}
          <Grid item xs={12} md={4}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" color="text" fontWeight="medium">
                  Tiempos de Tránsito
                </MDTypography>
                <MDBox mt={2}>
                  <MDTypography variant="body1" color="text">
                    ETD: {etdDate.toLocaleDateString()}
                  </MDTypography>
                  <MDTypography variant="body1" color="text">
                    ETA: {etaDate.toLocaleDateString()}
                  </MDTypography>
                  <MDTypography variant="body1" color="text">
                    Tiempo de Transito: {new_diasdetransito} días
                  </MDTypography>
                  <MDTypography variant="body1" color="text">
                    Tiempo restante:{" "}
                    {(totalTime - elapsedTime) / (1000 * 60 * 60 * 24)} días
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          {/* Resumen de Productos Transportados */}
          <Grid item xs={12} md={4}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" color="text" fontWeight="medium">
                  Resumen de Productos Transportados
                </MDTypography>
                <MDBox mt={2}>
                  <Bar data={commodityChartData} />
                  <MDTypography variant="body2" color="text">
                    Volumen total transportado: {totalCbm} cbm
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          {/* Historial de Envíos */}
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" color="text" fontWeight="medium">
                  Historial de Envíos
                </MDTypography>
                <MDBox mt={2}>
                  <Bar
                    data={{
                      labels: historialData.map((item) =>
                        new Date(item.new_eta).toLocaleDateString()
                      ),
                      datasets: [
                        {
                          label: "Envíos",
                          data: historialData.map((item) => item.new_cbm),
                          backgroundColor: "rgba(75, 192, 192, 0.5)",
                        },
                      ],
                    }}
                  />
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
