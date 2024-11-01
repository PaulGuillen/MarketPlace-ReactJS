import React from 'react';
import '../../../styles/FooterSection.css';

const FooterSection = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-feature">
          <span>🏬</span>
          <p>Retiro en Tienda</p>
          <small>Más de 30 tiendas a lo largo de Perú</small>
        </div>
        <div className="footer-feature">
          <span>📞</span>
          <p>Atención al Cliente</p>
          <small>Escríbenos al número +51 970 311 999</small>
        </div>
        <div className="footer-feature">
          <span>🛡️</span>
          <p>Extragarantía</p>
          <small>Prolonga la garantía de tus productos</small>
        </div>
        <div className="footer-feature">
          <span>🔄</span>
          <p>Devolución</p>
          <small>Cambios y Devoluciones</small>
        </div>
        <div className="footer-feature">
          <img src="path/to/claim_book_image.png" alt="Libro de Reclamaciones" />
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-column">
          <h3>Compra con Confianza</h3>
          <ul>
            <li><a href="#">¿Cómo comprar en Ripley.com?</a></li>
            <li><a href="#">Guías de Compra</a></li>
            <li><a href="#">Términos y Condiciones</a></li>
            <li><a href="#">Cambios y Devoluciones</a></li>
            <li><a href="#">Bases Legales</a></li>
            <li><a href="#">Seguridad y Privacidad</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Sobre Ripley</h3>
          <ul>
            <li><a href="#">Portal de Personas</a></li>
            <li><a href="#">¿Quiénes Somos?</a></li>
            <li><a href="#">Nuestras Tiendas</a></li>
            <li><a href="#">Trabaja con nosotros</a></li>
            <li><a href="#">Reporte de Sostenibilidad 2021</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Más de Ripley</h3>
          <ul>
            <li><a href="#">Banco Ripley</a></li>
            <li><a href="#">Tarjeta Ripley</a></li>
            <li><a href="#">Cyber Wow</a></li>
            <li><a href="#">Cyber Day Chile</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Medios de Pago</h3>
          <p>Iconos de tarjetas y métodos de pago aquí</p>
        </div>
        <div className="footer-column">
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
