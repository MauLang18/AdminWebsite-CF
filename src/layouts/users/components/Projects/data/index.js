/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable"; // Reemplaza esto con tu componente DataTable
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function data() {
  const [users, setUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [cliente, setCliente] = useState("");
  const [rol, setRol] = useState("");
  const [estado, setEstado] = useState("");

  const token = localStorage.getItem("bearer");

  useEffect(() => {
    // Fetch para obtener datos de la API
    fetch("https://api.logisticacastrofallas.com/api/Usuario", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data.data.items))
      .catch((error) => console.error("Error fetching users:", error));
  }, [token]);

  const handleDeleteUser = (userId) => {
    // Lógica para eliminar usuario con el ID proporcionado
    fetch(`https://api.logisticacastrofallas.com/api/Usuario/Remove/${userId}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualizar la lista de usuarios después de eliminar
        setUsers(users.filter((user) => user.id !== userId));
        console.log("User deleted successfully:", data);
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const openEditDialog = (userId) => {
    setSelectedUserId(userId);

    // Buscar los detalles del usuario correspondiente utilizando el ID
    fetch(`https://api.logisticacastrofallas.com/api/Usuario/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Llenar el formulario del modal con los datos del usuario
        setNombre(data.data.nombre);
        setApellido(data.data.apellido);
        setCorreo(data.data.correo);
        setContraseña(data.data.pass); // Asegúrate de que 'contraseña' sea el nombre correcto del campo
        setCliente(data.data.cliente);
        setRol(data.data.idRol);
        setEstado(data.data.estado);
        setSelectedImage(data.data.imagen);
      })
      .catch((error) => console.error("Error fetching user details:", error));

    setOpenDialog(true);
  };

  const closeEditDialog = () => {
    setOpenDialog(false);
  };

  const handleFormSubmit = () => {
    // Crear un nuevo objeto FormData
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("correo", correo);
    formData.append("pass", contraseña);
    formData.append("cliente", cliente);
    formData.append("idRol", rol);
    formData.append("estado", estado);

    // Agregar la imagen si está seleccionada
    if (selectedImage) {
      formData.append("imagen", selectedImage);
    }

    // Realizar la solicitud al servidor
    fetch(`https://api.logisticacastrofallas.com/api/Usuario/Update/${selectedUserId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User updated successfully:", data);
        // Actualizar la lista de usuarios con los datos actualizados
        setUsers(users.map((user) => (user.id === selectedUserId ? updatedUserData : user)));
        setOpenDialog(false); // Cerrar el modal después de la actualización
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  return {
    columns: [
      { Header: "imagen", accessor: "imagen", align: "left" },
      { Header: "nombre", accessor: "nombre", align: "left" },
      { Header: "apellido", accessor: "apellido", align: "center" },
      { Header: "correo", accessor: "correo", align: "center" },
      { Header: "cliente", accessor: "cliente", align: "center" },
      { Header: "estado", accessor: "estado", align: "center" },
      {
        Header: "Acciones",
        accessor: "id",
        Cell: ({ value }) => (
          <>
            <MDButton
              variant="outlined"
              color="primary"
              onClick={() => openEditDialog(value)}
              mr={1}
            >
              Editar
            </MDButton>
            <MDButton variant="outlined" color="error" onClick={() => handleDeleteUser(value)}>
              Eliminar
            </MDButton>
          </>
        ),
      },
    ],
    rows: users.map((user) => ({
      imagen: <img src={user.imagen} alt="imagen" />, // Asegúrate de que la propiedad 'imagen' contenga la URL de la imagen del usuario
      nombre: <MDTypography variant="caption">{user.nombre}</MDTypography>,
      apellido: <MDTypography variant="caption">{user.apellido}</MDTypography>,
      correo: <MDTypography variant="caption">{user.correo}</MDTypography>,
      cliente: <MDTypography variant="caption">{user.cliente}</MDTypography>,
      estado: (
        <MDTypography variant="caption">{user.estado === 1 ? "Activo" : "Inactivo"}</MDTypography>
      ),
      id: user.id,
    })),

    // Modal de edición de usuario
    editModal: (
      <Dialog open={openDialog} onClose={closeEditDialog}>
        <DialogTitle>Editar Usuario</DialogTitle>
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
          <MDButton onClick={closeEditDialog}>Cancelar</MDButton>
          <MDButton onClick={handleFormSubmit} variant="gradient" color="dark">
            Guardar
          </MDButton>
        </DialogActions>
      </Dialog>
    ),
  };
}
