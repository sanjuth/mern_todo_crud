import React from 'react'
import Model from "../components/modal"
import Form from "../components/todoform"
import { useState, useEffect } from 'react'
import axios from 'axios'

const Update = (props) => {
    const [newtodo, setNewTodo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:3001/todo/find?id=" + props.id)
            .then((res) => {
                console.log("user to be updated.");
                console.log(res);
                setNewTodo(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("yo", props.todo)
        console.log(e);
        const temp = {
            "title": e.target[0].value,
            "discription": e.target[1].value,
            "status": e.target[2].checked
        }
        console.log("sending student update to backend")
        console.log(temp)
        console.log(newtodo)
        axios.put("http://localhost:3001/todo/edit?id=" + props.id, temp)
            .then(() => {
                console.log("updated successfully")
                setNewTodo({});
                props.setOpen(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            {!loading && <Model open={props.open} handleClose={props.handleClose} >
                {(newtodo !== {}) && <Form todo={newtodo} setTodo={setNewTodo} onSubmit={onSubmit} />}
            </Model>}
        </div>
    );
}

export default Update