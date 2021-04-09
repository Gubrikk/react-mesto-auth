import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser, onCloseOverlay}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  },  [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ 	name, description });
  }
  
  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onCloseByOverlay={onCloseOverlay}
      onSubmit={handleSubmit}>
    <input
      className="popup__field popup__field_type_name"
      type="text"
      name="name"
      placeholder="Имя"
      required
      minLength="2"
       maxLength="40"
      value={name || ''}
      onChange={handleNameChange}
    />
    <span className="error" id="name-error" />
    <input
      className="popup__field popup__field_type_job"
      type="text"
      name="description"
      placeholder="О Себе"
      required
      minLength="2"
      maxLength="200"
      value={description || ''}
      onChange={handleDescriptionChange}
    />
    <span className="error" id="job-error" />
  </PopupWithForm>
  )
}

export default EditProfilePopup;