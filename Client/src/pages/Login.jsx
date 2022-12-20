import {useRef} from "react";

function Login(props){


    const ref=useRef(null)
    function clickSubmit(){
        ref.current.click()
      }


    return(
        <>
    <h1>Login</h1>
    <form onSubmit={(e)=>props.registerUser(e)}>
       <input type='email'
    onChange={(e)=> props.enterEmail(e)}
    placeholder='Email'
    value={props.email}    
   />
    <br/>
   <input type='password'
  onKeyDown={e=> e.key==='Enter' ? clickSubmit() : ""}
    onChange={(e)=> props.enterPassword(e)}
    placeholder='Password'
    value={props.password}
    />
     <br/>
 <input ref={ref} onClick={props.loginUser} type='submit' value="Login"/>
    </form>
    </>
    )







}


export default Login