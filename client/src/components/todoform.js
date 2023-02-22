import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Todoform = (props) => {
    const [formitems, setFormitems] = useState({
        _id: "",
        title: "",
        discription: "",
        status: false,
    });

    useEffect(() => {
        console.log("in form called useeffect", props.todo)
        setFormitems(props.todo);
    }, [])


    const handleChange = (e) => {
        const { name, value, checked } = e.target
        setFormitems({
            ...formitems,
            [name]: name==="status"?checked:value
        })
    }


    return (
        <div>
            <Form onSubmit={props.onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Title</Form.Label>
                    <Form.Control type="text" name="title" value={formitems.title} onChange={handleChange} placeholder="Title" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter Discription</Form.Label>
                    <Form.Control type="text" name="discription" value={formitems.discription} onChange={handleChange} placeholder="discription" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" name="status" checked={formitems.status} onChange={handleChange} label="Mark as complete" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Todoform