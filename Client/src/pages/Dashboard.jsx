import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";


const Dashboard=()=>{

        const [quote,setQuote]=useState('')
        const [tempQuote,setTempQuote]=useState('')

       async  function populateQuote(){
            const req= await fetch('http://localhost:3002/api/quote',{
                headers:{
                    'x-access-token': localStorage.getItem('token'),
                }
            })
                const data= await req.json()
                if(data.status==='ok'){
                    setQuote(data.quote)
                }
                else{
                    alert(data.error)
                }
                console.log(data)
        }

    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(token){
            const user= jwt_decode(token)
            // window.location.href='/'
            if(!user){
                localStorage.removeItem('token')
                }
                else{
                    populateQuote()
                }
        } 

        
    },[])

    async  function updateQuote(event){
        event.preventDefault()
       
        const req= await fetch('http://localhost:3002/api/quote',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                quote:tempQuote,
            })
        })
            const data=req.json()
            if(data.status==='ok'){
                setQuote(tempQuote)
                setTempQuote('')
            
            }
            else{
                alert(data.error)
            }
            console.log(data)
    }

    return(
    <div>
        <h1>You're quote:{quote || 'No quote found'}</h1>
        <form onSubmit={(event)=>updateQuote(event)}>
            <input type='text' placeholder='Quote' value={tempQuote} 
            onChange={(e)=>setTempQuote(e.target.value)}/>
            <input type='submit' value='submit'/>
        </form>
    </div>
    
    
    )
}
export default Dashboard
