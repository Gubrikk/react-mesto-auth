import React from 'react';

function PopupWithForm({name, 
                        title,
                        children, 
                        isOpen, 
                        onClose,
                        onCloseByOverlay,
                        onSubmit,
                        buttonText}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onCloseByOverlay}>
    <div className="popup__container" >
      <button type="button" aria-label="Close" className="popup__close-icon" onClick={onClose}/>
      <h5 className="popup__title">{title}</h5>
      <form className="popup__form" name={name} onSubmit={onSubmit}>
        {children}
        <button className="popup__submit-button" type="submit" aria-label="Сохранить">{buttonText}</button>
      </form>
    </div>
    </div>
  );
}

export default PopupWithForm;
