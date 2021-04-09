import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar, onCloseOverlay}) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
    	name="update-avatar"
		  title="Обновить аватар"
      buttonText="Обновить аватар"
		  isOpen={isOpen}
      onClose={onClose}
      onCloseByOverlay={onCloseOverlay}
      onSubmit={handleSubmit}>
		<input
			className="popup__field popup__field_type_avatar"
			type="url"
			name="avatar-edit"
			placeholder="Ссылка на изображение"
			required
      ref={avatarRef}
		/>
		<span className="error" id="avatar-edit-error" />
	  </PopupWithForm>
  );
}

export default EditAvatarPopup;