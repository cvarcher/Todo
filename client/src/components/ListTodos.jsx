import React from "react";
import { Plus } from "lucide-react"; // icon library, optional
import { useGetTodos } from "../hooks/useTodos";


const ListTodos = () => {
  const {Todos, isLoading,error}=useGetTodos();
 

if(isLoading) return <div>Loading...</div>;
if(error) return <div>Error loading tasks</div>;
if(Todos.length===0|| !Todos) return <div>No tasks available</div>

  return (
    <div className="max-w-md mx-auto mt-12">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6">Inbox</h2>

      {/* Task List */}
      <div className="space-y-4">
        {Todos.map((todo) => (
          <div key={todo._id}>
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="task"
                className="mt-1 w-5 h-5 text-gray-400 border-gray-300 focus:ring-0"
              />
              <div>
                {todo.task_desc && (
                  <p className="text-sm text-gray-400">{todo.task_desc}</p>
                )}
              </div>
            </div>
            <hr className="mt-3 border-gray-200" />
          </div>
        ))}

        {/* Add Task Button */}
        <button
          className="flex items-center text-red-500 hover:text-red-600 gap-2 mt-2 font-medium"
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
};

export default ListTodos;
