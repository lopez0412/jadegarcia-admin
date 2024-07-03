import React, {useState, useEffect}  from 'react'
import axios from "axios";
import { show_alerta } from "../../../../functions";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { Calendar, dayjsLocalizer  } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from 'dayjs'
import "dayjs/locale/es"
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';

// Imported icons
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { GrCatalog } from "react-icons/gr";
import ListingActions from '../ListingActions/ListingActions';
import Select from 'react-select'
import { CiHeart } from "react-icons/ci";



dayjs.locale("es")

const localizer = dayjsLocalizer(dayjs)

function Citas() {
  //MARK: Properties
  const token = localStorage.getItem('token')
  const baseUrl ='http://localhost:3000/api'
  const [reservaciones, setReservaciones] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [showNotes, setShowNotes] = useState(false);
  const [horarios, setHorarios] = useState([]);
  const [decoded, setDecoded] = useState('')
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState()
  const [selectedForm, setSelectedForm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [newAppoinment, setNewAppointment] = useState({})
  const [suggestions, setSuggestions] = useState([]);
  const [newDate, setNewDate] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [newNote, setNewNote] = useState('')

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
        getAppoinments()
        filtrarservicio()
    }else{
        navegarLogin();
    }
}

//metodo que regresa al login si aun no te as logueado.
function navegarLogin(){
  navigate('/login')
}

