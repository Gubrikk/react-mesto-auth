import React from 'react';
import successIcon from '../images/tooltip-done.svg';
import errorIcon from '../images/tooltip-error.svg';

export default function InfoTooltip({ isOpen, onClose, onCloseOverlay, isSuccessAuth, name }) {
  
  const resultIcon = isSuccessAuth ? successIcon : errorIcon
  const resultText = isSuccessAuth ?  "Вы успешно зарегистрировались!": 
                                      "Что-то пошло не так! Попробуйте ещё раз."

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onCloseOverlay}>
      <div className="popup__container">
        <img src={resultIcon} className="popup__icon" alt="Результат авторизации" />
        <p className="popup__text">{resultText}</p>
        <button type="button" aria-label="Close" className="popup__close-icon" onClick={onClose}/>
      </div>
    </div>
  )
}