import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProvider from "./context/UserProvider";
import Home from "./pages/Home";
import About from "./pages/About";
import BookCatalog from "./pages/BookCatalog";
import AuthorCatalog from "./pages/AuthorCatalog";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/Signup";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<BookCatalog />} />
          <Route path="/authors" element={<AuthorCatalog />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
