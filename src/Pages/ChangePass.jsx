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

function ChangePass() {
    const [passwordType0, setPasswordType0] = useState("password");
    const [passwordInput0, setPasswordInput0] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordType1, setPasswordType1] = useState("password");
    const [passwordInput1, setPasswordInput1] = useState("");

    const Api = localStorage.getItem('API')
    const navigate = useNavigate()
    const Token = sessionStorage.getItem('Token')

    const handlePasswordChange0 =(evnt)=>{
        setPasswordInput0(evnt.target.value);
        console.log('Current Password field ----- ',evnt.target.value);
        onInputChange(evnt)
        
    }
    const togglePassword0 =()=>{
      passwordType0==="password" ? setPasswordType0("text") : setPasswordType0("password")
    }

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
        console.log('Forget data ----- ', data.get('password'),data.get('confirmPassword'),data.get('currentpassword'))
        
        if(data.get('password').length >= 8){
            const body={
                "new_password1" : data.get('password'),
                "new_password2" : data.get('confirmPassword'),
            }
            
            axios.post(`${Api}/auth/password/change/`,body,{
                headers : {
                    Authorization : `Bearer ${Token}`
                }
            })
            .then((res)=>{
                console.log('Change Password Api Response ---- ',res.data);
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
                    // navigate('/')
                    event.target.reset();
                    NotificationManager.success(res.data.detail)
                    
                  }
    
            }).catch((error)=>{
                console.log('Change Password ----- ',error.response.data.messages[0].message)
                NotificationManager.error('Something Went Wrong')
            })
        }else{
            NotificationManager.error('Password must contain 8 character length')
        }

        }
        

    const [input, setInput] = useState({
        currentpassword: '',
        password: '',
        confirmPassword: ''
      });
     
      const [error, setError] = useState({
        currentpassword: '',
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

            case "currentpassword":
              if (!value) {
                stateObj[name] = "Please enter your current Password.";
              }
            //   else if (input.confirmPassword && value !== input.confirmPassword) {
            //     stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
            //   } else {
            //     stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
            //   }
              break;
     
            case "password":
              if (!value) {
                stateObj[name] = "Please enter your new Password.";
              } else if (input.confirmPassword && value !== input.confirmPassword) {
                stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
              } else {
                stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
              }
              break;
     
            case "confirmPassword":
              if (!value) {
                stateObj[name] = "Please enter Confirm Password.";
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
    <Header />
   <Container >
     <Form onSubmit={HandleSubmit} className='signup-container'>
        <h1 className='signup-h1'>Change Credentials</h1>
        <p className='signup-p'>Please enter your new credentials</p>
        <div className = 'mt-3' />

        <Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
        <Form.Label className='signup-formlabel'>Current Password</Form.Label>
        <div className='signup-password-div'>
        <Form.Control 
        required
        title='Enter Correct Current Password'
        name='currentpassword'
        placeholder="current password" 
        type={passwordType0}
        defaultValue={input.currentpassword}
        onChange={handlePasswordChange0}
        onBlur={validateInput}
        pattern="(?=.*[a-z]).{8,}"
        />
        
        {passwordType0 == 'password' ? (
            <FiEye onClick={togglePassword0} />
        ) : (
            <FiEyeOff onClick={togglePassword0}/>
        ) }
        
        </div>
        {error.currentpassword && <span style={{color:'red'}}>{error.currentpassword}</span>}
      </Form.Group>

      <Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
        <Form.Label className='signup-formlabel'>New Password</Form.Label>
        <div className='signup-password-div'>
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
        <Form.Label className='signup-form-label' >Password must contain one special character, one Uppercase and at least 8 characters length</Form.Label> <br />
        {error.password && <span style={{color:'red'}}>{error.password}</span>}
        {/* {state_Passmatch == true ? <p>Password match</p> : <p>Password must be same</p>} */}
      </Form.Group>

      <Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
        <Form.Label className='signup-formlabel'>Confirm New Password</Form.Label>
        <div className='signup-password-div'>
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
        <Form.Label className='signup-form-label' >Password must contain one special character, one Uppercase and at least 8 characters length</Form.Label> <br />
        {error.confirmPassword && <span style={{color:'red'}}>{error.confirmPassword}</span>}
        {/* {state_Passmatch == true ? <p>Password match</p> : <p>Password must be same</p>} */}
      </Form.Group>
      
      <Button className='mt-3' variant="primary" type="submit">
        Confirm
      </Button>
    </Form>
   </Container>
   </>
  );
}

export default ChangePass;