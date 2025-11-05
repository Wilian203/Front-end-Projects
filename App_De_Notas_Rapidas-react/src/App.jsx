import Formulario from "./components/Formulario";
function App() {
  return (
    <>
      <header className="py-3 text-center bg-white shadow-sm">
        <h1 className="h3 fw-semibold mb-0">Gestor de Notas</h1>
      </header>

      <main className="container">
        <Formulario />
      </main>

      <footer className="text-center py-4 mt-5 text-muted small">
        <p className="mb-0">
          © 2025 Gestor de Notas | Desarrollado React y Bootstrap 5
        </p>
      </footer>
    </>
  );
};

export default App;
