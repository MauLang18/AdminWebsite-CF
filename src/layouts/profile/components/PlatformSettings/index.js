import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function ImageCarousel() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.logisticacastrofallas.com/api/Multimedia/Select")
      .then((response) => {
        if (response.data.isSuccess && Array.isArray(response.data.data)) {
          setImages(response.data.data);
        } else {
          console.error("La respuesta de la API no es válida:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Muestra 3 imágenes a la vez
    slidesToScroll: 1,
    centerMode: true, // Activa el modo centrado
    centerPadding: "0", // Sin padding en los lados
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // En pantallas pequeñas, muestra 1 imagen a la vez
          centerMode: false,
        },
      },
    ],
  };

  return (
    <MDBox p={2}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} style={{ padding: "20px" }}>
            <img
              src={image.description}
              alt={`Image ${index}`}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ))}
      </Slider>
    </MDBox>
  );
}

export default ImageCarousel;
