import {useRef} from "react";
function Register(props){

    const ref=useRef(null)
    function clickSubmit(){
        ref.current.click()
      }
    return(
        <>
    <h1>Register</h1>
    <form onSubmit={(e)=>props.registerUser(e)}>
   <input type='text'
   onChange={(e)=>props.enterName(e)}
    placeholder='name'
   value={props.name}
   />
   <br/>
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
 <input onClick={props.registerUser}ref={ref} type='submit' value="Register"/>
    </form>
    </>
    )

}

export default Register