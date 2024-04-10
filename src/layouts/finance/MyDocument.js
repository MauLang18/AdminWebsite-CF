import React from "react";
import PropTypes from "prop-types";

function MyDocument({ record }) {
  return (
    <div>
      {record.estadoCuenta ? (
        <object data={record.estadoCuenta} type="application/pdf" width="100%" height="600px">
          <p>
            <a href={record.estadoCuenta}>Estado de Cuenta</a>.
          </p>
        </object>
      ) : (
        <p>No se encontró el estado de cuenta.</p>
      )}
      <p>
        <a href={record.estadoCuenta} target="_blank" rel="noopener noreferrer">
          Descargar Estado de Cuenta (PDF)
        </a>
      </p>
    </div>
  );
}

MyDocument.propTypes = {
  record: PropTypes.string.isRequired,
};

export default MyDocument;
