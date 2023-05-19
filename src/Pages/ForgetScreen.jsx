import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../Components/Header';
import '../Sass/Login.scss';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NotificationManager} from 'react-notifications';
import {FadeLoader, PacmanLoader, PuffLoader} from 'react-spinners'

function ForgetScreen() {

    const[state_loader, setState_Loader] = useState(false)
    const Api = localStorage.getItem('API')
    const navigate = useNavigate()

    const HandleSubmit = (event) => {
      setState_Loader(true)
        event.preventDefault()
        const data = new FormData(event.target)
        console.log('login data ----- ', data.get('email'))

        const body={
            "email": data.get('email'),   
        }
        axios.post(`${Api}/auth/password_reset/`,body)
        .then((res)=>{
            console.log('Forget Api Response ---- ',res.data)

            // if( res.data.error == 'Invalid Password'){
            //     NotificationManager.error(res.data.error)
            // }else{
                NotificationManager.success('New Password Link sent to your Email Successfully')
                // navigate('/')
                event.target.reset()
                setState_Loader(false)
            // }
        }).catch((error)=>{
            console.log('Forget Api Error ----- ',error)
            NotificationManager.error(error.response.data.email[0])
            setState_Loader(false)
        })

    }
     

  return (
    <>
    <Header loginHeader={true} />
   <Container >
     <Form onSubmit={HandleSubmit} className='login-container'>
        <h1 className='login-h1'>Login your account</h1>
        <p className='login-p'>Please enter your details</p>
        <div className = 'mt-3' />

      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
        <Form.Label className='login-formlabel'>Email</Form.Label>
        <Form.Control required type='email' name='email' placeholder="email" />
      </Form.Group>

      <Button className='mt-5 mb-5' style={{ display:"flex",justifyContent:'center'}} variant="primary" type="submit">
      { state_loader ? (
        <PuffLoader
        color="#ffffff"
        size={24}
      />
      ) : (
        'Send Link'
      )
      }
      </Button>

    </Form>
   </Container>
   </>
  );
}

export default ForgetScreen;