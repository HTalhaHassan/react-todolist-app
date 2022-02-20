import React,{useState} from 'react';
import './App.css';

function ListItem(props){
  return(
    <div className='list-item row jc-space-between'>
      <span className={props.data.isComplete ? 'task-complete' : ''} 
      onClick={()=>props.completedtask(props.index)}>{props.data.description}</span>
      <img onClick={()=>props.deletetask(props.index)} className='delete-icon' src="https://raw.githubusercontent.com/ayushkul/react-todo-list/d71081f7d9a3c6517fae330c131f8d78531f49b9/src/trash.svg" alt="Trash Icon"/>
    </div>
  )
}

function App() {
  const [inputtext,updateinputtext]=useState('');
  const [todos,updatetodos]=useState([]);

  const buttonclick=()=>{
    if(inputtext.length){
      todos.push({description:inputtext,isComplete:false});
      updatetodos(todos);
      updateinputtext('');
    }
  }
  const keypressed=(event)=>{
    if(event.keyCode===13){
      buttonclick();
    }
  }

  const deletetask=(index)=>{
    const newtasks=todos.filter((item,i)=>i!==index);
    updatetodos(newtasks);
  }

  const completedtask=(index)=>{
    const list=[...todos];
    list[index].isComplete=!list[index].isComplete;
    updatetodos(list);
  }
  
  return (
    <div className="app-background">
     <p className='heading-text'>React To-Do List</p>
     
     <div className='task-container '>
       <div>
         <input className='text-input' type="text" value={inputtext} onChange={(event)=>updateinputtext(event.target.value)} onKeyDown={keypressed}/>
         <button className='add-button' onClick={buttonclick}>ADD</button>
       </div>
       {
          todos.length ?
          todos.map((todoobj,index)=><ListItem index={index} key={index} data={todoobj} deletetask={deletetask} completedtask={completedtask}/>)
          :
          <p className='no-item-text '>No Task Added</p>
       }
       
       
     </div>
    </div>
  );
}

export default App;
