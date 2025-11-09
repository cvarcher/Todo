import { React, useState } from "react";
import { Plus } from "lucide-react"; // icon library, optional
import {
    useGetTodos,
    usegetTodoById,
    useDelete,
    useUpdate,
} from "../hooks/useTodos";
import { useNavigate ,Link} from "react-router-dom";
import dele from "../assets/dele.png";
import editing from "../assets/editing.png";

const ListTodos = () => {
    const { Todos, isLoading, error } = useGetTodos();
    const [selectedTodoId, setSelectedTodoId] = useState(null);
    const { mutate: deleteTask } = useDelete(); //destructure mutuationDel
    const mutationUpdate = useUpdate(); //destructure mutuationUpdate
    const { TodoById} =
        usegetTodoById(selectedTodoId);
    const navigate = useNavigate();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading tasks</div>;

    if (!Todos || Todos.length === 0) {
        return (
            <div className="flex min-h-screen justify-center items-start overflow-hidden bg-gray-50">
                <div className="w-full max-w-2xl mr-8 flex flex-col items-center space-y-6 mt-10">
                     
                        <>
                            <p className="font-semibold text-center text-gray-500 text-xl">
                                No tasks available.
                            </p>
                            <Link
                                to="/addTask"
                                className="flex bg-[#0d4a84] text-white hover:bg-blue-800 gap-2 p-3 rounded-2xl font-medium items-center justify-center"
                            >
                                Add Task
                            </Link>
                        </>
                    
                        <>
                            <p className="font-semibold text-center text-gray-500 text-xl">
                                You haven’t completed any tasks yet!
                            </p>
                            <Link
                                to="/tasks/todo"
                                className="flex bg-purple-400  text-white hover:bg-[#a6a0d2]  p-2 rounded-2xl font-medium items-center justify-center"
                            >
                                Go to Tasks
                            </Link>
                        </>
                    
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen justify-center items-start  overflow-hidden bg-gray-50">
            <div className="w-full max-w-2xl  mr-8">
                {/* Header */}
                <h2 className="text-3xl font-bold mb-6 mt-10">Inbox</h2>

                {/* Task List */}
                <div className="space-y-4">
                    {Todos.map((todo) => (
                        <div
                            key={todo.task_id}
                            onClick={() => setSelectedTodoId(todo.task_id)}
                            className="cursor-pointer"
                        >
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    name="task"
                                    checked={todo.is_completed}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={() => {
                                        mutationUpdate.mutate({
                                            id: todo.task_id,
                                            updatedData: {
                                                is_completed:
                                                    !todo.is_completed,
                                            },
                                        });
                                    }}
                                    className="mt-1 w-5 h-5 text-gray-400 border-gray-300 focus:ring-0"
                                />
                                <div
                                    className="w-full cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/tasks/${todo.task_id}`); //for editinggtodo
                                        setSelectedTodoId(todo.task_id);
                                    }}
                                >
                                    {todo.task_desc && (
                                        <div className="flex justify-between align-center gap-2">
                                            <div
                                                className={`text-md text-gray-600 ${
                                                    todo.is_completed
                                                        ? "line-through text-gray-400"
                                                        : ""
                                                }`}
                                            >
                                                {todo.task_desc}
                                            </div>
                                            <div className="flex gap-5">
                                                <p
                                                    style={{
                                                        color: todo.is_completed
                                                            ? "green"
                                                            : "red",
                                                    }}
                                                >
                                                    {todo.is_completed
                                                        ? "completed"
                                                        : "In progress"}
                                                </p>

                                                <img
                                                    src={dele}
                                                    alt="delete"
                                                    className="w-6"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // optional, prevent triggering parent onClick
                                                        deleteTask(
                                                            todo.task_id,
                                                        );
                                                    }}
                                                />
                                                <img
                                                    src={editing}
                                                    alt="edit"
                                                    className="w-5"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/tasks/edit/${todo.task_id}`)
                                                        }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr className="mt-3 border-gray-200" />
                        </div>
                    ))}
                </div>

                {/* tododescription */}
                {selectedTodoId && (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-black/50  z-50"
                        onClick={() => {
                            setSelectedTodoId(null);
                            navigate("/tasks");
                        }}
                    >
                        <div
                            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative animate-fadeIn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => {
                                    setSelectedTodoId(null);
                                    navigate("/tasks");
                                }}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ✕
                            </button>

                            {/* Header */}
                            <div className="mb-4 border-b pb-3">
                              <h2 className="text-2xl font-semi-bold">Task</h2>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                                    {TodoById?.task_desc || "Untitled Task"}
                                </h2>
                            </div>

                            

        

                            

                            {/* Task Meta Info */}
                                <div className="flex justify-between">
                                    <span className="font-medium">Status</span>
                                    <span
                                        className={`font-semibold ${
                                            TodoById?.is_completed
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {TodoById?.is_completed
                                            ? "Completed"
                                            : "In Progress"}
                                    </span>

                                          {TodoById?.is_completed
                                        //   ?<span>{TodoById.completed_at.split('T')[0]}</span>
                                          && <span className="font-semibold text-[15px]">Completed  at : {TodoById.created_at.split('T')[0]}</span>
}
                                </div>

    

                                                </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListTodos;
