const express=require("express")
const bodyParser=require("body-parser")
const fs=require("fs")
const app=express()
const port=3001
const tasksfile="tasks.json"

let tasks =fs.existsSync(tasksfile) ? JSON.parse(fs.readFileSync(tasksfile,"utf-8")):[]

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>
{
    res.send(
        `<h1>Todo which storing in filesystem</h1>
    <form action="/add" method="POST">
    <input name="task" type="text" placeholder="Enter task">
    <button>Add</button>
    </form>
    <ul>
    ${tasks.map((task,index)=>`<li>${task} <a href="/delete/${index}"><button>delete</button></a></li>`).join('')}
    </ul>`
    )
})


app.post("/add",(req,res)=>
{
    const {task}=req.body
    tasks.push(task)
    fs.writeFileSync(tasksfile,JSON.stringify(tasks))
    res.redirect("/")
})

app.get("/delete/:index",(req,res)=>
{
    const {index}=req.params
    tasks.splice(index,1)
    fs.writeFileSync(tasksfile,JSON.stringify(tasks))
    res.redirect("/")
})

app.listen(port,()=>
{
    console.log(`Server is running in http://localhost:${port}`)
})