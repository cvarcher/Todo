import React from 'react'
import ListTodos from "../../components/ListTodos";
import AddTask from "../../components/AddTask";
import SpecificTodo from '../../components/SpecificTodo';
const Todo = () => {
  return (
    <div>

<AddTask/>
<ListTodos/>
<SpecificTodo/>


 </div>
  )
}

export default Todo