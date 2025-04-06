const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 w-full bottom-0 z-20 border-t-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row md:mx-10 justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm text-center sm:text-left">
            © 2025 Wotech - Carpentry Manager. Todos los derechos reservados.
          </div>
          <div className="flex gap-x-4">
            <a
              href="mailto:alejoviviani12@gmail.com?Subject=Consulta%20sobre%20servicios%20de%20desarrollo%20web"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors duration-200"
            >
              <img
                src="/Gmail_icon_w.svg"
                alt="GitHub Icon"
                className="w-5 h-5 md:w-8 md:h-8"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/alejo-viviani/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors duration-200"
            >
              <img
                src="/LinkedIn_icon_w.svg"
                alt="LinkedIn Icon"
                className="w-5 h-5 md:w-8 md:h-8"
              />
            </a>
            <a
              href="https://www.github.com/AlejoNoB20"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors duration-200"
            >
              <img
                src="/Github_icon_w.svg"
                alt="Github Icon"
                className="w-5 h-5 md:w-8 md:h-8"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
