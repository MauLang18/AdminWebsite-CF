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
    const data = new FormData(event.currentTarget);
    const nombre = data.get("firstName");
    const apellido = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");

    try {
      const response = await axios.post(
        "https://api.logisticacastrofallas.com/api/Usuario/Register",
        {
          nombre,
          apellido,
          pass: password,
          correo: email,
          tipo: "Interno",
          cliente: null,
          idRol: 2,
          estado: 1,
        }
      );

      console.log(response.data);
      // Puedes manejar la respuesta aquí según tus necesidades.
      // Por ejemplo, podrías redirigir al usuario a la página de inicio de sesión.
    } catch (error) {
      console.error(error);
      // También puedes manejar el error y proporcionar feedback al usuario si es necesario.
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
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput type="text" label="Nombre" name="firstName" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Apellido" name="lastName" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Correo" name="email" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Contraseña"
                name="password"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
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
