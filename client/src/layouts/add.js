import React from 'react'
import Model from "../components/modal"
import Form from "../components/todoform"
import { useState } from 'react'
import axios from 'axios'

const Add = (props) => {
    const [newtodo, setNewTodo] = useState({
        title: "",
        discription: "",
        status: ""
    });

    const onSubmit = (e)  =>{
        e.preventDefault();
        console.log(e);
        const temp={
            "title" :e.target[0].value,
            "discription" :e.target[1].value,
            "status" :e.target[2].checked
        }
        console.log("sending new student to backend")
        console.log(newtodo)
        axios.post("http://localhost:3001/todo/add",temp)
        .then(()=>{
            console.log("added successfully")
            console.log("new student")
            props.setOpen(false)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div>
            <Model open={props.open} handleClose={props.handleClose} >
                <Form todo={newtodo} setTodo={setNewTodo} onSubmit={onSubmit}/>
            </Model>
        </div>
    );
}

export default Add