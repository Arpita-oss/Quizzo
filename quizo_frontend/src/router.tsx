import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateEditQuiz from "./pages/CreateEditQuiz";
import Signup from "./pages/Signup";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateEditQuiz />} />
        <Route path="/edit/:id" element={<CreateEditQuiz />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
