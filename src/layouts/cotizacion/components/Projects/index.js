import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography, Select, MenuItem } from "@material-ui/core";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import bgImage from "assets/images/bg-sign-in-basic.jpg";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 400,
    width: "100%",
  },
  form: {
    background: "#FFF",
    padding: 25,
    margin: "150px 0",
    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
    borderRadius: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: 300,
    marginBottom: 10,
  },
  TextField: {
    width: "100%",
    marginBottom: 15,
  },
  Select: {
    width: "100%",
    marginBottom: 15,
  },
  button: {
    width: "100%",
  },
}));

const ContactoFormulario = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    sitioWeb: "",
    mensaje: "",
    operacion: [],
    negociacion: "0",
    servicio: "0",
    origen: "0",
    destino: "0",
    producto: "0",
    valor: "",
    serviciosIntegrales: [],
    peso: "",
    volumen: "",
    dimensiones: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construye el cuerpo del correo electrónico en formato HTML
    const emailBody = `
    <h1>Cotización de Servicios</h1>
    <p><strong>Nombre Empresa:</strong> ${formData.nombre}</p>
    <p><strong>Teléfono:</strong> ${formData.telefono}</p>
    <p><strong>Correo:</strong> ${formData.correo}</p>
    <p><strong>Operación:</strong> ${formData.operacion.join(", ")}</p>
    <p><strong>Negociación:</strong> ${formData.negociacion}</p>
    <p><strong>Servicio:</strong> ${formData.servicio}</p>
    <p><strong>Origen:</strong> ${formData.origen}</p>
    <p><strong>Destino:</strong> ${formData.destino}</p>
    <p><strong>Tipo Producto:</strong> ${formData.producto}</p>
    <p><strong>Valor Mercancía:</strong> ${formData.valor}</p>
    <p><strong>Servicios Integrales:</strong> ${formData.serviciosIntegrales.join(", ")}</p>
    <p><strong>Peso:</strong> ${formData.peso}</p>
    <p><strong>Volumen:</strong> ${formData.volumen}</p>
    <p><strong>Dimensiones:</strong> ${formData.dimensiones}</p>
    <p><strong>Observaciones:</strong> ${formData.message}</p>
  `;

    fetch("https://api.logisticacastrofallas.com/api/Mail/Send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        para: "pricing@grupocastrofallas.com",
        asunto: "Cotización",
        contenido: emailBody,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Cotización enviada con éxito!");
          // Puedes hacer cualquier acción adicional aquí, como redireccionar al usuario a otra página
        } else {
          alert("Error al enviar la cotización: " + response.statusText);
          // También puedes manejar errores, por ejemplo, mostrando un mensaje de error al usuario
        }
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  };

  const handleCheckboxChange = (option) => {
    // Clona el array de opciones seleccionadas para evitar mutar el estado directamente
    const updatedOpcionesCheckbox = [...formData.serviciosIntegrales];

    // Verifica si la opción ya está en la lista de seleccionados
    const index = updatedOpcionesCheckbox.indexOf(option);

    if (index === -1) {
      // Si no está seleccionada, agrégala a la lista
      updatedOpcionesCheckbox.push(option);
    } else {
      // Si ya está seleccionada, quítala de la lista
      updatedOpcionesCheckbox.splice(index, 1);
    }

    // Actualiza el estado con las opciones actualizadas
    handleChange({
      target: { name: "serviciosIntegrales", value: updatedOpcionesCheckbox },
    });
  };

  const handleCheckboxChange1 = (option) => {
    // Clona el array de opciones seleccionadas para evitar mutar el estado directamente
    const updatedOpcionesCheckbox = [...formData.operacion];

    // Verifica si la opción ya está en la lista de seleccionados
    const index = updatedOpcionesCheckbox.indexOf(option);

    if (index === -1) {
      // Si no está seleccionada, agrégala a la lista
      updatedOpcionesCheckbox.push(option);
    } else {
      // Si ya está seleccionada, quítala de la lista
      updatedOpcionesCheckbox.splice(index, 1);
    }

    // Actualiza el estado con las opciones actualizadas
    handleChange({
      target: { name: "operacion", value: updatedOpcionesCheckbox },
    });
  };

  return (
    <Card>
      <MDBox
        display="flex"
        justifyContent="center"
        p={3}
        style={{
          backgroundImage: `url(${bgImage})`, // Reemplaza 'ruta/de/la/imagen.jpg' por la ruta real de tu imagen
          backgroundSize: "cover", // Ajusta el tamaño de la imagen para cubrir el contenedor
          backgroundPosition: "center", // Centra la imagen en el contenedor
        }}
      >
        <div className={classes.container}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Typography variant="h3" className={classes.title}>
              Cotiza tu carga
            </Typography>
            <TextField
              className={classes.TextField}
              label="Nombre Empresa"
              variant="outlined"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              autoFocus
            />
            <TextField
              className={classes.TextField}
              label="Teléfono"
              variant="outlined"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
            <TextField
              className={classes.TextField}
              label="Correo"
              variant="outlined"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
            <div className="form-group mb-4">
              <Typography
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="operacion"
              >
                Operación
              </Typography>
              <div className="flex space-x-4">
                <Typography className="inline-flex items-center">
                  <TextField
                    type="checkbox"
                    name="operacion"
                    value="Importación"
                    onChange={() => handleCheckboxChange1("Importación")}
                    checked={formData.operacion.includes("Importación")}
                  />
                  <span className="ml-2">Importación</span>
                </Typography>
                <Typography className="inline-flex items-center">
                  <TextField
                    type="checkbox"
                    name="operacion"
                    value="Exportación"
                    onChange={() => handleCheckboxChange1("Exportación")}
                    checked={formData.operacion.includes("Exportación")}
                  />
                  <span className="ml-2">Exportación</span>
                </Typography>
              </div>
            </div>
            <div className={classes.textField}>
              <Select
                className={classes.Select}
                id="negociacion"
                name="negociacion"
                value={formData.negociacion}
                onChange={handleChange}
                required
              >
                <MenuItem value="0">Termino Negociación</MenuItem>
                <MenuItem value="EXW">EXW</MenuItem>
                <MenuItem value="FOB">FOB</MenuItem>
                <MenuItem value="DDP">DDP</MenuItem>
                <MenuItem value="CIF">CIF</MenuItem>
                <MenuItem value="CFR">CFR</MenuItem>
                <MenuItem value="DAP">DAP</MenuItem>
                <MenuItem value="FCA">FCA</MenuItem>
              </Select>
            </div>
            <div className={classes.textField}>
              <Select
                className={classes.Select}
                id="servicio"
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                required
              >
                <MenuItem value="0">Servicio</MenuItem>
                <MenuItem value="Marítimo LCL">Marítimo LCL</MenuItem>
                <MenuItem value="Marítimo FCL 1X40STD/HC">Marítimo FCL 1X40STD/HC</MenuItem>
                <MenuItem value="Marítimo FCL 1X20STD">Marítimo FCL 1X20STD</MenuItem>
                <MenuItem value="Aéreo">Aéreo</MenuItem>
                <MenuItem value="Carga Proyecto">Carga Proyecto</MenuItem>
                <MenuItem value="Terrestre LTL">Terrestre LTL</MenuItem>
                <MenuItem value="Terrestre FTL 1X53/48">Terrestre FTL 1X53/48</MenuItem>
                <MenuItem value="Terrestre FTL 1X20">Terrestre FTL 1X20</MenuItem>
              </Select>
            </div>
            <div className={classes.textField}>
              <Select
                className={classes.Select}
                id="origen"
                name="origen"
                value={formData.origen}
                onChange={handleChange}
                required
              >
                <MenuItem value="0">Origen</MenuItem>
                <MenuItem value="Miami, USA (SD)">Miami, USA (SD)</MenuItem>
                <MenuItem value="Port Everglades, USA (CY)">Port Everglades, USA (CY)</MenuItem>
                <MenuItem value="Qingdao, CN (CY)">Qingdao, CN (CY)</MenuItem>
                <MenuItem value="Shanghai, CN (CY)">Shanghai, CN (CY)</MenuItem>
                <MenuItem value="Ningbo, CN (CY)">Ningbo, CN (CY)</MenuItem>
                <MenuItem value="Yantian, CN (CY)">Yantian, CN (CY)</MenuItem>
                <MenuItem value="Xingang, CN (CY)">Xingang, CN (CY)</MenuItem>
                <MenuItem value="Xiamen, CN (CY)">Xiamen, CN (CY)</MenuItem>
                <MenuItem value="Chongqing, CN">Chongqing, CN</MenuItem>
                <MenuItem value="Ho Chi Minh, Vietnam">Ho Chi Minh, Vietnam</MenuItem>
                <MenuItem value="Mundra, India">Mundra, India</MenuItem>
                <MenuItem value="San José, Costa Rica">San José, Costa Rica</MenuItem>
              </Select>
            </div>
            <div className={classes.textField}>
              <Select
                className={classes.Select}
                id="destino"
                name="destino"
                value={formData.destino}
                onChange={handleChange}
                required
              >
                <MenuItem value="0">Destino</MenuItem>
                <MenuItem value="Puerto Caldera, CRC (CY)">Puerto Caldera, CRC (CY)</MenuItem>
                <MenuItem value="Puerto Moin, CRC (CY)">Puerto Moin, CRC (CY)</MenuItem>
                <MenuItem value="San José, CRC (SD)">San José, CRC (SD)</MenuItem>
                <MenuItem value="Puerto Quetzal, Guatemala">Puerto Quetzal, Guatemala</MenuItem>
                <MenuItem value="Puerto Callao, Perú">Puerto Callao, Perú</MenuItem>
                <MenuItem value="Zona Libre, Colón, Panamá">Zona Libre, Colón, Panamá</MenuItem>
              </Select>
            </div>
            <div className={classes.textField}>
              <Select
                className={classes.Select}
                id="producto"
                name="producto"
                value={formData.producto}
                onChange={handleChange}
                required
              >
                <MenuItem value="0">Tipo Producto</MenuItem>
                <MenuItem value="Carga General">Carga General</MenuItem>
                <MenuItem value="Carga Peligrosa">Carga Peligrosa</MenuItem>
                <MenuItem value="Alimentos">Alimentos</MenuItem>
                <MenuItem value="Menaje Casa">Menaje Casa</MenuItem>
              </Select>
            </div>
            <TextField
              className={classes.TextField}
              label="Valor Mercancia"
              variant="outlined"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              required
              autoFocus
            />
            <div className="form-group mb-4">
              <Typography
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="serviciosIntegrales"
              >
                Servicios Integrales
              </Typography>
              <div className="flex space-x-4">
                <Typography className="inline-flex items-center">
                  <TextField
                    type="checkbox"
                    name="serviciosIntegrales"
                    value="Seguro Carga"
                    onChange={() => handleCheckboxChange("Seguro Carga")}
                    checked={formData.serviciosIntegrales.includes("Seguro Carga")}
                  />
                  <span className="ml-2">Seguro Carga</span>
                </Typography>
                <Typography className="inline-flex items-center">
                  <TextField
                    type="checkbox"
                    name="serviciosIntegrales"
                    value="Transporte Nacional"
                    onChange={() => handleCheckboxChange("Transporte Nacional")}
                    checked={formData.serviciosIntegrales.includes("Transporte Nacional")}
                  />
                  <span className="ml-2">Transporte Nacional</span>
                </Typography>
                <Typography className="inline-flex items-center">
                  <TextField
                    type="checkbox"
                    name="serviciosIntegrales"
                    value="Agencia Aduanas"
                    onChange={() => handleCheckboxChange("Agencia Aduanas")}
                    checked={formData.serviciosIntegrales.includes("Agencia Aduanas")}
                  />
                  <span className="ml-2">Agencia Aduanas</span>
                </Typography>
                <Typography className="inline-flex items-center">
                  <TextField
                    type="checkbox"
                    name="serviciosIntegrales"
                    value="Almacén Fiscal"
                    onChange={() => handleCheckboxChange("Almacén Fiscal")}
                    checked={formData.serviciosIntegrales.includes("Almacén Fiscal")}
                  />
                  <span className="ml-2">Almacén Fiscal</span>
                </Typography>
              </div>
            </div>
            <TextField
              className={classes.TextField}
              label="Peso"
              variant="outlined"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              required
              autoFocus
            />
            <TextField
              className={classes.TextField}
              label="Volumen"
              variant="outlined"
              name="volumen"
              value={formData.volumen}
              onChange={handleChange}
              required
              autoFocus
            />
            <TextField
              className={classes.TextField}
              label="Dimensiones"
              variant="outlined"
              name="dimensiones"
              value={formData.dimensiones}
              onChange={handleChange}
              required
              autoFocus
            />
            <textarea
              className={classes.TextField}
              id="message"
              name="message"
              rows="3"
              placeholder="Escriba las observaciones"
              onChange={handleChange}
              value={formData.message}
            ></textarea>
            <Button className={classes.button} variant="contained" color="primary" type="submit">
              Enviar
            </Button>
          </form>
        </div>
      </MDBox>
    </Card>
  );
};

export default ContactoFormulario;
