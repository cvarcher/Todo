import React, { useState, forwardRef } from "react";
import { Button, Sidebar } from "flowbite-react";
import { useCreateNew } from "../hooks/useTodos";
import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const AddTask = () => {
  const createTodoMutation = useCreateNew();
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const CustomDateButton = forwardRef(({ value, onClick }, ref) => (
  <Button
    ref={ref}
    onClick={onClick}
    className="flex items-center gap-2 focus:outline-none focus:ring-0 border-none text-gray-700 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
  >
    <Calendar className="w-5" />
    {value ? format(new Date(value), "dd MMM , yyyy") : "Date"}
  </Button>
));

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      task_desc: description,
      created_at: selectedDate,
      is_completed: false,
    };

    formData.task_desc ? 
    createTodoMutation.mutate(formData, {
      onSuccess: () => {
        setDescription("");
        setSelectedDate(null);
        alert("!! Task added!!")
      },
    }): alert("Task desciption must not be empty!!");
  };

  return (
  
    <div className="flex min-h-screen justify-center items-start  overflow-hidden bg-gray-50">
    {/* <Siderbar/> */}
    <div className="w-full max-w-2xl  mr-8">
      <h2 className="text-4xl font-bold mb-6 text-center mt-10">Tasks</h2>

      <div className="bg-gray-100 p-5 rounded-lg flex flex-col gap-3 shadow-md">
        <form className="mx-auto w-1/2 flex flex-col gap-3 md:w-1/2 lg:w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add your task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-1 mt-2 w-full border-none focus:outline-none"
          />

          <div className="flex justify-end gap-2 mt-4">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              customInput={<CustomDateButton />}
            />

            <Button
              type="button"
              onClick={() => {
                setDescription("");
                setSelectedDate(null);
              }}
              className="text-gray-700 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-white bg-[#9785ff] hover:bg-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
    </div>
    
  );
};

export default AddTask;
