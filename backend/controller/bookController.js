const Book = require('../model/bookModel')

//create
const create = async(req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:'Send all the require fields:title,author,publishYear'
            })
        }
        const newBook  = {
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        }
        const book  = await Book.create(newBook)
        return res.status(201).send(book)
    }
    catch(e){
        console.log(e.message)
        res.status(500).send({message:e.message})
    }
}

//read
const read =async (req,res)=>{
    try{
        const books = await Book.find()
        return res.status(200).json({
            count:books.length,
            data:books
        })
    }
    catch(e){
        console.log(e.message)
        res.status(500).send({message:e.message})
    }
}

//read one 
const readOne =async (req,res)=>{
    try{
        const {id} = req.params
        const book = await Book.findById(id)
        return res.status(200).json(book)
    }
    catch(e){
        console.log(e.message)
        res.status(500).send({message:e.message})
    }
}

//update
const update = async(req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:'Send all the require fields:title,author,publishYear'
            })
        }
        const {id} = req.params
        const result = await Book.findByIdAndUpdate(id,req.body)
        if(!result){
            return res.status(400).json({message:'book not found'})
        }
        return res.status(200).send({message:'book updated successfully'})
    }
    catch(e){
        console.log(e.message)
        res.status(500).send({message:e.message})
    }
}

//delete
const deleteBook =async (req,res)=>{
    try{
        const {id} = req.params
        const result = await Book.findByIdAndDelete(id,req.body)
        if(!result){
            return res.status(400).json({message:'book not found'})
        }
        return res.status(200).send({message:'book deleted successfully'})
    }
    catch(e){
        console.log(e.message)
        res.status(500).send({message:e.message})
    }
}

module.exports = {create,read,readOne,update,deleteBook}