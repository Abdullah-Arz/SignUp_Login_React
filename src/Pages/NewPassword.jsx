import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../Components/Header';
import '../Sass/NewPassword.scss';
import { FiEye, FiEyeOff,FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NotificationManager} from 'react-notifications';
import { PuffLoader } from 'react-spinners';

function NewPassword() {

    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordType1, setPasswordType1] = useState("password");
    const [passwordInput1, setPasswordInput1] = useState("");
    const [state_loader, setState_Loader] = useState(false)

    const Api = localStorage.getItem('API')
    const navigate = useNavigate()
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('token')
    console.log(product);

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
        setState_Loader(true)
        const data = new FormData(event.target)
        console.log('Forget data ----- ', data.get('password'),data.get('confirmPassword'))
        
        const body={
            "password" : data.get('password'),
            "token" : product
        }
        
        axios.post(`${Api}/auth/password_reset/confirm/`,body)
        .then((res)=>{
            console.log('Signup Api Response ---- ',res.data);
            if(res.data.status == 'OK'){
              NotificationManager.success('Password Change Successfully');
              navigate('/')
              setState_Loader(false)
              event.target.reset()
              
            }else{
              NotificationManager.error('Something Went Wrong');
              setState_Loader(false)
            }
            // NotificationManager.success(res.data.error)
            // if(res.data.error == 'User Already Exists, Try Adding other username'){
            //     NotificationManager.error('This Username is Already Taken')
            // }else if(res.data.error == 'Email must be Unique.'){
            //     NotificationManager.error(res.data.error)
            // }else {
                // event.target.reset(),
                
            // }

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

     

  return (
    <>
    <Header loginHeader={true} />
   <Container >
     <Form onSubmit={HandleSubmit} className='newpass-container'>
        <h1 className='newpass-h1'>Enter New Credentials</h1>
        <p className='newpass-p'>Please enter your new password</p>
        <div className = 'mt-3' />

      <Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
        <Form.Label className='newpass-formlabel'>New Password</Form.Label>
        <div className='newpass-password-div'>
        <Form.Control 
        required
        title='Password must contain one special character, one Uppercase and at least 8 characters length'
        name='password'
        placeholder="new password" 
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
        <div className='newpass-form-label-div'>
        <Form.Label className='newpass-form-label' >Password must contain one capital letter and one special character</Form.Label> <br />
        {error.password && <span style={{color:'red'}}>{error.password}</span>}
        </div>
        {/* {error.password && <span style={{color:'red'}}>{error.password}</span>} */}
        {/* {state_Passmatch == true ? <p>Password match</p> : <p>Password must be same</p>} */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='newpass-formlabel'>Confirm New Password</Form.Label>
        <div className='newpass-password-div'>
        <Form.Control 
        required
        title='Password must contain one special character, one Uppercase and at least 8 characters length'
        name='confirmPassword'
        placeholder="confirm new password" 
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
        <div className='newpass-form-label-div'>
        <Form.Label className='newpass-form-label' >Password must contain one capital letter and one special character</Form.Label>
        {error.confirmPassword && <span style={{color:'red', marginTop:"-10px"}}>{error.confirmPassword}</span>}
        </div>
        {/* {error.confirmPassword && <span style={{color:'red'}}>{error.confirmPassword}</span>} */}
        {/* {state_Passmatch == true ? <p>Password match</p> : <p>Password must be same</p>} */}
      </Form.Group>
      
      <Button className='mt-5' style={{ display:"flex",justifyContent:'center'}} variant="primary" type="submit">
      { state_loader ? (
        <PuffLoader
        color="#ffffff"
        size={24}
      />
      ) : (
        'Confirm'
      )
      }
        
      </Button>
    </Form>
   </Container>
   </>
  );
}

export default NewPassword;