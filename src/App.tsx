import Dashboard from "./pages.tsx/Dashboard";
import LoginPage from "./pages.tsx/login";
import { Routes, Route } from "react-router";
import Upload from "./pages.tsx/Upload";

function App() {
  return (
    // <div>
    //   <Dashboard />
    //   <LoginPage />
    // </div>

    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>

  );
}

export default App;