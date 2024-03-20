import { useState } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import data from "layouts/users/components/Projects/data";

function Projects() {
  const { columns, rows, editModal } = data();
  const [menu, setMenu] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [cliente, setCliente] = useState("");
  const [rol, setRol] = useState("");
  const [estado, setEstado] = useState("");

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const openAddDialog = () => {
    setOpenDialog(true);
    closeMenu();
  };

  const closeAddDialog = () => {
    setOpenDialog(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleFormSubmit = () => {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("correo", correo);
    formData.append("pass", contraseña);
    formData.append("cliente", cliente);
    formData.append("idRol", rol);
    formData.append("estado", estado);
    formData.append("imagen", selectedImage);
    formData.append("tipo", "Interno");

    fetch("https://api.logisticacastrofallas.com/api/Usuario/Register", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        closeAddDialog();
        // Recargar datos después de enviar el formulario
        const { columns, rows } = data();
        setTableData({ columns, rows });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={openAddDialog}>Agregar Usuario</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <MDButton variant="gradient" color="dark" onClick={openMenu}>
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp;Agregar Usuario
            </MDButton>
          </MDBox>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
      <Dialog open={openDialog} onClose={closeAddDialog}>
        <DialogTitle>Agregar Cliente</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="nombre">Nombre</InputLabel>
            <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="apellido">Apellido</InputLabel>
            <Input id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="correo">Correo</InputLabel>
            <Input id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="contraseña">Contraseña</InputLabel>
            <Input
              id="contraseña"
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="cliente">Cliente</InputLabel>
            <Input id="cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="rol">Rol</InputLabel>
            <Select
              labelId="rol-label"
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              sx={{ minWidth: "120px", height: "50px" }} // Ajustar el ancho mínimo
            >
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>Cliente</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="estado">Estado</InputLabel>
            <Select
              labelId="estado-label"
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              sx={{ minWidth: "120px", height: "50px" }} // Ajustar el ancho mínimo
            >
              <MenuItem value={0}>Inactivo</MenuItem>
              <MenuItem value={1}>Activo</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="imagen">Imagen</InputLabel>
            <Input type="file" id="imagen" onChange={handleImageChange} />
          </FormControl>
          {selectedImage && (
            <MDBox mt={2}>
              <img
                src={selectedImage}
                alt="Selected"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </MDBox>
          )}
        </DialogContent>
        <DialogActions>
          <MDButton onClick={closeAddDialog}>Cancelar</MDButton>
          <MDButton onClick={handleFormSubmit} variant="gradient" color="dark">
            Guardar
          </MDButton>
        </DialogActions>
      </Dialog>
      {editModal}
    </Card>
  );
}

export default Projects;
