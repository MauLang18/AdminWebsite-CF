import React, { useState } from "react";
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import MDAvatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

const Avatars = ({ members }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleAvatarClick = (image) => {
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {members.map(([image, name]) => (
        <Tooltip key={name} title={name} placement="bottom">
          <MDAvatar
            src={image}
            alt={name}
            size="xs"
            sx={{
              border: ({ borders: { borderWidth }, palette: { white } }) =>
                `${borderWidth[2]} solid ${white.main}`,
              cursor: "pointer",
              position: "relative",
              marginRight: "8px", // Espacio entre avatares
              marginBottom: "8px", // Espacio entre filas de avatares
            }}
            onClick={() => handleAvatarClick(image)}
          />
        </Tooltip>
      ))}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          {selectedImage && (
            <img src={selectedImage} alt="avatar" style={{ maxWidth: "100%", height: "auto" }} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

Avatars.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ).isRequired,
};

export default Avatars;
