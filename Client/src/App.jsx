import './App.css'
import { useState } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

import {useNavigate, Route,Routes}from "react-router-dom"
function App() {
  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const navigate=useNavigate()
  
    const enterName=(e)=>{
      setName(e.target.value)
    }
    const enterEmail=(e)=>{
      setEmail(e.target.value)
    }
    const enterPassword=(e)=>{
      setPassword(e.target.value)
    }
 
    const registerUser= async(e)=>{
    e.preventDefault()
    const response= await fetch('http://localhost:3002/api/register',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'

      },
    body:JSON.stringify({
      name,
      email,
      password
      })
    })
    const data=await response.json()
    
    if(data.status==='ok'){
      navigate('/login')
    }


  }

  const loginUser= async(e)=>{
    e.preventDefault()
    const response= await fetch('http://localhost:3002/api/login',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'

      },
    body:JSON.stringify({
        email,
      password
      })
    })
    const data=await response.json()
    if(data.user){
            localStorage.setItem('token',data.user)
            // navigate('/dashboard')
      
           window.location.href='/Dashboard'
    }
    else{
      alert('Please check your userName and password')
    }
    console.log(data)



  }


  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register
     name={name}
     email={email}
     password={password}
     enterEmail={enterEmail}
     enterName={enterName}
     enterPassword={enterPassword}
     registerUser={registerUser}
     
     />
    
}
   />
   <Route path='/login' element={
      <Login 
     email={email}
   password={password}
   enterEmail={enterEmail}
    enterPassword={enterPassword}
   loginUser={loginUser}
       />
   
   }
   />
    <Route path='/dashboard' element={<Dashboard/>} />    
   
     </Routes>
    </div>
  )
}

export default App
