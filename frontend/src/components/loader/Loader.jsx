import "./Loader.css";
const Loader = () => {
  return (
    <>
      <section className="fixed inset-0 bg-gray-100 opacity-60 h-screen w-screen z-40"></section>
      <div>
        <div className="preloader z-50"></div>

        <p className="z-50">
          Esta acción puede tardar unos segundos, porfavor espere.
        </p>
      </div>
    </>
  );
};
export default Loader;
