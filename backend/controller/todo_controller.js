const { Todo } = require("../model/todo.js")

const createTodo = async(req,res)=>{
    await  Todo.create({
        text:req.body.text,
        completed:req.body.completed,
        user:req.user._id,// associate todo with loggedin user


    })

    try{
        res.status(201).json({message:"Todo created Successfully"})


    }catch(error){
        console.log(error);
        res.status(401).json({message:"Error Occuring in todo creation"})
        
    }
}

const getTodos = async(req,res)=>{
    try{
        const todos = await Todo.find({user:req.user._id,// fetch todos only for loggedin user
})
        res.status(201).json({message:"Todo fetch Successfully",todos})

    }catch(error){
        console.log(error);
        res.status(401).json({message:"Error occuring in todo fetching"})
        
    }
}

const updateTodos = async(req,res)=>{
    try{
        const todo = await Todo.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        })
        res.status(201).json({message:"Todo updated Successfully",todo})

    }catch(error){
        console.log(error);
        res.status(401).json({message:"Error occuring in todo Updating"})
        
    }
}

const deleteTodo = async(req,res)=>{
    try{
         const todo=await Todo.findByIdAndDelete(req.params.id)
         if (!todo) {
            return res.status(404).json({message:"Todo not found"})

         }
        res.status(201).json({message:"Todo Deleted Successfully"})

    }catch(error){
        console.log(error);
        res.status(401).json({message:"Error occuring in todo deleting"})
        
    }
}

module.exports = {
    createTodo,getTodos,updateTodos,deleteTodo
}