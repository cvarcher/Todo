import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Todo from "./pages/Todo/Todo"
function App() {
    return (
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                    </Route>
                    <Route index element={<Home />} />
                    <Route path="/todo" element={<Todo />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/signup" element={<SignUp />} />
                </Routes>
            </Router>
        
    );
}

export default App;
