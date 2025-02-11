import Dashboard from "./pages.tsx/Dashboard";
import LoginPage from "./pages.tsx/login";
import { Routes, Route } from "react-router";
import Upload from "./pages.tsx/Upload";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    // <div>
    //   <Dashboard />
    //   <LoginPage />
    // </div>

    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        }
      />
    </Routes>

  );
}

export default App;