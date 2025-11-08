import React from 'react'
import Siderbar from "../../components/Siderbar";
import ListTodos from "../../components/ListTodos";
import AddTask from "../../components/AddTask";
import SpecificTodo from '../../components/SpecificTodo';
import EditTodo from '../../components/EditTodo';
const Todo = () => {
  return (
    <div>
      <Siderbar/>
<AddTask/>
<ListTodos/>
<SpecificTodo/>

        <EditTodo></EditTodo>
    </div>
  )
}

export default Todo