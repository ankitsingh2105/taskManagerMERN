import React from 'react';
import "./Display.css"
export default function Display(props) {
  const { tasks, description,time, handleEdit , handleDelete } = props;
  return (
    <main className='displayMain'>
      <div><b> {tasks}</b></div>
      <hr />
      <br />
      <div>{description}</div>
      <br />
      <div><b>{time}</b></div>
      <br />
      <center>
        <button onClick={()=>{handleEdit()}} >Edit</button> &nbsp; &nbsp; 
        <button onClick={()=>{handleDelete()}} >Delete</button>
      </center>
    </main >
  );
}

