import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup ({isOpen, onClose, onCloseOverlay, onAddPlace}) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();
  
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value
    });
  }

  React.useEffect(() => {
    nameRef.current.value = '';
    linkRef.current.value = '';
  }, [isOpen]);
  

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      buttonText="Добавить место"
      isOpen={isOpen}
      onClose={onClose}
      onCloseByOverlay={onCloseOverlay}
      onSubmit={handleSubmit}>
    <input
      className="popup__field popup__field_type_new-place"
      type="text"
      name="new-place"
      placeholder="Название"
      required
       maxLength="30"
      ref={nameRef}
    />
    <span className="error" id="new-place-error" />
    <input
      className="popup__field popup__field_type_link-image"
      type="url"
      name="link-image"
      placeholder="Ссылка на картинку"
      required
       ref={linkRef}
    />
    <span className="error" id="link-image-error" />
    </PopupWithForm>
    );
}

export default AddPlacePopup;