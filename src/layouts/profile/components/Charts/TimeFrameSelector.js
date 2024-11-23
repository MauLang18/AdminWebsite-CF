import React from "react";
import PropTypes from "prop-types"; // Importa prop-types
import {
  Grid,
  Card,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export const TimeFrameSelector = ({ onTimeFrameChange, selectedTimeFrame }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="time-frame-label">Seleccionar Período</InputLabel>
      <Select
        labelId="time-frame-label"
        value={selectedTimeFrame} // Aquí vinculas el valor seleccionado con el estado del componente principal
        onChange={(e) => onTimeFrameChange(e.target.value)} // Llamas al manejador para actualizar el estado
        label="Seleccionar Período"
      >
        <MenuItem value="year">Año</MenuItem>
        <MenuItem value="month">Mes</MenuItem>
        <MenuItem value="quarter">Trimestre</MenuItem>
      </Select>
    </FormControl>
  );
};

// Agregar validación para las props
TimeFrameSelector.propTypes = {
  onTimeFrameChange: PropTypes.func.isRequired, // Asegurarte de que es una función
  selectedTimeFrame: PropTypes.string.isRequired, // El valor seleccionado debe ser una cadena
};
