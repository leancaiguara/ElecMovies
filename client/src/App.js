//react-router

import { BrowserRouter as Router, Route, Routes, Switch, Navigate } from "react-router-dom";

//views
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { User } from "./views/User";
import { MovieDetails } from "./views/MovieDetails";

export function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} />
          <Route exact path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </div>
    </Router>
  );
}
