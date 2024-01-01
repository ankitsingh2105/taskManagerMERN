import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Main.css"
import Display from '../Display/Display';
import { toast } from 'react-toastify';
export default function Main() {

  const [task, settask] = useState('');
  const [description, setdescription] = useState('');
  const [data, setdata] = useState([]);
  const [isdata , setisdata]  = useState(false);
  const [float, setfloat] = useState(false);
  const [id, setId] = useState("");
  const [key, setKey] = useState("");

  const currentDate = new Date();

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", options);


  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      let object = {
        nameoftask: task,
        description: description,
        timeOfCreation: formattedDate,
      }
      await axios.post("/addtasks", object, { headers: { " Authorization": `Bearer ${key}` } })
      toast.success('Task added succefully', { autoClose: 1500 });
      setdata((obj) => [...obj, object]);
      setdescription("");
      settask("");
    }
    catch (error) {
      console.log("The error : ", error);
    }
  }

  useEffect(() => {
    const jwtKey = localStorage.getItem("jwtKeyisHere");
    setKey((prevKey) => jwtKey);
    const displayData = async (e) => {
      try {
        console.log("newone -> ", jwtKey);
        const response = await axios.get("/alltaskslist", { headers: { " Authorization": `Bearer ${jwtKey}` } })
        setdata(response.data);
        setisdata(true);
      }
      catch (error) {
        console.log("The error : ", error);
      }
    }
    displayData();
  }, [])



  const handleEdit = (id, description, task) => {
    console.log("clicked one ", id);
    setfloat(true);
    setId(id);
    settask(task);
    setdescription(description)
  }

  const handleRealEdits = async () => {
    setfloat(false);
    try {
      const updatedData = {};
      if (task.length === 0 || description.length === 0) {
        console.log("No changes to update.");
        return;
      }

      updatedData.description = description;
      updatedData.nameoftask = task;
      updatedData.timeOfCreation = formattedDate;

      let tempArray = data.map((elem) => {
        if (elem._id === id) {
          elem.nameoftask = task;
          elem.description = description;
          elem.timeOfCreation = formattedDate
        }
        return elem;
      });
      console.log(tempArray);
      setdata(tempArray)

      await axios.post(`/task/updateone/${id}`, updatedData, { headers: { " Authorization": `Bearer ${key}` } });
      settask("");
      setdescription("")
      console.log("The task was updated successfully!")
    }
    catch (error) {
      console.log("Error : ", error);
    }
  }

  const handleDelete = async (id) => {
    let tempArray = data.filter((e) => {
      return e._id !== id;
    }) 
    setdata(tempArray);
    try {
      await axios.delete(`/task/deleteone/${id}`, { headers: { "Authorization": `Bearer ${key}` } });
      toast.success('Task deleted succefully', { autoClose: 1500 });
    }
    catch (error) {
      console.log("Error : ", error);
    }
  }


  return (
    <center>
      <div className="App">
        <h1>Task Manager</h1>
        <form action="">
          <input
            type="text" placeholder="Enter task" value={task} required onChange={(e) => settask(e.target.value)} />
          <br /> <br />
          <textarea type="text" value={description} rows={7} cols={30} placeholder='Enter description' required onChange={(e) => setdescription(e.target.value)} />
          <br /><br />
          <button onClick={handleAdd}>Add Task</button>
        </form>
      </div >
      <br />
      <div>
        {
          !key ?
            <>
              <div>Please Login</div>
            </>
            :
            <>
              {
                !isdata ? <div className='loader' ></div> :
                  <div>
                    <main className='gridSystem' >
                      {
                        data.map((elem , index) => {
                          return (
                            <>
                              <Display
                                key={index}
                                id={elem._id}
                                handleDelete={() => handleDelete(elem._id)}
                                handleEdit={() => handleEdit(elem._id, elem.description, elem.nameoftask)}
                                time={elem.timeOfCreation}
                                tasks={elem.nameoftask}
                                description={elem.description}
                              />
                            </>
                          )
                        })
                      }
                    </main>
                  </div>
              }
            </>
        }
      </div>
      <main className="floating">
        {
          float ?
            <center style={{ background: "white" }} >
              <input
                type="text" placeholder="Enter task" value={task} required onChange={(e) => settask(e.target.value)} />
              <br /> <br />
              <textarea type="text" value={description} rows={7} cols={30} placeholder='Enter description' required onChange={(e) => setdescription(e.target.value)} />
              <br /><br />
              <button onClick={handleRealEdits}>Done</button>
              &nbsp; &nbsp;
              <button onClick={() => { setfloat(false) }}>Close</button>
            </center>
            :
            <div></div>
        }
      </main>
    </center >
  );
}

