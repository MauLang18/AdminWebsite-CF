import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Bar, Doughnut } from "react-chartjs-2";
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
import Carrousel from "layouts/profile/components/PlatformSettings";

function Overview() {
  const [activeData, setActiveData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [historialFilter, setHistorialFilter] = useState("mes"); // mes, trimestre, año
  const user = JSON.parse(localStorage.getItem("users"));
  const { name } = user;

  const getStatusName = (status) => {
    return statusMapping[status] || "Desconocido";
  };

  useEffect(() => {
    const fetchActiveData = async () => {
      try {
        const response = await axios.get(
          `https://api.logisticacastrofallas.com/api/TrackingLogin/Activo?cliente=${name}`
        );
        if (response.data.isSuccess) {
          setActiveData(response.data.data.value);
        } else {
          console.error("Error fetching active data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching active data:", error);
      }
    };

    const fetchHistoryData = async () => {
      try {
        const response = await axios.get(
          `https://api.logisticacastrofallas.com/api/TrackingLogin/Finalizado?cliente=${name}`
        );
        if (response.data.isSuccess) {
          setHistoryData(response.data.data.value);
        } else {
          console.error("Error fetching history data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchActiveData();
    fetchHistoryData();
  }, [name]);

  if (!activeData || !historyData.length) {
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

  const currentData = activeData[0];
  const { new_eta, new_diasdetransito, new_cbm, new_preestado2, new_etd1 } =
    currentData;

  // Progress calculation
  const etaDate = new Date(new_eta);
  const etdDate = new Date(new_etd1);
  const now = new Date();
  const elapsedTime = Math.max(0, now - etdDate);
  const totalTime = Math.max(0, etaDate - etdDate);
  const progress =
    totalTime > 0 ? ((elapsedTime / totalTime) * 100).toFixed(2) : 0;

  const groupHistorialData = () => {
    const groupedData = {};

    historyData.forEach((item) => {
      const createdDate = new Date(item.createdon);

      let key;
      if (historialFilter === "mes") {
        key = createdDate.toLocaleDateString("es-ES", { month: "long" });
      } else if (historialFilter === "trimestre") {
        if (createdDate.getFullYear() === now.getFullYear()) {
          const quarter = Math.floor(createdDate.getMonth() / 3);
          const quarters = [
            "Ene-Feb-Mar",
            "Abr-May-Jun",
            "Jul-Ago-Sep",
            "Oct-Nov-Dic",
          ];
          key = quarters[quarter];
        }
      } else {
        key = createdDate.getFullYear(); // Año
      }

      if (key) {
        groupedData[key] = (groupedData[key] || 0) + 1;
      }
    });

    return Object.entries(groupedData).map(([key, value]) => ({
      label: key,
      count: value,
    }));
  };

  const groupedHistorialData = groupHistorialData();

  const historialChartData = {
    labels: groupedHistorialData.map((item) => item.label),
    datasets: [
      {
        label: "Cantidad de cargas",
        data: groupedHistorialData.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const commodityData = {};
  let totalCbm = 0;

  activeData.forEach((item) => {
    totalCbm += item.new_cbm1;
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
      <Header />
      <MDBox px={3}>
        <Grid container spacing={3}>
          {/* Columna izquierda */}
          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Estado de la Carga
                </MDTypography>
                <MDBox mt={2}>
                  <MDTypography variant="h4" color="info">
                    {progress}% Completado
                  </MDTypography>
                  <MDTypography>
                    Estado actual: {getStatusName(new_preestado2)}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Card>

            <Card sx={{ mt: 3 }}>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Tiempos de Tránsito
                </MDTypography>
                <MDBox mt={2}>
                  <MDTypography>
                    ETD: {etdDate.toLocaleDateString()}
                  </MDTypography>
                  <MDTypography>
                    ETA: {etaDate.toLocaleDateString()}
                  </MDTypography>
                  <MDTypography>
                    Tiempo restante:{" "}
                    {(
                      (totalTime - elapsedTime) /
                      (1000 * 60 * 60 * 24)
                    ).toFixed(1)}{" "}
                    días
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          {/* Columna derecha */}
          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Resumen de Productos Transportados
                </MDTypography>
                <MDBox mt={2}>
                  <Doughnut data={commodityChartData} />
                  <MDTypography>
                    Volumen total transportado: {totalCbm.toFixed(2)} cbm
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ mt: 3 }}>
          <MDBox p={3}>
            <MDTypography variant="h6">Historial de Envíos</MDTypography>
            <MDBox mt={2} mb={3}>
              <Select
                value={historialFilter}
                onChange={(e) => setHistorialFilter(e.target.value)}
                displayEmpty
                variant="outlined"
                fullWidth
              >
                <MenuItem value="mes">Mes</MenuItem>
                <MenuItem value="trimestre">Trimestre</MenuItem>
                <MenuItem value="año">Año</MenuItem>
              </Select>
            </MDBox>
            <Bar data={historialChartData} />
          </MDBox>
        </Card>
        <br />
      </MDBox>
      <MDBox mb={2} />
      <Carrousel />
      <MDBox mb={2} />
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
