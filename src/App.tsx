import "./App.css";
import ProductList from "./ProductList";

function App() {
  return (
    <>
      <nav className="absolute top-0 left-0 flex items-center justify-between w-full px-20 pt-4">
        <a className="text-white font-normal">Function</a>
        <a className="text-white font-normal">Collection</a>
        <a className="text-white font-normal">Configuration</a>
        <a className="text-white font-normal">About</a>
      </nav>
      <main className="flex flex-col grow">
        <section
          style={{
            backgroundImage: "url('/hero-image.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="h-screen pt-32 pl-20"
        >
          <h1>
            <span className="block">Your workspace.</span>
            <span className="block">Reinvented.</span>
          </h1>
        </section>
        <section className="px-20 py-12 bg-gray-100">
          <h2 className="text-3xl font-semibold text-black">Our products.</h2>
          <ProductList />
        </section>
      </main>
    </>
  );
}

export default App;
