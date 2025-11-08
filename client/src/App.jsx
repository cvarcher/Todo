import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Todo from "./pages/Todo/Todo"
import Profile from "./pages/Profile/Profile"
import AddTask from "./components/AddTask";
import { ListTodo } from "lucide-react";
import ListTodos from "./components/ListTodos";
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
                    <Route path="/profile" element={<Profile />} />
                    <Route path = "/addTask" element ={<AddTask/>}/>

                    <Route path="/tasks/todo" element={<ListTodos type="todo" />} />
                    <Route path="/tasks/completed" element={<ListTodos type="completed" />} />

                </Routes>
            </Router>
        
    );
}

export default App;