//MARK: - Metodo para traer la lista de los trips..
const getAppoinments = async () => {
  await axios.get(baseUrl+'/getAllCitas', {
      headers: {
          'Content-Type': 'application/json',
          'auth-token': token
      }
  })
  .then(res => {
    //console.log(res)
     setReservaciones(res.data);
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

 //MARK: - Metodo para traer la lista del personal..
 const getDisponibilidad = async (serviceId,fecha) => {
  await axios.get(baseUrl+'/disponibilidad/'+serviceId+'/'+fecha, {
      headers: {
          'Content-Type': 'application/json',
          'auth-token': token
      }
  })
  .then(res => {
    console.log(res)
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




  const crearEventos = () =>{
    const events = []
    
    reservaciones.map((res) => {
        const fechaStart = new Date(res.citaDate)
        const fechaEnd = new Date(res.citaDate)

        fechaStart.setHours(fechaStart.getUTCHours())
        fechaStart.setDate(fechaStart.getDate())

        fechaEnd.setHours(fechaEnd.getUTCHours())
        fechaEnd.setUTCMinutes(fechaEnd.getUTCMinutes() + res.servicioId.duration);
        fechaEnd.setDate(fechaEnd.getDate())

        var colorBack = "#D30C7B" 

        switch (res.estado){
          case "Agendado":
            colorBack = "#B80C09"
            break;
          case "Completa":
            colorBack = "#069E2D"
            break
          case "Re-Agendado":
            colorBack = "#4EA699"
            break
        }


        events.push({
            start: fechaStart,
            end: fechaEnd,
            title: res.servicioId.nombre,
            data: res,
            colorEvento: colorBack,
            color: 'white'
        })
    })

    return events
  }

  const [details, setDetails] = useState("detailsPage");
  const showDetails = (event) => {
    setSelectedEvent(event)
    setDetails("showDetails detailsPage");
  };
  const removeDetails = () => {
    setSelectedEvent()
    setDetails("detailsPage");
  };
  const handleSelect = (e) => {
    const selectedDate = e.slots[0]; // Supongo que solo seleccionas una fecha

    // Formatea la fecha usando moment.js (si lo tienes instalado)
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD'); // Cambia el formato según tus necesidades

    console.log('Fecha seleccionada:', formattedDate);
    setSelectedDate(formattedDate)
    //TODO: open modal.
    showDetails()
  };


  //metodo para la obtener los inputs
  const handleChange = (e) => {
    setNewAppointment({
      ...newAppoinment,
      [e.target.name]: e.target.value
    });
  };

  const filtrarservicio = () => {
    axios.get(baseUrl + '/services')
        .then((response) => {
          procesaServicios(response.data)
        })
        .catch((error) => {
          console.error('Error fetching suggestions:', error);
        });
  }

  const procesaServicios = (array) =>{
    const options = []
    array.map((data) => {
      options.push({value: data._id, label: data.nombre})
    })
    setSuggestions(options)
  }

  const handleChangeSelect = (selectedOption) => {
      console.log(`Option selected:`, selectedOption)
      setServiceId(selectedOption.value)
      getDisponibilidad(selectedOption.value, selectedDate)
  };

  const GuardarCita = async() =>{
    if(newDate == '' || !newAppoinment.nombre || !newAppoinment.birthDate || !newAppoinment.telefono || !newAppoinment.enfoque ){
      show_alerta("Completa los campos", "warning")
      return
      }
      
      var metodo = 'POST'
      var urlStr = baseUrl + '/postCita'
      var header ={'Content-Type': 'application/json','auth-token': token}

      var parametros = {
        servicioId: serviceId,
        nombre: newAppoinment.nombre,
        fechaNacimiento: newAppoinment.birthDate,
        telefono: newAppoinment.telefono,
        preferencias: newAppoinment.enfoque,
        citaDate: newDate.split('T')[0],
        hora: newDate.split('T')[1].split('.')[0]
      }

      await axios({method: metodo, url: urlStr,headers: header, data: parametros})
      .then(function(respuesta){
          console.log(respuesta)
          var type = respuesta.data.tipo
          var message = respuesta.data.mensaje
          show_alerta(message,type)
          if (type === 'success'){
              removeDetails();
              getAppoinments();
              setLoading(false)
          }
      })
      .catch(function(error){
          console.log(error)
          setLoading(false)
          if(error.response.status === 401){
              removeDetails();
              show_alerta('Sesion terminada','error')
              logOut()
          }else{
          removeDetails();
          show_alerta("Error en la solicitud",'error')
          console.log(error)
          }
      })
  }

  const handleShowNotes = () =>{
    setShowNotes(true)
  }

  const handleHideNotes = () =>{
    setShowNotes(false)
  }

  const handleAddNote = async() =>{
    try {
      const response = await axios.post(`${baseUrl}/addUserNote`, {
        userId: selectedEvent.data.userId._id,
        note: newNote
      }, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      if (response.status === 200) {
        show_alerta('Nota actualizada con éxito', 'success');
        setNewNote(''); // Clear the new note field after successful submission
        window.location.reload();
      } else {
        throw new Error('Failed to update note');
      }
    } catch (error) {
      console.error('Error adding note:', error);
      show_alerta('Error al agregar la nota', 'error');
    }
  };
  

 
  return (
    <div className="RightDiv grid">
    <div className="listingContainer">
    <span className="cardTitle">Citas</span>
    <div className="content">
    <Calendar
          selectable={true}
            localizer={localizer}
            events={crearEventos()}
            step={30}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%", width: "100%", minHeight: "90vh" }}
            onSelectEvent={(event) => showDetails(event)}
            onSelectSlot={handleSelect}
            eventPropGetter={(myEventsList) => {
              const backgroundColor = myEventsList.colorEvento ? myEventsList.colorEvento : 'blue';
              const color = myEventsList.color ? myEventsList.color : 'blue';
              return { style: { backgroundColor ,color} }
            }}
            />
    </div>
   </div>
   <div className={details}  style={{ zIndex: 11}}>

            {showNotes ? (
              <div style={{ position: 'fixed', top: '20%', left: '30%', width: '40%', height: '60%', backgroundColor: 'white', padding: '20px', overflowY: 'scroll', zIndex: 1000, border: '1px solid black' }}>
               <span className="cardTitle flex">
               Notas{" "}
                <AiOutlineCloseCircle className="icon" onClick={() => handleHideNotes()} />
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <textarea
                placeholder="Escribe una nueva nota aquí..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }}
              />
              <button type="submit" className="btn" onClick={handleAddNote} style={{ padding: '10px 20px', borderRadius: '20px', backgroundColor: 'var(--primaryColor)', color: 'white', border: 'none', cursor: 'pointer' }}>Agregar Nota</button>
              </div>

              <div style={{marginTop: '20px'}}>
                {selectedEvent.data.userId.informacion.notas.map((note, index) => (
                  <div className='flex'>
                  <CiHeart /><p key={index}>{note}</p>
                  </div>
                ))}
              </div>
              
            
             
            </div>
            ) : <div></div>}
    
        {selectedEvent ? (
        <div>
          <span className="cardTitle flex">
            Detalles de cita{" "}
            <AiOutlineCloseCircle className="icon" onClick={removeDetails} />
          </span>
          <div className="secContainer flex">
            <div className="agentsDiv">
            <span className="cardTitle flex">Detalle Cliente</span>
            <div className="agentInfo">
              <div className="top flex">
                <span className="bio">
                  <span className="name">
                    {selectedEvent.data.userId ? selectedEvent.data.userId.informacion.nombre : selectedEvent.data.nombre} ({selectedEvent.data.userId ? "Usuario" : "Cliente"})
                    <small>{selectedEvent.data.userId ? selectedEvent.data.userId.informacion.fechaNacimiento.split("T")[0] : selectedEvent.data.fechaNacimiento.split("T")[0]}</small>
                  </span>
                  
                </span>
              </div>

              <div className="bottom">
                <p>
                  {selectedEvent.data.userId ? selectedEvent.data.userId.informacion.preferencias : selectedEvent.data.preferencias}
                </p>
                <div className="details grid">
                  <span>
                    Telefono: <small>{selectedEvent.data.userId ? selectedEvent.data.userId.informacion.telefono : selectedEvent.data.telefono}</small>
                  </span>
                  <span>
                    Fecha Cita: <small>{selectedEvent.data.citaDate.split("T")[0]}</small>
                  </span>
                  <span>
                    Hora Cita: <small>{selectedEvent.data.citaDate.split("T")[1]}</small>
                  </span>
                  <span>
                    Estado: <small>{selectedEvent.data.estado} </small>
                  </span>
                  {selectedEvent.data.userId && (
                    <span>
                      <button className='btn' id='verNotes' onClick={() =>handleShowNotes()}>Ver notas</button>
                    </span>
                  )}
                </div>
                <div className="contact flex">
                  <span>Contacta Cliente:</span>
                  <div className="flex">
                    <span className="call flex">
                      <FiPhoneCall className="icon" /> Llama
                    </span>
                  </div>
                </div>
               
               <div>
                <ListingActions cita={selectedEvent} removeDetalles={removeDetails} getApp={getAppoinments}/>
                </div>
              </div>
            </div>
            </div>
            <div className="agentsDiv">
              <span className="name flex">
                {selectedEvent.title} <small>{}</small>
                <span className="price flex">
                  Precio Min: <blockquote>${selectedEvent.data.servicioId.precio.min}</blockquote>{" "}
                </span>
                <span style={{width: "5px"}}></span>
                <span className="price flex">
                  Precio Max: <blockquote>${selectedEvent.data.servicioId.precio.max}</blockquote>{" "}
                </span>
              </span>

              <div className="amenities flex">
                <span>
                  <span>Duracion</span>
                  <span className="flex">
                    <FaRegClock className="icon" /> {selectedEvent.data.servicioId.duration / 60} Horas
                  </span>
                </span>

                <span>
                  <span>Categoria</span>
                  <span className="flex">
                    <GrCatalog className="icon" /> {selectedEvent.data.servicioId.categoria} 
                  </span>
                </span>
              </div>

              <span>
                <span className="title">Descripcion</span>
                <p>
                {selectedEvent.data.servicioId.descripcion}
                </p>
              </span>
             
              </div>
              
            </div>
           
          
              
        </div>) : (<div>
          <span className="cardTitle flex">
            Agregar cita{" "} {selectedDate}
            <AiOutlineCloseCircle className="icon" onClick={removeDetails} />
          </span>
          <div className="secContainer flex">
            <div className="agentsDiv">
            <span className="cardTitle flex">Nueva Cita</span>
            <div className="agentInfo">
              <div className="bottom">
                <div className="details grid">
                  <div> 
                    <Select options={suggestions} onChange={handleChangeSelect}/>
                  </div>
                  <div className='product-available'>
                            {horarios.map((hora, index) => (
                                  <div key={index} className='radio-container'>
                                  <input type='radio' id={`hora${index}`} name='hora' className='radio-button' onChange={()=>setNewDate(hora)} />
                                  <label htmlFor={`hora${index}`} className='radio-label'>{hora.split('T')[1].split('.')[0]}</label>
                                </div>
                            ))}
                        </div>
                  <div> Nombre: <input id='nombre' name='nombre' onChange={(e) => handleChange(e)}/></div>
                  <div>
                    Fecha de Nacimiento:  <input type='date'  id='birthDate' name='birthDate' value={newAppoinment.birthDate} onChange={(e) => handleChange(e)} defaultValue="1990-01-01" required/>
                  </div>
                  <div>
                    Telefono:  <input id='telefono' name='telefono'  onChange={(e) => handleChange(e)}/>
                  </div>
                  <div>
                    Enfoque: <textarea id='enfoque' name='enfoque'  onChange={(e) => handleChange(e)}/>
                  </div>
                 
                  <div><button className='btn btn-sm' name='save' onClick={GuardarCita} >Guardar</button></div>
                </div>
              </div>
            </div>
              </div>
              </div>
        </div>) }
      </div> 
 </div>
  )
}

export default Citas