import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../Components/Header';
import '../Sass/Signup.scss';
import { FiEye, FiEyeOff,FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NotificationManager} from 'react-notifications';

function Signup() {

    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordType1, setPasswordType1] = useState("password");
    const [passwordInput1, setPasswordInput1] = useState("");

    const Api = localStorage.getItem('API')
    const navigate = useNavigate()

    const handlePasswordChange =(evnt)=>{
        setPasswordInput(evnt.target.value);
        console.log('Password field ----- ',evnt.target.value);
        onInputChange(evnt)
        
    }
    const togglePassword =()=>{
      passwordType==="password" ? setPasswordType("text") : setPasswordType("password")
    }

    const handlePasswordChange1 =(evnt)=>{
        setPasswordInput1(evnt.target.value);
        onInputChange(evnt)
        console.log('Confirm Password field ----- ',evnt.target.value);
    }
    const togglePassword1 =()=>{
      passwordType1==="password" ? setPasswordType1("text") : setPasswordType1("password")
    }

    const HandleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        console.log('Sign up data ----- ', data.get('first'),data.get('last'),data.get('email'),data.get('username'),data.get('password'),data.get('confirmPassword'))
        
        const body={
            "first_name":data.get('first'),
            "last_name": data.get('last'),
            "email": data.get('email'),
            "password" : data.get('password'),
            "password2" : data.get('confirmPassword'),
            "username": data.get('username')    
        }
        axios.post(`${Api}/auth/user_register/`,body)
        .then((res)=>{
            console.log('Signup Api Response ---- ',res.data);
            // NotificationManager.success(res.data.error)
            if(res.data.status == false){
              if(res.data.error == 'User Already Exists, Try Adding other username'){
                NotificationManager.error('This Username is Already Taken')
            }else if(res.data.error == 'Email must be Unique.'){
                NotificationManager.error(res.data.error)
            }else if(res.data.error == 'Password must contain at least one uppercase letter..'){
              NotificationManager.error(res.data.error)
            }else if(res.data.error == 'Password must contain at least one unique character.'){
              NotificationManager.error(res.data.error)
            }else {
                // event.target.reset(),
                NotificationManager.error('Something Went Wrong');   
            }
            }else{
              navigate('/')
              NotificationManager.success(res.data.message)
            }
           

            
            

        }).catch((error)=>{
            console.log('Signup Api Error ----- ',error)
            NotificationManager.error('Something Went Wrong')
        })
    }

    const [input, setInput] = useState({
        password: '',
        confirmPassword: ''
      });
     
      const [error, setError] = useState({
        password: '',
        confirmPassword: ''
      })
     
      const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
          ...prev,
          [name]: value
        }));
        validateInput(e);
      }
     
      const validateInput = e => {
        let { name, value } = e.target;
        console.log('Name ---- ',name, value)
        setError(prev => {
          const stateObj = { ...prev, [name]: "" };
     
          switch (name) {
     
            case "password":
              if (!value) {
                // stateObj[name] = "Please enter Password.";
              } else if (input.confirmPassword && value !== input.confirmPassword) {
                stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
              } else {
                stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
              }
              break;
     
            case "confirmPassword":
              if (!value) {
                // stateObj[name] = "Please enter Confirm Password.";
              } else if (input.password && value !== input.password) {
                stateObj[name] = "Password and Confirm Password does not match.";
              }
              break;
     
            default:
              break;
          }
     
          return stateObj;
        });
      }
     
      const HandleLogin = () => {
        navigate('/')
      }

  return (
    <>
    <Header loginHeader={true} />
   <Container >
     <Form onSubmit={HandleSubmit} className='signup-container'>
        <h1 className='signup-h1'>Sign Up</h1>
        <p className='signup-p'>Please enter your details</p>
        <div className = 'mt-3' />
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='signup-formlabel'>First Name</Form.Label>
        <Form.Control required name='first' type="text" placeholder="first name" />
      </Form.Group>

      <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
        <Form.Label className='signup-formlabel'>Last Name</Form.Label>
        <Form.Control required name='last' type="text" placeholder="last name" />
      </Form.Group>

      <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
        <Form.Label className='signup-formlabel'>Email Address</Form.Label>
        <Form.Control required name='email' type="email" placeholder="email address" />
      </Form.Group>

      <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
        <Form.Label className='signup-formlabel'>Username</Form.Label>
        <Form.Control required name='username' type="text" placeholder="username" />
      </Form.Group>

      <Form.Group className="mb-3 mt-4" controlId="formBasicPassword">
        <Form.Label className='signup-formlabel'>Password</Form.Label>
        <div className='signup-password-div'>
        <Form.Control 
        required
        title='Password must contain one special character, one Uppercase and at least 8 characters length'
        name='password'
        placeholder="Password" 
        type={passwordType}
        defaultValue={input.password}
        onChange={handlePasswordChange}
        onBlur={validateInput}
        pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}"
        />
        
        {passwordType == 'password' ? (
            <FiEye onClick={togglePassword} />
        ) : (
            <FiEyeOff onClick={togglePassword}/>
        ) }
        
        </div>
        <div className='signup-form-label-div'>
        <Form.Label className='signup-form-label' >Password must contain one special character, one Uppercase and at least 8 characters length</Form.Label> <br />
        {error.password && <span style={{color:'red'}}>{error.password}</span>}
        </div>
        {/* {state_Passmatch == true ? <p>Password match</p> : <p>Password must be same</p>} */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='signup-formlabel'>Confirm Password</Form.Label>
        <div className='signup-password-div'>
        <Form.Control 
        required
        title='Password must contain one special character, one Uppercase and at least 8 characters length'
        name='confirmPassword'
        placeholder="Confirm Password" 
        type={passwordType1}
        defaultValue={input.confirmPassword}
        onChange={handlePasswordChange1}
        onBlur={validateInput}
        pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}"
        />
        
        {passwordType1 == 'password' ? (
            <FiEye onClick={togglePassword1} />
        ) : (
            <FiEyeOff onClick={togglePassword1}/>
        ) }
        
        </div>
        <div className='signup-form-label-div'>
        <Form.Label className='signup-form-label' >Password must contain one special character, one Uppercase and at least 8 characters length</Form.Label>
        {error.confirmPassword && <span style={{color:'red', marginTop:"-10px"}}>{error.confirmPassword}</span>}
        </div>
        {/* {state_Passmatch == true ? <p>Password match</p> : <p>Password must be same</p>} */}
      </Form.Group>

      <Form.Group className="mt-3" controlId="formBasicCheckbox">
        <Form.Check required type="checkbox" label="Accept marketing communications" />
      </Form.Group>
      <Form.Group className="mb-5 mt-2" controlId="formBasicCheckbox">
        <div className='signup-tc-div'>
        <Form.Check required type="checkbox" label="" />
        <p>I accept <span className='signup-termsconditions'> Terms & conditions </span> </p>
        </div>
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
        <p className='mt-4 mb-3 signup-or'>OR</p>
      <Button onClick={HandleLogin} className='mt-3 mb-5 signup-sign-btn' variant="primary" type="submit">
        Already have an account? Login
      </Button>
    </Form>
   </Container>
   </>
  );
}

export default Signup;