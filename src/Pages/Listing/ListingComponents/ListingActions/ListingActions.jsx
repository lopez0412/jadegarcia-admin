import React, {useState, useEffect}  from 'react'
import axios from "axios";
import { show_alerta } from "../../../../functions";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { Calendar, dayjsLocalizer  } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from 'dayjs'
import "dayjs/locale/es"
import "./ListingActions.css";


function ListingActions({ cita,removeDetalles, getApp }) {
  //MARK: Properties
  const token = localStorage.getItem('token')
  const baseUrl ='http://localhost:3000/api'
  const [personal, setPersonal] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [decoded, setDecoded] = useState('')
  const [total, setTotal] = useState(cita.data.servicioId.precio.min)
  const [idPersonal, setIdPersonal] = useState('')
  const [loading, setLoading] = useState(false);
  const [selectedForm, setSelectedForm] = useState('');

  const [newDate, setNewDate] = useState('')


    const handleOptionChange = (event) => {
        setSelectedForm(event.target.value);
    };

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
        getPersonal()
    }else{
        navegarLogin();
    }
}

//metodo que regresa al login si aun no te as logueado.
function navegarLogin(){
    location.href = '/login'
}


    
//MARK: - Metodo para traer la lista del personal..
const getPersonal = async () => {
    await axios.get(baseUrl+'/personal', {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    })
    .then(res => {
      //console.log(res)
       setPersonal(res.data);
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
  
  const handleDateChange = (service,event) => {
    //console.log(service, event.target.value)
    getDisponibilidad(service,event.target.value)
  };
  
  //MARK: - Metodo para traer la lista del personal..
  const getDisponibilidad = async (serviceId,fecha) => {
    await axios.get(baseUrl+'/disponibilidad/'+serviceId+'/'+fecha, {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    })
    .then(res => {
      //console.log(res)
       setHorarios(res.data);
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
  const reagendarCita = async () =>{
    if(newDate == ''){
        show_alerta("Completa los campos", "error")
        return
    }


    var idCita = cita.data._id
    var metodo = 'PUT'
    var urlStr = baseUrl+"/citas/"+idCita+"/reagendar"
    var header ={'Content-Type': 'application/json','auth-token': token}
  
    var parametros = {
    nuevaFecha: newDate,
    }
  
  console.log(metodo, parametros,urlStr, header)
  
      await axios({method: metodo, url: urlStr,headers: header, data: parametros})
              .then(function(respuesta){
                  console.log(respuesta)
                    setLoading(false)
                    show_alerta(respuesta.data.message,'success')
                    removeDetalles()
                    getApp()
              })
              .catch(function(error){
                  console.log(error)
                  setLoading(false)
                  if(error.response.status === 401){
                      show_alerta('Sesion terminada','error')
                      logOut()
                  }else{
                  show_alerta("Error en la solicitud",'error')
                  console.log(error)
                  }
              })
  }

    const completarCita = async () =>{
        if(total == 0 || idPersonal == ''){
            show_alerta("Completa los campos", "error")
            return
        }


        var idCita = cita.data._id
        var metodo = 'PUT'
        var urlStr = baseUrl+"/citas/"+idCita+"/completar"
        var header ={'Content-Type': 'application/json','auth-token': token}
      
        var parametros = {
          total: total,
          atendidoPorId: idPersonal
        }
      
      console.log(metodo, parametros,urlStr, header)
      
          await axios({method: metodo, url: urlStr,headers: header, data: parametros})
                  .then(function(respuesta){
                      console.log(respuesta)
                        setLoading(false)
                        show_alerta(respuesta.data.message,'success')
                        removeDetalles()
                        getApp()
                        
                  })
                  .catch(function(error){
                      console.log(error)
                      setLoading(false)
                      if(error.response.status === 401){
                          show_alerta('Sesion terminada','error')
                          logOut()
                      }else{
                      show_alerta("Error en la solicitud",'error')
                      console.log(error)
                      }
                  })
      }

      {/** TODO:  Cambialos por un modal bien chingon, cambia los inputs por botones*/}
  return (
        <div>
            {cita.data.estado == "Completa" ? <div></div> : (
            <div>
            <h1>Acciones</h1>
            <br/>
              <form>
                  <label>
                      <input
                          type="radio"
                          name="option"
                          value="form1"
                          onChange={handleOptionChange}
                      /> Re-agendar
                  </label>
                  <label>
                      <input
                          type="radio"
                          name="option"
                          value="form2"
                          onChange={handleOptionChange}
                      /> Completar
                  </label>
                  </form>
              <div>
                {selectedForm === 'form1' && (
                    <div id="form1">
                        <h2>Re agendar</h2>
                        <div className='flex'>
                        <label htmlFor="newdate">Fecha:</label>
                        <input
                            type="date"
                            id="newdate"
                            name="newdate"
                            onChange={(event) => handleDateChange(cita.data.servicioId._id, event)}
                        /><br /><br />
                        <div style={{width: '8px'}}></div>
                        <label htmlFor="hora" style={{width: '50px'}}>Hora:</label>
                        <div className='product-available'>
                            {horarios.map((hora, index) => (
                                  <div key={index} className='radio-container'>
                                  <input type='radio' id={`hora${index}`} name='hora' className='radio-button' onChange={()=>setNewDate(hora)} />
                                  <label htmlFor={`hora${index}`} className='radio-label'>{hora.split('T')[1].split('.')[0]}</label>
                                </div>
                            ))}
                        </div>
                        </div>
                        <input className='btn' type="submit" value="Enviar" onClick={()=>reagendarCita()} />
                    </div>
                )}

                  {selectedForm === 'form2' && (
                      <div id="form2">
                          <h2>Completar</h2>
                          <div className='flex'>
                            <div className='total flex'>
                                <label htmlFor="total">Total:</label>
                                <input type="number" id="total" value={total} name="total" min={cita.data.servicioId.precio.min} max={cita.data.servicioId.precio.max} onChange={(event)=>setTotal(parseFloat(event.target.value))} /><br /><br />
                            </div>
                            <div style={{width: '8px'}}></div>
                            <div className='selectPersonal flex'>
                                <label htmlFor="email2">Atendido por:</label>
                                <select onChange={(event)=>setIdPersonal(event.target.value)}>
                                    <option key={0} value="0">Selecciona quien Atendio</option>
                                    {personal.map((persona) => (
                                    <option key={persona._id} value={persona._id} >{persona.nombre}</option>
                                    ))}
                                </select>
                            </div>
                          </div>
                          <br /><br />
                          <input className='btn' type="submit" value="Completar" onClick={() => completarCita()} />
                      </div>
                  )}
            </div>
            </div>)}
            </div>
  )
}

export default ListingActions