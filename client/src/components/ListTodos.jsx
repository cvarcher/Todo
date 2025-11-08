import {React,useState} from "react";
import { Plus } from "lucide-react"; // icon library, optional
import { useCompletedTodos, useGetTodos } from "../hooks/useTodos";
import { usegetTodoById } from "../hooks/useTodos";
import Siderbar from "./Siderbar";

const ListTodos = ({type}) => {

  const getTodosHook = useGetTodos();
  const completedTodosHook = useCompletedTodos();

  const isType = type === "todo";

  const tasks = isType? getTodosHook.Todos : completedTodosHook.CompletedTodos

  const isLoading = isType? getTodosHook.isLoading: completedTodosHook.isLoading
  const error = isType?getTodosHook.error : completedTodosHook.error

const [selectedTodoId, setSelectedTodoId] = useState(null);
  const{TodoById,isLoading:isTodoLoading}=usegetTodoById(selectedTodoId);


if(isLoading) return <div>Loading...</div>;
if(error) return <div>Error loading tasks</div>;


 if (!tasks || tasks.length === 0) {
    return (
      <div className="flex min-h-screen justify-center items-start overflow-hidden bg-gray-50">
        <Siderbar />
        <div className="w-full max-w-2xl mr-8 flex flex-col items-center space-y-6 mt-10">
          {isType ? (
            <>
              <p className="font-semibold text-center text-gray-500 text-2xl">
                No tasks available.
              </p>
              <a
                href="/addTask"
                className="flex bg-red-700 text-white hover:bg-red-900 gap-2 p-2 rounded-2xl font-medium items-center justify-center"
              >
                <Plus size={16} />
                Add Task
              </a>
            </>
          ) : (
            <>
              <p className="font-semibold text-center text-gray-500 text-2xl">
                You haven’t completed any tasks yet!
              </p>
              <a
                href="/tasks/todo"
                className="flex bg-green-700 text-white hover:bg-green-900 gap-2 p-2 rounded-2xl font-medium items-center justify-center"
              >
                Go to Tasks
              </a>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen justify-center items-start  overflow-hidden bg-gray-50">
    <Siderbar/>
    <div className="w-full max-w-2xl  mr-8">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 mt-10">Inbox</h2>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((todo) => (
          <div key={todo._id}
onClick={() => setSelectedTodoId(todo.task_id)}
          className="cursor-pointer"
          >
            
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="task"
                className="mt-1 w-5 h-5 text-gray-400 border-gray-300 focus:ring-0"
              />
              <div>
                {todo.task_desc && (
                  <p className="text-sm text-gray-500">{todo.task_desc}</p>
                )}
              </div>
            </div>
            <hr className="mt-3 border-gray-200" />
          </div>
        ))}

        {/* Add Task Button */}
        
       
      </div>
{/* tododescription */}
   {selectedTodoId &&(
      <div className="fixed inset-0 flex items-center justify-end mx-10 lg:justify-center">
          <div className="bg-[#eae4de] border border-gray-100 p-6 rounded-xl shadow-lg max-w-md w-full">

            {isTodoLoading ? (
              <div>Loading...</div>
            ) : TodoById ? (
              <div>
                <h3 className="text-xl font-bold">{TodoById.task_desc}</h3>
                <p>Status: {TodoById.is_completed ? "Done" : "Pending"}</p>
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

   )}



    </div>
    </div>
  );
};

export default ListTodos;
