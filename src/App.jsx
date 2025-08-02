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
import BaseTemplate from "./components/BaseTemplate";
import CreateAuthor from "./pages/CreateAuthor";
import AuthorDetail from "./pages/AuthorDetails";
import BookDetails from "./pages/BookDetails";
import UserProfile from "./pages/Profile";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route element={<BaseTemplate />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<BookCatalog />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/authors" element={<AuthorCatalog />} />
            <Route path="/authors/:id" element={<AuthorDetail />} />
            <Route path="/add-author" element={<CreateAuthor />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
