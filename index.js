const express=require("express")
const bodyParser=require("body-parser")

const app=express()
const port=3005
//middleware setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//routes
let tasks=[]
app.get('/',(req,res)=>{res.send(`
  <h1> Todo </h1>
  <form action="/add" method="POST">
  <input type="text" name="task" placeholder="Enter task">
  <button type="submit">Add</button>
  </form>
  <ul>
  ${tasks.map((task,index)=> `<li>${task}
  <a href="/delete/${index}">Delete</a></li>`).join('')}
  </ul>`
)
})

app.post('/add',(req,res)=>{
const {task}=req.body
if(task)
{
  tasks.push(task)
}
res.redirect('/')
}
)

app.get('/delete/:index',(req,res)=>
{
  const {index}=req.params

    tasks.splice(index, 1);
  
  res.redirect('/')
})

app.listen(port,()=>
{
  console.log(`server is running in http://localhost:${port}`)
})