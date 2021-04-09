import React from 'react';
import successIcon from '../images/tooltip-done.svg';
import errorIcon from '../images/tooltip-error.svg';

export default function InfoTooltip({ isOpen, onClose, onCloseOverlay, isSuccessAuth, name }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onCloseOverlay}>
      <div className="popup__container">
        {isSuccessAuth
          ? (<>
              <img src={successIcon} className="popup__icon" alt="success img" />
              <p className="popup__text">Вы успешно зарегистрировались!</p>
            </>)
          : (<>
              <img src={errorIcon} className="popup__icon" alt="error img" />
              <p className="popup__text">Что-то пошло не так! Попробуйте ещё раз.</p>
            </>)
        }
        <button type="button" aria-label="Close" className="popup__close-icon" onClick={onClose}/>
      </div>
    </div>
  )
}