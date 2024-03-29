import React,{useState,useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import {useSnackbar} from 'notistack'


const EditBook = () => {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [publishYear,setPublishYear]  = useState('')
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} =  useParams()
  const {enqueueSnackbar} = useSnackbar()

  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:3000/books/${id}`)
         .then((response)=>{
          setAuthor(response.data.author)
          setPublishYear(response.data.publishYear)
          setTitle(response.data.title)
          setLoading(false)
         })
         .catch((e)=>{
          setLoading(false)
          alert('error happend pls check console')
          console.log(e)
         })
  },[])

  const handleEditBook = ()=>{
    const data = {
      title,author,publishYear
    }
    setLoading(true)
    axios.put(`http://localhost:3000/books/${id}`,data)
         .then(()=>{
           setLoading(false)
          enqueueSnackbar('book updated successfully',{variant:'success'})
          navigate('/')
         })
         .catch((e)=>{
            setLoading(false)
            enqueueSnackbar('error',{variant:'error'})
            console.log(e)
         })
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading?(<Spinner/>):''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className="my-4">
          <label htmlFor="" className='text-xl mr-4 text-gray-500 block text-center' >Title</label>
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full text-center' />
        </div>
        <div className="my-4">
          <label htmlFor="" className='text-xl mr-4 text-gray-500 block text-center' >Author</label>
          <input type="text" value={author} onChange={(e)=>setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full text-center' />
        </div>
        <div className="my-4">
          <label htmlFor="" className='text-xl mr-4 text-gray-500  block text-center' >Publish Year</label>
          <input type="number" value={publishYear} onChange={(e)=>setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full text-center' />
        </div>
        <button className='p-2 bg-sky-300 my-8 w-full' onClick={handleEditBook}>Save</button>
      </div>
    </div>
  )
}

export default EditBook