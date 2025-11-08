import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

//get data from backend
export const fetchTodos = async () => {
    try {
        const res = await axios.get(`${API_URL}tasks`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
    }
};

//post data to backend
export const createTodo = async (todo) => {
    try {
        const res = await axios.post(`${API_URL}tasks`, todo, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
    } catch (error) {}
};

//get completedTodos
export const fetchcompletedTodos = async()=>{
    try {
        const res=await axios.get(`${API_URL}tasks_completed/today`,{
            headers:{
                Authorization :`Bearer ${localStorage.getItem("access_token")}`
            }
        })
        console.log(res.data)
        return res.data||[]

    }catch(error){
        console.log("error displaying completed todo for today")
    }
}

//get specific todo
export const fetchTodoById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("error fetching todo by id:", error);
        throw error;
    }
};

//delete todo by id
export const deleteTodo = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        console.log(res.data);
        return res.data;
    } catch (error) {}
};

//for updating todo
export const updateTodo = async (todo, id) => {
    try {
        await axios.patch(`${API_URL}tasks/${id}`, todo, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
    } catch (error) {
        console.error("error updating todo:", error);
    }
}

//get user profile
export const fetchUserProfile = async(email)=>{
    try {
        const response = await axios.get(`${API_URL}user/${email}`,{
        headers: {
             Authorization :`Bearer ${localStorage.getItem("access_token")}`
        }

    })

    return response.data
}catch(error){
        console.error('no user found')}
}
