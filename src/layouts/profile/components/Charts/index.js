import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Bar, Doughnut } from "react-chartjs-2";
import { DataGrid } from "@mui/x-data-grid";
import statusMapping from "layouts/profile/json/status.json";
import statusInversoMapping from "layouts/profile/json/statusInverso.json";
import { TimeFrameSelector } from "layouts/profile/components/Charts/TimeFrameSelector";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register necessary components (scales, elements, etc.)
Chart.register(
  LinearScale,
  CategoryScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Charts() {
  const [activeData, setActiveData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const user = JSON.parse(localStorage.getItem("users"));
  const { name } = user;
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("month");

  const openModal = (title, filterFunctionOrData, isFiltered = false) => {
    let filteredData;

    // Si no está filtrado (isFiltered es false), aplicamos el filtro
    if (!isFiltered) {
      // Si es una función, ejecutamos el filtro sobre activeData
      filteredData = activeData.filter(filterFunctionOrData);
    } else if (isFiltered) {
      // Si los datos ya están filtrados, los usamos directamente
      filteredData = filterFunctionOrData;
    }

    console.log(filteredData);

    setModalTitle(title);
    setModalData(filteredData); // Pasa los datos filtrados al modal
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para manejar el cambio de la selección
  const handleTimeFrameChange = (newTimeFrame) => {
    setSelectedTimeFrame(newTimeFrame);
  };

  const getStatusName = (status) => {
    return statusMapping[status] || ""; // Use statusMapping to get the name, fallback to an empty string if no match
  };

  const getStatusCode = (status) => {
    return statusInversoMapping[status] || ""; // Use statusMapping to get the name, fallback to an empty string if no match
  };

  const prestados = {
    100000000: ["origen"],
    100000001: ["origen"],
    100000015: ["origen"],
    100000014: ["origen"],
    100000017: ["origen"],

    100000002: ["transito"],
  };

  const contenerizadaTeus = [
    "100000003",
    "100000000",
    "100000004",
    "100000002",
    "100000009",
    "100000001",
    "100000010",
    "100000008",
    "100000007",
    "100000006",
    "100000013",
    "100000012",
    "100000011",
    "100000014",
  ];

  const consolidadaCbm = ["100000016", "100000005"];

  const preEstados = [
    100000001, 100000000, 100000015, 100000014, 100000017, 100000009, 100000025,
    100000026, 100000024, 100000002, 100000007, 100000003, 100000027, 100000005,
    100000004,
  ];

  useEffect(() => {
    const fetchActiveData = async () => {
      try {
        const response = await axios.get(
          `https://api.logisticacastrofallas.com/api/TrackingLogin/Historial?cliente=${name}`
        );
        if (response.data.isSuccess) {
          setActiveData(response.data.data.value);
        }
      } catch (error) {
        console.error("Error fetching active data:", error);
      }
    };
    fetchActiveData();
  }, [name]);

  if (!activeData) {
    return (
      <MDBox px={3} textAlign="center" mt={5}>
        <MDTypography variant="h6" color="text">
          Cargando datos...
        </MDTypography>
      </MDBox>
    );
  }

  // Datos para los próximos 7 días
  const calculateUpcoming = (dateKey) => {
    const now = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(now.getDate() + 7);

    return (item) => {
      const date = new Date(item[dateKey]);
      return date >= now && date <= sevenDaysFromNow;
    };
  };

  // Cálculo específico para ETA y confirmación de arribo
  const calculateArrivalsNext7Days = () => {
    const now = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(now.getDate() + 7);

    return (item) => {
      const eta = item.new_eta ? new Date(item.new_eta) : null;
      const confirmation = item.new_confirmaciondearribo
        ? new Date(item.new_confirmaciondearribo)
        : null;

      // Filtro si alguna fecha está dentro del rango de los próximos 7 días
      return (
        (eta && eta >= now && eta <= sevenDaysFromNow) ||
        (confirmation &&
          confirmation >= now &&
          confirmation <= sevenDaysFromNow)
      );
    };
  };

  const summaryData = [
    {
      label: "Coordinación Origen",
      value: activeData.filter((item) =>
        prestados[item.new_preestado2]?.includes("origen")
      ).length,
      onClick: () =>
        openModal(
          "Coordinación Origen",
          (item) => prestados[item.new_preestado2]?.includes("origen"),
          false
        ),
    },
    {
      label: "Tránsito",
      value: activeData.filter((item) =>
        prestados[item.new_preestado2]?.includes("transito")
      ).length,
      onClick: () =>
        openModal(
          "Tránsito",
          (item) => prestados[item.new_preestado2]?.includes("transito"),
          false
        ),
    },
    {
      label: "Saliendo ETD",
      value: activeData.filter(calculateUpcoming("new_etd1")).length,
      onClick: () =>
        openModal("Saliendo ETD", calculateUpcoming("new_etd1"), false),
    },
    {
      label: "Arrivando ETA",
      value: activeData.filter(calculateArrivalsNext7Days()).length,
      onClick: () =>
        openModal("Arrivando ETA", calculateArrivalsNext7Days(), false),
    },
  ];

  // Función para agrupar los datos por mes, trimestre o año
  const groupByTime = (data, dateField, timeFrame) => {
    const grouped = {};

    data.forEach((item) => {
      const date = new Date(item[dateField]);

      let key;
      if (timeFrame === "month") {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}`;
      } else if (timeFrame === "quarter") {
        key = `${date.getFullYear()}-Q${Math.ceil((date.getMonth() + 1) / 3)}`;
      } else if (timeFrame === "year") {
        key = `${date.getFullYear()}`;
      }

      if (!grouped[key]) {
        grouped[key] = 0;
      }

      // Asegúrate de que esté sumando correctamente según TEUs o CBM
      grouped[key] += item.new_cantidadteus || item.new_cbm1 || 0;
    });

    return Object.entries(grouped).map(([label, count]) => ({
      label,
      count,
    }));
  };

  // Filtrar y agrupar los datos para TEUs
  const teusData = activeData.filter((item) => {
    const tamanoEquipo = String(item.new_tamaoequipo);
    return (
      contenerizadaTeus.includes(tamanoEquipo) &&
      item.new_cantidadteus &&
      item.createdon
    );
  });

  // Filtrar y agrupar los datos para CBM
  const cbmData = activeData.filter((item) => {
    const tamanoEquipo = String(item.new_tamaoequipo);
    return (
      consolidadaCbm.includes(tamanoEquipo) && item.new_cbm1 && item.createdon
    );
  });

  // Agrupar commodityData según el tipo de producto (commodity)
  const commodityData = {};
  activeData.forEach((item) => {
    if (item.new_commodity) {
      commodityData[item.new_commodity] =
        (commodityData[item.new_commodity] || 0) + 1;
    }
  });

  // Filtrar las cargas activas que estén en los pre-estados
  const cargasActivas = activeData.filter((item) => {
    const preEstado = item.new_preestado2;
    return preEstados.includes(preEstado) && item.createdon;
  });

  // Contar la cantidad de cargas activas por estado
  const estadoData = activeData.reduce((acc, item) => {
    acc[item.new_preestado2] = (acc[item.new_preestado2] || 0) + 1;
    return acc;
  }, {});

  const handleChartClick = (chartElement, claves) => {
    if (!chartElement.length) return; // Verifica que se haya clickeado un elemento

    // Obtén el índice del elemento clickeado
    const index = chartElement[0].index;

    // Verifica que el índice sea válido
    if (index === undefined || index === null) {
      console.error("Índice no definido en el evento del gráfico.");
      return;
    }

    // Usar las claves originales para encontrar el estado correspondiente
    const clickedKey = claves[index];

    if (clickedKey === undefined) {
      console.error("No se encontró una clave para el índice:", index);
      return;
    }

    // Obtén el código del estado usando el mapeo inverso
    const clickedLabel = getStatusName(clickedKey); // Encuentra el nombre del estado basado en la clave
    const statusCode = getStatusCode(clickedLabel); // Encuentra el código basado en el nombre

    if (!statusCode) {
      console.error("No se encontró un código para el estado:", clickedLabel);
      return;
    }

    // Define una función que devuelve los datos filtrados
    const getFilteredData = () =>
      activeData.filter(
        (item) => Number(item.new_preestado2) === Number(statusCode)
      );

    // Abrir el modal pasando la función para filtrar los datos
    openModal(`Detalles de: ${clickedLabel}`, getFilteredData, true);
  };

  const groupByTimeHistory = (data, dateField, timeFrame) => {
    const grouped = {};

    data.forEach((item) => {
      const date = new Date(item[dateField]);
      let key;

      // Agrupar según el periodo seleccionado
      if (timeFrame === "month") {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}`; // Año-Mes
      } else if (timeFrame === "quarter") {
        key = `${date.getFullYear()}-Q${Math.ceil((date.getMonth() + 1) / 3)}`; // Año-Trimestre
      } else if (timeFrame === "year") {
        key = `${date.getFullYear()}`; // Solo Año
      }

      if (!grouped[key]) {
        grouped[key] = 0;
      }

      // Sumar la cantidad de envíos
      grouped[key] += 1;
    });

    // Convertir el objeto agrupado en un array
    return Object.entries(grouped).map(([label, count]) => ({
      label,
      count,
    }));
  };

  const groupedHistorialData = () => {
    // Usamos la función groupByTime con el selectedTimeFrame
    return groupByTimeHistory(activeData, "createdon", selectedTimeFrame);
  };

  // Agrupar los datos según el período seleccionado
  const groupedTeusData = groupByTime(teusData, "createdon", selectedTimeFrame);
  const groupedCbmData = groupByTime(cbmData, "createdon", selectedTimeFrame);

  const claves = Object.keys(estadoData).map((key) => parseInt(key, 10)); // Convierte las claves a enteros

  return (
    <MDBox px={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* Mostrar el selector de período */}
          <TimeFrameSelector
            onTimeFrameChange={handleTimeFrameChange}
            selectedTimeFrame={selectedTimeFrame}
          />
        </Grid>

        {/* Resumen de Envíos */}
        <Grid item xs={12}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h5" fontWeight="medium">
                Resumen de Envíos
              </MDTypography>
              <Grid container spacing={2} mt={2}>
                {summaryData.map((data, index) => (
                  <Grid
                    item
                    xs={3}
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={data.onClick} // Abre el modal al hacer clic
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <MDTypography variant="h3" color="primary">
                      {data.value}
                    </MDTypography>
                    <MDTypography variant="subtitle2" color="text">
                      {data.label}
                    </MDTypography>
                  </Grid>
                ))}
              </Grid>
            </MDBox>
          </Card>
        </Grid>

        {/* Carga Contenerizada por TEUS */}
        <Grid item xs={12} md={6}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h6" fontWeight="medium">
                Carga Contenerizada por TEUS
              </MDTypography>
              <Bar
                data={{
                  labels: groupedTeusData.map((item) => item.label),
                  datasets: [
                    {
                      label: "TEUS",
                      data: groupedTeusData.map((item) => item.count),
                      backgroundColor: "rgba(75, 192, 192, 0.5)",
                    },
                  ],
                }}
              />
            </MDBox>
          </Card>
        </Grid>

        {/* Carga Consolidada por CBM */}
        <Grid item xs={12} md={6}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h6" fontWeight="medium">
                Carga Consolidada por CBM
              </MDTypography>
              <Bar
                data={{
                  labels: groupedCbmData.map((item) => item.label),
                  datasets: [
                    {
                      label: "CBM",
                      data: groupedCbmData.map((item) => item.count),
                      backgroundColor: "rgba(153, 102, 255, 0.5)",
                    },
                  ],
                }}
              />
            </MDBox>
          </Card>
        </Grid>

        {/* Productos Transportados */}
        <Grid item xs={12} md={6}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h6" fontWeight="medium">
                Productos Transportados
              </MDTypography>
              <Doughnut
                data={{
                  labels: Object.keys(commodityData),
                  datasets: [
                    {
                      data: Object.values(commodityData),
                      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    },
                  ],
                }}
              />
            </MDBox>
          </Card>
        </Grid>

        {/* Estatus de Cargas Activas */}
        <Grid item xs={12} md={6}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h6" fontWeight="medium">
                Estatus de Cargas Activas
              </MDTypography>
              <Doughnut
                data={{
                  labels: claves.map((clave) => getStatusName(clave)),
                  datasets: [
                    {
                      data: Object.values(estadoData),
                      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    },
                  ],
                }}
                options={{
                  onClick: (e, chartElement) =>
                    handleChartClick(chartElement, claves),
                }}
              />
            </MDBox>
          </Card>
        </Grid>

        {/* Historial de Envíos */}
        <Grid item xs={12}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h6">Historial de Envíos</MDTypography>
              <Bar
                data={{
                  labels: groupedHistorialData().map((item) => item.label),
                  datasets: [
                    {
                      label: "Cantidad",
                      data: groupedHistorialData().map((item) => item.count),
                      backgroundColor: "rgba(54, 162, 235, 0.5)",
                    },
                  ],
                }}
              />
            </MDBox>
          </Card>
        </Grid>
      </Grid>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={closeModal} maxWidth="lg" fullWidth>
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          {/* Tabla HTML */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  STATUS
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  ETD
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  ETA
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Confirmación Arribo
                </th>
              </tr>
            </thead>
            <tbody>
              {modalData.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {item.title}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {getStatusName(item.new_preestado2)}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {new Date(item.new_etd1).toLocaleString("es-ES")}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {new Date(item.new_eta).toLocaleString("es-ES")}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {new Date(item.new_confirmaciondearribo).toLocaleString(
                      "es-ES"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
    </MDBox>
  );
}

export default Charts;
