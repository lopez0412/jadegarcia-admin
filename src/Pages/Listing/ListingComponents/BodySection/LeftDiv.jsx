import React, {useState, useEffect}  from 'react'
import axios from "axios";
import { show_alerta } from "../../../../functions";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import "./BodySection.css";
import { useNavigate } from 'react-router-dom';

// Impored Images
import masterCard from "../../../../Assets/masterCard.png";
import Ring from "../../../../Assets/wedding-ring.png";
import House from "../../../../Assets/house.png";
import Travel from "../../../../Assets/business-trip.png";
import PS from "../../../../Assets/playstation.png";

// Impored Images
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { PiDotsThreeOutlineBold } from "react-icons/pi";

const LeftDiv = () => {

  //MARK: Properties
  const token = localStorage.getItem('token')
  const baseUrl ='http://localhost:3000/api'
  const [datos, setDatos] = useState({})
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
  navigate('/login')
}

//MARK: - Metodo para traer la lista de los trips..
const getTotal = async () => {
  await axios.get(baseUrl+'/total-mes/6', {
      headers: {
          'Content-Type': 'application/json',
          'auth-token': token
      }
  })
  .then(res => {
    //console.log(res.data)
     setDatos(res.data);
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
        <h1>${datos.total}</h1>
      </div>

      <div className="savings">
        <span className="cardTitle">Savings Plan</span>
        <div className="items grid">
         

          <div className="singleItem">
            <span className="cardTop flex">
              <img src={Ring} alt="Car Icon" />
              <span className="text">
                <h4>Wedding Function</h4>
                <small>Monthly Savings: $1500</small>
              </span>
              <span>
                <PiDotsThreeOutlineBold className="icon" />
              </span>
            </span>
            <div className="progress flex">
              <span className="completed">
                $50,000
                <span className="color"></span>
              </span>
              <span className="unCompleted">
                $250,000
                <span className="color"></span>
              </span>
            </div>
          </div>
          <div className="singleItem">
            <span className="cardTop flex">
              <img src={House} alt="Car Icon" />
              <span className="text">
                <h4>New Home</h4>
                <small>Monthly Savings: $1500</small>
              </span>
              <span>
                <PiDotsThreeOutlineBold className="icon" />
              </span>
            </span>
            <div className="progress flex">
              <span className="completed">
                $40,000
                <span className="color"></span>
              </span>
              <span className="unCompleted">
                $50,000
                <span className="color"></span>
              </span>
            </div>
          </div>

          <div className="singleItem">
            <span className="cardTop flex">
              <img src={Travel} alt="Car Icon" />
              <span className="text">
                <h4>Family Trip</h4>
                <small>Monthly Savings: $500</small>
              </span>
              <span>
                <PiDotsThreeOutlineBold className="icon" />
              </span>
            </span>
            <div className="progress flex">
              <span className="completed">
                $5,000
                <span className="color"></span>
              </span>
              <span className="unCompleted">
                $10,000
                <span className="color"></span>
              </span>
            </div>
          </div>

          <div className="singleItem">
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
        </div>
      </div>
    </div>
  );
};

export default LeftDiv;
