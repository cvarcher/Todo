import React from 'react'
import Siderbar from "../../components/Siderbar";
import ListTodos from "../../components/ListTodos";
import AddTask from "../../components/AddTask";
import SpecificTodo from '../../components/SpecificTodo';

const Todo = () => {
  return (
    <div>
      <Siderbar/>
<AddTask/>
<ListTodos/>
<SpecificTodo/>

        
    </div>
  )
}

export default Todo