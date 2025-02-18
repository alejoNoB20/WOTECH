import "./Loader.css"
const Loader = () => {
  return (
    <>
      <section className="fixed inset-0 bg-gray-100 opacity-60 h-screen w-screen z-40"></section>
      <div className="preloader z-50"></div>
    </>
  )
}
export default Loader
