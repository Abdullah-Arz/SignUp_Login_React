import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Header from '../Components/Header';
import '../Sass/Login.scss';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NotificationManager} from 'react-notifications';
import { PuffLoader } from 'react-spinners';
import { FaUserAlt } from "react-icons/fa";

function Login() {

    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const [state_loader, setState_Loader] = useState(false);
    const [state_email, setState_Email] = useState('');
    const [state_password, setState_Password] = useState('');
    const [state_checked, setState_Checked] = useState('');
    // const Api = localStorage.getItem('API')
    // const Token = sessionStorage.getItem('Token')
    // const remember = localStorage.getItem('remember')
    const navigate = useNavigate()

    useEffect(()=>{
      // setState_Email(localStorage.getItem('email'))
      // setState_Password(localStorage.getItem('password'))
      // setState_Checked(localStorage.getItem('remember'))
    },[])
    

    const handlePasswordChange =(evnt)=>{
        setPasswordInput(evnt.target.value);
        setState_Password(evnt.target.value);
        console.log('Password field ----- ',evnt.target.value);
    }
    const togglePassword =()=>{
      passwordType==="password" ? setPasswordType("text") : setPasswordType("password")
    }


    const HandleSubmit = (event) => {
        event.preventDefault()
        // setState_Loader(true)
        const data = new FormData(event.target)
        
        console.log('login data ----- ', data.get('username'),data.get('password'))

        // const body={
        //     "username": data.get('username'),
        //     "password" : data.get('password'),   
        // }
        // axios.post(`${Api}/auth/signin/`,body)
        // .then((res)=>{
        //     console.log('Login Api Response ---- ',res.data)

        //     if( res.data.error === 'Invalid Password'){
        //         NotificationManager.error(res.data.error)
        //         setState_Loader(false)
        //     }else if(res.data.error === 'Invalid email or username'){
        //       NotificationManager.error(res.data.error)
        //       setState_Loader(false)
        //     }else{
        //         NotificationManager.success('Login Successfully')
        //         navigate('/home')
        //         setState_Loader(false)
        //         event.target.reset()
        //         sessionStorage.setItem('LoginUser',true)
        //         sessionStorage.setItem('Token',res.data.access)
        //         sessionStorage.setItem('RefreshToken',res.data.refresh)

        //         if(state_checked == true){
        //           localStorage.setItem('remember',state_checked)
        //           localStorage.setItem('email',data.get('username'))
        //           localStorage.setItem('password',data.get('password'))
        //         }else{
        //           localStorage.setItem('remember',state_checked)
        //           localStorage.setItem('email','')
        //           localStorage.setItem('password','')
        //         }
        //     }

        // }).catch((error)=>{
        //     console.log('Login Api Error ----- ',error)
        //     setState_Loader(false)
        // })

    }

    const HandleNavigate = () => {
        navigate('/forgetpassword')
    }

    const HandleSignUp = () => {
        navigate('/')
    }

    const HandleGuestLogin = () => {
      navigate('/home')
    }

    const HandleCheckbox = (event) => {
      console.log(event.target.checked)
      setState_Checked(event.target.checked)
    }
     

  return (
    <>
    {/* <Header loginHeader={true} /> */}
   <Container >
     <Form onSubmit={HandleSubmit} className='login-container'>
        <h1 className='login-h1'>Login your account</h1>
        <p className='login-p'>Please enter your details</p>
        <div className = 'mt-3' />

      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
        <Form.Label className='login-formlabel'>Email Address</Form.Label>
        <Form.Control required onChange={(e)=>setState_Email(e.target.value)} value={state_email} name='username' type='email' placeholder="email address" />
      </Form.Group>


      <Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
        <Form.Label className='login-formlabel'>Password</Form.Label>
        <div className='login-password-div'>
        <Form.Control 
        required
        name='password'
        placeholder="Password" 
        type={passwordType}
        value={state_password}
        onChange={handlePasswordChange}
        />
        
        {passwordType == 'password' ? (
            <FiEye onClick={togglePassword} />
        ) : (
            <FiEyeOff onClick={togglePassword}/>
        ) }
        
        </div>
      </Form.Group>
      
      <div className='login-remember-maindiv'>
      <Form.Group className="mt-3" controlId="formBasicCheckbox">
        
        {/* <div className='login-remember'>
        <input type="checkbox" onChange={HandleCheckbox} {state_checked == 'true' ? checked : null } />
        <p className='login-remember-p'>Remember me</p>
        </div> */}
        {state_checked == 'true' ? (
          <Form.Check onChange={HandleCheckbox} checked type="checkbox" label="Remember me" />
        ) : (
          <Form.Check onChange={HandleCheckbox}  type="checkbox" label="Remember me" />
        )}
        
        
      </Form.Group>
      <p onClick={HandleNavigate} className='login-forget'>Forget Password?</p>
      </div>
      
      <Button className='mt-5 mb-3' style={{ display:"flex",justifyContent:'center'}} variant="primary" type="submit">
      { state_loader ? (
        <PuffLoader
        color="#ffffff"
        size={24}
      />
      ) : (
        'Login'
      )
      }
      </Button>

      <p className='login-or'>OR</p>

      {/* <Button onClick={HandleGuestLogin} className='mb-5 login-guest-btn' style={{ display:"flex",justifyContent:'center', alignItems:'flex-end'}} variant="primary" type="submit">
        <div style={{marginLeft:'2em', alignItems:'center', display:'flex'}}>
        <FaUserAlt style={{marginRight:'8px', fontSize:'16px'}} />
        Guest Login
        </div>
      </Button> */}

      

      <Button 
      className='mb-5 login-sign-btn' 
      type="submit"
      onClick={HandleSignUp}
      >
        Don't have an account? Sign Up
      </Button>
    </Form>
   </Container>
   </>
  );
}

export default Login;