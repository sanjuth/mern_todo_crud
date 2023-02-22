const express = require("express");
const cors=require("cors");
const db=require("./database/db")
const todo=require("./database/student")
const app=express();
const bodyParser = require('body-parser');
app.use(cors())


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


db();


app.get("/todo",(req,res)=>{
    todo.find({},(err,tasks)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        else
            res.send(tasks)
    });
})

app.get("/todo/find",(req,res)=>{
    console.log(req.query)
    todo.findOne({"_id":req.query.id},(err,task)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        else
            res.send(task)
    });
})

app.post("/todo/add",(req,res)=>{
    console.log(req.body)
    const {title,discription,status} = req.body;
    const newTodo= new todo({
        title:title,
        discription:discription,
        status:status
    })
    newTodo.save()
    .then(()=>{
        console.log("new Todo created successfully");
        res.send({data:newTodo , message:"Successfully Created !!!"});
    })
    .catch((err)=>{
        console.log("failed to create new Todo");
        res.send({message:"Failed"});
    })
})



app.put('/todo/edit',(req,res)=>{
    console.log(req.query)
    todo.findOneAndUpdate({"_id":req.query.id} , req.body)
    .then((obj)=>{
        console.log("Update Success !!!")
        res.send({data:obj , message:"Update Success!!!"});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"failed"})
    })
})



app.delete("/todo/remove",(req,res)=>{
    console.log(req.query)
    todo.deleteOne({"_id":req.query.id})
    .then(()=>{
        console.log("delete success")
        res.send({message:"Successfully Deleted !!!"});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Failed"});
    })
})


app.listen(3001,()=> console.log("Listening on port 3001...."))