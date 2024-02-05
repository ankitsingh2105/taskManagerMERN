import React from 'react';
import "./Display.css"
export default function Display(props) {
  const { tasks, description, time, handleEdit, handleDelete, handleComplete, status } = props;
  let wordArray = time.split(" ");
  let dayStr = wordArray[0] + " " + wordArray[1] + " " + wordArray[2];
  let timeStr = wordArray[4] + " " + wordArray[5];
  return (
    <main className='displayMain'>
      <div><b> {tasks}</b></div>
      <hr />
      <br />
      <div>{description}</div>
      <br />
      <div><b>{dayStr}</b></div>
      <div><b>{timeStr}</b></div>
      <br />
      <center>
        <button onClick={() => { handleEdit() }} >Edit</button> &nbsp;
        <button onClick={() => { handleComplete() }} >{status}</button> &nbsp;
        <button onClick={() => { handleDelete() }} >Delete</button>
      </center>
    </main >
  );
}

