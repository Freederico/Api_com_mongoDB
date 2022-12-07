const express = require('express')
const rota  = express.Router()
const Person = require('../models/Person')




// Read - Leitura de dados



rota.post('/person'  , async (req, res)=>{
    const  {name , salary , approved} = req.body

    const person = {
        name , 
        salary , 
        approved 
    }

    if(!name){
        res.status(422).json({error:"O nome é obrigatorio"})
        return
    }

    try{
        await Person.create(person)
        
        res.status(201).json({message:'Pessoa isenrida no sistema com cuscesso'})

    }catch{
        res.status(500).json({error:error})
    }
})

rota.get("/" , async (req , res)=>{
    try{

        const people = await Person.find()

        res.status(200).json({people})
    }catch{
        res.status(500).json({error:error})
    }
})

rota.get('/:id' , async (req , res)=>{
    const id = req.params.id

    try{

        const person = await Person.findOne({_id:id})

        if(!person){
            res.status(422).json({error:"O usuario não foi encotrado"})
            return
        }

        res.status(200).json({person})

    }catch{
        res.status(500).json({error:error})
    }

})


rota.patch('/:id' , async(req, res)=>{
    const id = req.params.id


    const {name , salary , approved} = req.body

    const person = {
        name , 
        salary , 
        approved
    }

    try{

        const updatedPerson = await Person.updateOne({_id:id}, person)

        console.log(updatedPerson)

        if(updatedPerson.matchedCount === 0){
            res.status(422).json({message:"O usuario não foi encotrado!"})
            return
        }

        res.status(200).json(person)

    }catch(error){
        res.status(500).json({error:error})
    }
})

rota.delete('/:id' ,async (req, res)=>{
    const  id = req.params.id

    const person = await Person.findOne({_id:id})

    if(!person){
        res.status(422).json({message:'O usuário não foi encotrado'})
        return
    }

    try{
        await Person.deleteOne({_id:id})
        
        res.status(200).json({message:'Usuario removido com sucesso'})

    }catch (error){
        res.status(500).json({error:error})

    }
})

module.exports = rota

