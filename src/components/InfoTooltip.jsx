import confirm from "../images/confirm.svg";
import reject from "../images/reject.svg";
const InfoTooltip = ({ isProve, isOpen, onClose, confirmText, rejectText }) => {
  return (
    <div className={`popup popup_register-info ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_register-info">
        <button onClick={onClose} className="popup__button-close" />
        <img className="popup__icon" src={isProve ? confirm : reject} alt={isProve ? "confirm-icon" : "reject-icon"} />
        <p className="popup__title popup__title_register-info"> {isProve ? confirmText : rejectText} </p>
      </div>
    </div>
  );
};

export default InfoTooltip;
