import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onCloseOverlay, onConfirmDelete }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onConfirmDelete();
  }

  return (
    <PopupWithForm
      name="remove-card"
      title="Вы уверены?"
      buttonText="Удалить"
      isOpen={isOpen}
      onClose={onClose}
      onCloseByOverlay={onCloseOverlay}
      onSubmit={handleSubmit}>
    </PopupWithForm>
  );
}

export default ConfirmPopup;