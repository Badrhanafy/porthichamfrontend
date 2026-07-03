import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./admin/AdminLayout";
import AdminAddProject from "./admin/AdminAddProject";
import Projects from "./components/ProjectsGallery";
import Categories from "./components/Categories";
import CategoryProjects from "./components/CategoryProjects";
import Navbar from "./Navbar";
import AddCategory from "./admin/Addcategory";
import About from "./About";
import Login from "./Login";
import Signup from "./Signup";
import Contact from "./Contact";
import Footer from "./Footer";

function HomePage() {
  return (
    <>
      <About />
      <Categories />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#191919] min-h-screen">
        <Navbar />

        <div className="mt-16">
          <Routes>
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminAddProject />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="add-project" element={<AdminAddProject />} />
            </Route>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />

            {/* Homepage */}
            <Route path="/" element={<HomePage />} />

            {/* Public routes */}
            <Route path="/category/:slug" element={<CategoryProjects />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/Contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;