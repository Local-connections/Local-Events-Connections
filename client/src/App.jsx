// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./Components/Layout";
import { Route, Routes } from "react-router";
import CreateEvent from "./pages/CreateEvent";
import Events from "./pages/Events";
import EditEvent from "./pages/EditEvent";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id/edit" element={<EditEvent />} />
      </Route>
    </Routes>
  );
}

export default App;
