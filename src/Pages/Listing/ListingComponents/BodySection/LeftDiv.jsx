import React, {useState, useEffect}  from 'react'
import axios from "axios";
import { show_alerta } from "../../../../functions";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import "./BodySection.css";
import { useNavigate } from 'react-router-dom';

// Impored Images
import SalesWoman from "../../../../Assets/saleswoman.png";
import Gross from "../../../../Assets/gross.png"




const LeftDiv = () => {

  //MARK: Properties
  const token = localStorage.getItem('token')
  const baseUrl ='http://localhost:3000/api'
  const [datos, setDatos] = useState({})
  const [datosEstilista, setDatosEstilista] = useState([])
  const [maxVendedora, setMaxVendedora] = useState({})
  const [totalDia, setTotalDia] = useState({})
  const [decoded, setDecoded] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn();
  },[])

  const logOut = () =>{
    localStorage.removeItem('token');
    navegarLogin();
}
  const isLoggedIn= () =>{
    if(token){
        setDecoded(jwtDecode(token));
        getTotal()
       
    }else{
        navegarLogin();
    }
}

//metodo que regresa al login si aun no te has logueado.
function navegarLogin(){
  navigate('/')
}

//MARK: - Metodo para traer la lista de los trips..
const getTotal = async () => {
  const currentMonth = new Date().getMonth() + 1;
  await axios.get(`${baseUrl}/total-mes-dia/${currentMonth}`, {
      headers: {
          'Content-Type': 'application/json',
          'auth-token': token
      }
  })
  .then(res => {
    //console.log(res.data)
     setDatos(res.data);
     getmaxVendor()
    })
    .catch(error => {
      if(error.response.status === 400){
          show_alerta('Sesion terminada','error')
          logOut()
      }else{
      show_alerta("Error en la solicitud",'error')
      console.log(error)
      }
  })
  
}


const getmaxVendor = async () => {
  await axios.get(baseUrl+'/maxima-vendedora', {
      headers: {
          'Content-Type': 'application/json',
          'auth-token': token
      }
  })
  .then(res => {
    //console.log(res.data)
     setMaxVendedora(res.data);
    })
    .catch(error => {
      if(error.response.status === 400){
          show_alerta('Sesion terminada','error')
          logOut()
      }else{
      show_alerta("Error en la solicitud",'error')
      console.log(error)
      }
  })
  
}


  return (
    <div className="LeftDiv grid">
      <div className="balance">
        <span className="topFlex flex">
          <small>Ventas del Mes - Citas</small>
        </span>
        <h1>${datos.totalMes}</h1>
      </div>

      <div className="savings">
        <span className="cardTitle">Reportes</span>
        <div className="items grid">
         

          <div className="singleItem">
            <span className="cardTop flex">
              <img src={SalesWoman} alt="Car Icon" />
              <span className="text">
                <h4>Maxima Vendedora</h4>
                <small>Numero de Citas: {maxVendedora.totalCitas} </small>
              </span>
              
            </span>
            <div className="progress flex">
              {/*maxVendedora._id.nombre*/}
              <span className="completed">
              ${maxVendedora.totalDinero}
              </span>
             
            </div>
          </div>

          <div className="singleItem">
            <span className="cardTop flex">
              <img src={Gross} alt="Car Icon" />
              <span className="text">
                <h4>Total Dia:</h4>
              </span>
              
            </span>
            <div className="progress flex">
              ${datos.totalDia}
              <span className="completed">
              
              </span>
             
            </div>
          </div>
          {/*<div className="singleItem">
            <span className="cardTop flex">
              <img src={PS} alt="Car Icon" />
              <span className="text">
                <h4>Son's Play Station</h4>
                <small>Monthly Savings: $100</small>
              </span>
              <span>
                <PiDotsThreeOutlineBold className="icon" />
              </span>
            </span>
            <div className="progress flex">
              <span className="completed">
                $200
                <span className="color"></span>
              </span>
              <span className="unCompleted">
                $1,000
                <span className="color"></span>
              </span>
            </div>
          </div>
          */}
        </div>
      </div>
    </div>
  );
};

export default LeftDiv;
