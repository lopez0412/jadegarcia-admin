import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { show_alerta } from '../../functions';
import Logo from "../../Assets/IconosJade/LOGOS MODIFICADOS-02.png";
import './Login.css'

async function loginUser(credentials) {

    return axios.post('http://localhost:3000/api/login', JSON.stringify(credentials),{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.data)
    .catch(error => console.error(error))
   }

function Login() {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            show_alerta("Por favor complete ambos campos", 'warning');
            return;
        }
        
        await loginUser({
            "username": username,
            "password": password
          }).then(function(respuesta){
            //console.log(respuesta)
            if(typeof respuesta !== "undefined"){
              localStorage.setItem('token', respuesta);
              navegarTrips()
            }else{
              show_alerta("Usuario y/o contraseña incorrecta",'error')
            }
        })
        .catch(function(error){
          //console.log(error)
            show_alerta("Usuario y/o contraseña incorrecta",'error')   
        })
          
         
        
    };

    useEffect(() => {
        validateLoggedIn()
    }, []);

    function validateLoggedIn(){
      const token = localStorage.getItem('token')
      if (token){
        navegarTrips()
      }
    }

    function navegarTrips(){
      navigate('/listing')
    }
  return (
    <div className="login-container">

    <div class="login-card">
          <div>
              <img
                src={Logo}
                alt="login-icon"
                style={{height: "12rem", width: "12rem"}}
              />
            </div>

          <h2>Inicia Sesion</h2>
            <form onSubmit={handleSubmit}>
              <div >
                <input type="text" placeholder='Nombre de usuario' onChange={e => setUserName(e.target.value)} />
            </div>
            
            <div>
                <input  type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} />
            </div>
              <div>
                <button className='btn text-white' type="submit">Iniciar</button>
              </div>
              <br/><br/>
            </form>

    </div>
</div>
  )
}

export default Login