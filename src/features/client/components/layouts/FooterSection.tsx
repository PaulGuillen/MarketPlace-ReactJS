import "../../../../styles/FooterSection.css";

const FooterSection = () => {
  return (
    <footer className="bg-gray-800 text-white">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8 px-4 border-b border-gray-700">
        <div className="text-center">
          <span className="text-3xl">🏬</span>
          <p className="font-semibold text-lg mt-2">Retiro en Tienda</p>
          <small className="text-gray-400">
            Más de 30 tiendas a lo largo de Perú
          </small>
        </div>
        <div className="text-center">
          <span className="text-3xl">📞</span>
          <p className="font-semibold text-lg mt-2">Atención al Cliente</p>
          <small className="text-gray-400">
            Escríbenos al número +51 970 311 999
          </small>
        </div>
        <div className="text-center">
          <span className="text-3xl">🛡️</span>
          <p className="font-semibold text-lg mt-2">Extragarantía</p>
          <small className="text-gray-400">
            Prolonga la garantía de tus productos
          </small>
        </div>
        <div className="text-center">
          <span className="text-3xl">🔄</span>
          <p className="font-semibold text-lg mt-2">Devolución</p>
          <small className="text-gray-400">Cambios y Devoluciones</small>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 py-8 px-4">
        <div>
          <h3 className="font-semibold text-lg mb-4">Compra con Confianza</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-300">
                ¿Cómo comprar en Tienda.com?
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Guías de Compra
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Términos y Condiciones
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Cambios y Devoluciones
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Bases Legales
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Seguridad y Privacidad
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Sobre Tienda</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-300">
                Portal de Personas
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                ¿Quiénes Somos?
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Nuestras Tiendas
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Trabaja con nosotros
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Reporte de Sostenibilidad 2021
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Más de Tienda</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-300">
                Banco Tienda
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Tarjeta Tienda
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Cyber Wow
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Cyber Day Chile
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Medios de Pago</h3>
          <p className="text-gray-400">
            Iconos de tarjetas y métodos de pago aquí
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Síguenos</h3>
          <div className="flex space-x-4 text-gray-400">
            <a href="#" className="hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
