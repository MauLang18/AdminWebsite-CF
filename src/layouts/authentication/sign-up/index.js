// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Axios for HTTP requests
import axios from "axios";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpg";

function Cover() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hola");
    const data = new FormData(event.currentTarget);

    // Obtener los datos del formulario
    const nombre = data.get("firstName");
    const apellido = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");
    const nombreEmpresa = data.get("nombreEmpresa");
    const telefono = data.get("telefono");
    const direccion = data.get("direccion");
    const pais = data.get("pais");

    // Agregar los campos adicionales requeridos que no están en el formulario
    data.append("nombre", nombre);
    data.append("apellido", apellido);
    data.append("pass", password);
    data.append("correo", email);
    data.append("nombreEmpresa", nombreEmpresa);
    data.append("telefono", telefono);
    data.append("direccion", direccion);
    data.append("pais", pais);
    data.append("tipo", "Interno");
    data.append("paginas", "1");
    data.append("idRol", "2");
    data.append("estado", "0");

    try {
      const response = await axios.post(
        "https://api.logisticacastrofallas.com/api/Usuario/Register/",
        data
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Únete a nosotros
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Introduzca su correo electrónico y contraseña para registrarse
          </MDTypography>
        </MDBox>
        <MDBox pt={1} pb={1} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={1}>
              <MDInput type="text" label="Nombre" name="firstName" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={1}>
              <MDInput type="text" label="Apellido" name="lastName" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={1}>
              <MDInput
                type="text"
                label="Nombre de Empresa"
                name="nombreEmpresa"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={1}>
              <MDInput type="text" label="Telefono" name="telefono" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={1}>
              <MDInput
                type="text"
                label="Dirección"
                name="direccion"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={1}>
              <MDInput type="text" label="País" name="pais" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={1}>
              <MDInput type="email" label="Correo" name="email" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={1}>
              <MDInput
                type="password"
                label="Contraseña"
                name="password"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Registrarse
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                ¿Ya tienes una cuenta?{" "}
                <MDTypography
                  component={Link}
                  to="/"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Iniciar Sesión
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
