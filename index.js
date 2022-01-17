const express=require('express')
const data=require('./meraki_data.json')
const app=express()
const fs = require("fs")

app.use(express.json())


app.get('/',(req,res)=>{
    res.json(data)
    // res.json({massage:'API IS WORKING'})
})

app.post("/data",(req,res)=>{

    const user={
        id:data.length+1, 
       name:req.body.name,
       logo:req.body.logo,
       notes:req.body.notes,
       days_to_complete:req.body.days_to_complete,
       short_description:req.body.short_description,
       type:req.body.type,
       course_type:req.body.course_type,
       lang_available:req.body.lang_available
    }
    
    data.push(user)
    fs.writeFileSync("meraki_data.json",JSON.stringify(data,null,4))
    res.json({message:'new data added susscfully',data:user})
})
app.put('/data/:id',(req,res)=>{
    let id=req.params.id
    let name=req.body.name
    let logo=req.body.logo
    let notes=req.body.notes
    let days_to_complete=req.body.days_to_complete
    let short_description=req.body.short_description
    let type=req.body.type
    let course_type=req.body.course_type
    let lang_available=req.body.lang_available
    
    let index= data.findIndex((data)=>{
        return (data.id==Number.parseInt(id))

    })
    if(index>=0){
        let meraki=data[index]
        meraki.name=name
        meraki.logo=logo
        meraki.notes=notes
        meraki.days_to_complete=days_to_complete
        meraki.short_description=short_description
        meraki.type=type
        meraki.course_type=course_type
        meraki.lang_available=lang_available
        
        fs.writeFileSync("meraki_data.json",JSON.stringify(data,null,4))
        res.json({message:"successfuly",update:meraki})
    }else{
        res.status(404)
    }

    console.log(id)
    res.json(id)
})





app.delete('/data/:id',(req,res)=>{
    let id= req.params.id
    let index1= data.findIndex((data)=>{
        return (data.id==Number.parseInt(id))
    })
    if (index1>=0){
        let meraki=data[index1] 
        data.splice(index1,1)
        fs.writeFileSync("meraki_data.json",JSON.stringify(data,null,4))
        res.json({message:"successfuly deleted",data:meraki})
    }else{
        res.json(404)
    }

})



app.listen(4000,()=>{
    console.log("listening the port")

})