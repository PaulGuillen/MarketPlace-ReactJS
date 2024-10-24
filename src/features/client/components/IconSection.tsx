
import assistantImage from "../../../assets/icon_assistant.png";
import deliveryImage from "../../../assets/icon_delivery.png";
import percentImage from "../../../assets/icon_percent.png";
import safeImage from "../../../assets/icon_safe.png";
import "../../../styles/IconSection.css"; 

const IconSection = () => {
    return (
        <section className="icon-container">
        <div className="icon-item">
          <img src={deliveryImage} alt="Delivery image" />
          <p>Delivery seguro</p>
        </div>
        <div className="icon-item">
          <img src={percentImage} alt="Percent image" />
          <p>Confianza</p>
        </div>
        <div className="icon-item">
          <img src={safeImage} alt="Safe image" />
          <p>Compra seguro</p>
        </div>
        <div className="icon-item">
          <img src={assistantImage} alt="Assistant image" />
          <p>Necesitas ayuda?</p>
        </div>
      </section>
    )
}

export default IconSection