import React from 'react'
import {useNavigate} from 'react-router-dom';

export default function Login(props) {
  const host = "http://localhost:4000"
  const [formData,setFormData] = React.useState({
    email:"",
    password:"",
  })
  
let navigate = useNavigate();
  function handleChange(event){
    const {name,value} = event.target;
    setFormData((prev)=>{
      return{
         ...prev,
         [name]:value
      }
    })
 }
 
 const handleSubmit = async(ev)=>{
    ev.preventDefault();
    const response = await fetch(`${host}/api/auth/login`,{
      method : "POST",
      headers:{
        'Content-Type':"application/json",
      },
      body: JSON.stringify({email:formData.email,password:formData.password})
    })
    const json = await response.json();
    if(json.success){
      localStorage.setItem('token',json.authtoken);
      props.showAlert("Succesfully Logged in","success");
      navigate("/");
    }else{
      props.showAlert("Invalid Credentials","danger");
    }
 }

  return (
    <div>
    <div className=' border border-dark text-center rounded' style={{maxWidth:"500px",margin : "50px auto"}}>
      <h4 className="fw-bold text-center bg-dark text-light p-3 rounded">Log in</h4>
      <form onSubmit={handleSubmit} className='mx-3'>
        <div className="mb-3 mt-4">
          <div>Enter Your Email</div>
          <input 
          type="email" 
          className="form-control"
          onChange={handleChange}
          value={formData.email}
          name="email" required />
        
          </div>

        <div className="mb-4">
          <div> Enter Your Password</div>
          <input 
           type="password"
           className="form-control"
            id="exampleInputPassword1"
            onChange={handleChange}
            value={formData.password}
            name="password" 
            required
            />
        </div>

        <button type="submit" className="btn mb-5 btn-dark">Login</button>
      </form>
    </div>
    </div>
  )
}
