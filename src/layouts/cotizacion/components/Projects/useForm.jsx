import React, { useState } from "react";
import { helpHttp } from "layouts/cotizacion/components/Projects/helpHttp";

export const useForm = (initialForm, validateForm, closeModal) => {
  const [form, setForm] = useState(initialForm);
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrores(validateForm(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrores(validateForm(form));

    if (Object.keys(errores).length === 0) {
      setLoading(true);
      helpHttp()
        .post("https://formsubmit.co/ajax/pricing@castrofallas.com", {
          body: form,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          setLoading(false);
          const confirmacion = window.confirm("¿Deseas realizar otra cotización?");
          if (confirmacion) {
            setForm(initialForm);
          } else {
            closeModal();
          }
          setResponse(true);
        });
      // helpHttp()
      //   .post("https://apiadmin.tranquiexpress.com/api/Auth/Login", {
      //     body: form,
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //     },
      //   })
      //   .then((res) => {
      //     console.log(res.data);
      //   });
    } else {
      return;
    }
  };

  return {
    form,
    errores,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
