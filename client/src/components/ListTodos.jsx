import { React, useState } from "react";
import { Plus } from "lucide-react"; // icon library, optional
import { useGetTodos } from "../hooks/useTodos";
import { usegetTodoById } from "../hooks/useTodos";
import { useDelete } from "../hooks/useTodos";
import dele from "../assets/dele.png";
import editing from "../assets/editing.png";




const ListTodos = () => {
    const { Todos, isLoading, error } = useGetTodos();
    const [selectedTodoId, setSelectedTodoId] = useState(null);
    const {mutate:deleteTask} = useDelete()

    const { TodoById, isLoading: isTodoLoading } =
        usegetTodoById(selectedTodoId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading tasks</div>;
    if (Todos.length === 0 || !Todos)
        return (
            <div className="text-center flex flex-col font-semibold text-xl mt-5">
                <p>No tasks availabe.</p>
                <div>
                    <button
                        className=" flex text-red-500 hover:text-red-600 gap-2 mt-2 font-medium"
                        // onClick={() =>
                        //   setTasks([
                        //     ...tasks,
                        //     { id: tasks.length + 1, title: "new task", description: "" },
                        //   ])
                        // }
                    >
                        <Plus size={18} />
                        Add task
                    </button>
                </div>
            </div>
        );

    return (
        <div className="max-w-md mx-auto mt-12">
            {/* Header */}
            <h2 className="text-3xl font-bold mb-6">Inbox</h2>

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
                                type="radio"
                                name="task"
                                className="mt-1 w-5 h-5 text-gray-400 border-gray-300 focus:ring-0"
                            />
                            <div className="w-full">
                                {todo.task_desc && (
                                    <div className="flex justify-between align-center gap-2">
                                        <div className="text-md text-gray-600">
                                            {todo.task_desc}
                                        </div>
                                        <div className="flex gap-5">
                                          <img
                                            src={dele}
                                            alt="delete"
                                            className="w-6"
                                            onClick={(e)=>{
                                                  e.stopPropagation(); // optional, prevent triggering parent onClick
                                              deleteTask(todo.task_id)
                                            }}
                                        />
                                    <img src={editing} alt="edit" className="w-5"/>
                                        </div>

                                    </div>
                                )}
                                
                            </div>
                        </div>
                        <hr className="mt-3 border-gray-200" />
                    </div>
                ))}

                {/* Add Task Button */}
            </div>
            {/* tododescription */}
            {/* {selectedTodoId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        {isTodoLoading ? (
                            <div>Loading...</div>
                        ) : TodoById ? (
                            <div>
                                <h3 className="text-xl font-bold">
                                    {TodoById.task_desc}
                                </h3>
                                <p>
                                    Status:{" "}
                                    {TodoById.is_completed ? "Done" : "Pending"}
                                </p>
                                <button
                                    className="mt-4 text-red-500"
                                    onClick={() => setSelectedTodoId(null)}
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <div>No details available</div>
                        )}
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default ListTodos;
