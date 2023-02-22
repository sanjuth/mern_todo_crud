import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios";
import Table from "react-bootstrap/Table"
import "./home.css"
import Add from "./add"
import Update from './update';
import Button from 'react-bootstrap/Button';
import Dropdown from '../components/dropdown';

const Home = () => {
    const [todos, setTodos] = useState([])
    const [open, setOpen] = useState(false);
    const [openUp, setOpenUp] = useState(false);
    const [updateId, setUpdateId] = useState("");
    const [fake, setFake] = useState(false);
    const [filter,setFilter] =useState("all");


    useEffect(() => {
        axios.get("http://localhost:3001/todo")
            .then((res) => {
                console.log(res.data)
                setTodos(res.data)
            })
            .catch((err) => {
                console.log(err)
            });

    }, [open,fake,openUp]);

    const handleOpen = () => {
        console.log("opening modal for adding student");
        setOpen(true);
    }
    const handleClose = () => {
        console.log("closing modal for adding student");
        setOpen(false);
    }
    const handleOpenUp = (event) => {
        console.log("opening modal for updating student");
        setUpdateId(event.target.value);
        console.log(updateId)
        setOpenUp(true);
    }
    const handleCloseUp = () => {
        console.log("closing modal for updating student");
        setOpenUp(false);
    }

    const handelDelete = (event) => {
        console.log("deleting")
        console.log(event.target.value)
        axios.delete(`http://localhost:3001/todo/remove?id=` + event.target.value)
            .then(() => { 
                // alert("deleted");
                setFake(x=>!x);
            })
            .catch((err) => console.log(err))
    }


    if (todos.length === 0)
        return <div>
            <div>
                <Button variant="primary" onClick={handleOpen}>ADD TODO</Button>
                {/* <button onClick={handleOpen}>add todo</button> */}
            </div>
            <div>
                <Add open={open} setOpen={setOpen} handleClose={handleClose} />
            </div>
            Nothing to display !!!</div>

    return (
        <div>
            <div>
                <Button className="add-bt" variant="primary" onClick={handleOpen}>ADD TODO</Button>
                <Dropdown filter={filter} setFilter={setFilter}/>
                {/* <button onClick={handleOpen}>ADD TODO</button> */}
            </div>
            <div className='todo-table'>
                <Table striped hover variant="dark">
                    <thead>
                        <tr>
                            <th>TITLE</th>
                            <th>DISCRIPTION</th>
                            <th>STATUS</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos
                        .filter((todo)=>{
                            console.log(todo.status,filter)
                            if(filter==="all")
                                return true;
                            const c=todo.status===true?"completed":"pending"
                            return c===filter;
                        })
                        .map((todo) =>
                            <tr key={todo._id}>
                                <td>{todo.title}</td>
                                <td>{todo.discription}</td>
                                <td>{todo.status === true ? <p>Completed</p> : <p>Pending</p>}</td>
                                <td>
                                    <Button variant="danger"  onClick={handelDelete} value={todo._id}>DELETE</Button>&nbsp;&nbsp;
                                    <Button variant="warning"  onClick={handleOpenUp} value={todo._id}>UPDATE</Button>
                                    {/* <button onClick={handelDelete} value={todo._id}>DELETE</button>
                                    <button onClick={handleOpenUp} value={todo._id}>UPDATE</button> */}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div>
                <Add open={open} setOpen={setOpen} handleClose={handleClose} />
            </div>
            <div>
            {openUp && <Update open={openUp} setOpen={setOpenUp} handleClose={handleCloseUp} id={updateId}/>}
            </div>
        </div>
    )
}

export default Home