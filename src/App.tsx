// src/App.tsx
import { Header } from "./components/Header";
import { MathAssistantPage } from "./pages/MathAssistantPage";
import "./index.css"; // Make sure we have Tailwind styles

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <MathAssistantPage />
      </main>
      <footer className="mt-12 py-6 bg-white border-t bottom-0 fixed w-full">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} MathsAssist AI - Your Mathematics Teaching
          Companion
        </div>
      </footer>
    </div>
  );
}

export default App;
