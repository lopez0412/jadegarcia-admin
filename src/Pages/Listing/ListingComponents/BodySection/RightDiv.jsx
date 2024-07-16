import React, {useState, useEffect}  from 'react'
import axios from "axios";
import { show_alerta } from "../../../../functions";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import "./BodySection.css";

// Imported icons

import { FaPlus } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



const RightDiv = () => {
  //MARK: Properties
  const token = localStorage.getItem('token')
  const baseUrl ='http://localhost:3000/api'
  const [selectedService, setSelectedService] = useState()
  const [newService, setNewService] = useState({})
  const [decoded, setDecoded] = useState('')
  const [servicios, setServicios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [details, setDetails] = useState("detailsPage");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn();

    if (loading) {
      Swal.fire({
          title: 'Cargando...',
          allowOutsideClick: false,
          onBeforeOpen: () => {
              Swal.showLoading();
          }
      });
  } else {
      Swal.close();
  }

  },[])

  const logOut = () =>{
    localStorage.removeItem('token');
    navegarLogin();
}
  const isLoggedIn= () =>{
    if(token){
        setDecoded(jwtDecode(token));
        getServices()
        getCategorias()
    }else{
        navegarLogin();
    }
}
//metodo para la obtener los inputs
const handleChange = (e) => {
  setSelectedService({
    ...selectedService,
    [e.target.name]: e.target.value
  });
};

//metodo para la obtener los inputs
const handleChangeNew = (e) => {
  setNewService({
    ...newService,
    [e.target.name]: e.target.value
  });
};


//metodo que regresa al login si aun no te has logueado.
function navegarLogin(){
  navigate('/')
}

//MARK: - Metodo para traer la lista de los trips..
const getServices = async () => {
  await axios.get(baseUrl+'/services', {
      headers: {
          'Content-Type': 'application/json',
      }
  })
  .then(res => {
    //console.log(res)
     setServicios(res.data);
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

    //metodo para borrar imagenes
  const handleRemoveImage = (e,index) => {
      e.preventDefault()
      const updatedImages = selectedService.images.filter((image, i) => i !== index);
      setSelectedService({
          ...selectedService,
          images: updatedImages
      });
  };

//MARK: - Metodo para traer la lista de los trips..
const getServiceByCat = async (categoria) => {
  await axios.get(baseUrl+'/servicios/'+categoria, {
      headers: {
          'Content-Type': 'application/json',
      }
  })
  .then(res => {
    //console.log(res)
      setServicios(res.data);
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

//MARK: - Metodo para traer la lista de las categorias..
const getCategorias = async () => {
  await axios.get(baseUrl+'/servicios/categorias', {
      headers: {
          'Content-Type': 'application/json',
      }
  })
  .then(res => {
    //console.log(res)
     setCategorias(res.data);
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
const showDetails = (service) => {
  setSelectedService(service)
  setDetails("showDetails detailsPage");
};
const removeDetails = () => {
  setSelectedService()
  setDetails("detailsPage");
};

const validateCategory = (categoria) =>{
  if(categoria == 'Categorias'){
    getServices()
  }else{
    getServiceByCat(categoria)
  }
}

  //Metodo para los files
  const handleFileChange = async (event) => {
    setSelectedFiles(event.target.files);
};

const handleUpload = async () => {
  setLoading(true)
  if(selectedFiles.length === 0){
      editar()
      return
  }
 
  if (!selectedService.nombre || !selectedService.categoria || !selectedService.descripcion || !selectedService.estaciones || !selectedService.duration || !selectedService.precio.min || !selectedService.precio.max) {
      Swal.fire("Advertencia", "Por favor complete todos los campos", "warning");
      setLoading(false)
      return;
  }

      const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('imagen[]', selectedFiles[i]);
        }
        
        axios.post('https://nativo503sv.com/uploader.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                console.log('URL de la imagen subida:', response.data.urls);
                // Aquí puedes manejar la URL de la imagen subida como desees
                //console.log(response.data)
                editar(response.data.urls)
            })
            .catch(error => {
                setLoading(false)
                console.error('Error al subir la imagen:', error);
                Swal.fire("Error", "Error al subir las imagenes, intente de nuevo mas tarde.","error");
            });
  } 

const handleUploadNew = async () => {
  setLoading(true)
  if(selectedFiles.length === 0){
      agregar()
      return
  }
 //console.log(newService)
  if (!newService.nombre || !newService.categoria || !newService.descripcion || !newService.estaciones || !newService.duration || !newService.precioMin || !newService.precioMax) {
      Swal.fire("Advertencia", "Por favor complete todos los campos", "warning");
      setLoading(false)
      return;
  }

  const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('imagen[]', selectedFiles[i]);
        }
        
        axios.post('https://nativo503sv.com/uploader.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                console.log('URL de la imagen subida:', response.data.urls);
                // Aquí puedes manejar la URL de la imagen subida como desees
                //console.log(response.data)
                agregar(response.data.urls)
            })
            .catch(error => {
                setLoading(false)
                console.error('Error al subir la imagen:', error);
                Swal.fire("Error", "Error al subir las imagenes, intente de nuevo mas tarde.","error");
            });
}

const editar = async (urlsSubidas) =>{
  var metodo = 'PUT'
     //if you upload a new image, this will add to an array
     var imageArray =[]
     if (urlsSubidas != null) {
          imageArray = [...selectedService.images, ...urlsSubidas]
     }else{
          imageArray = [...selectedService.images]
     }
  var parametros = {
    images: imageArray,
    nombre: selectedService.nombre,
    descripcion: selectedService.descripcion,
    precio: {
      min: selectedService.precioMin ?  selectedService.precioMin : selectedService.precio.min,
      max: selectedService.precioMax ?  selectedService.precioMax : selectedService.precio.max,
    },
    duration: selectedService.duration,
    categoria: selectedService.categoria,
    estaciones: selectedService.estaciones,
    indicaciones: selectedService.indicaciones
  }

  var urlStr = baseUrl + '/services/'+selectedService._id
  var header ={'Content-Type': 'application/json','auth-token': token}
  await axios({method: metodo, url: urlStr,headers: header, data: parametros})
  .then(function(respuesta){
      console.log(respuesta)
      var type = respuesta.data.tipo
      var message = respuesta.data.mensaje
      show_alerta(message,type)
      if (type === 'success'){
          removeDetails()
          getServices();
          setLoading(false)
      }
  })
  .catch(function(error){
      console.log(error)
      setLoading(false)
      if(error.response.status === 401){
          removeDetails()
          show_alerta('Sesion terminada','error')
          logOut()
      }else{
      show_alerta("Error en la solicitud",'error')
      console.log(error)
      }
  })
}

const agregar = async (urlsSubidas) =>{
  var metodo = 'POST'
  var parametros = {
    images: urlsSubidas,
    nombre: newService.nombre,
    descripcion: newService.descripcion,
    precio: {
      min: newService.precioMin,
      max: newService.precioMax,
    },
    duration: newService.duration,
    categoria: newService.categoria,
    estaciones: newService.estaciones,
    indicaciones: newService.indicaciones
  }

  var urlStr = baseUrl + '/services'
  var header ={'Content-Type': 'application/json','auth-token': token}

  await axios({method: metodo, url: urlStr,headers: header, data: parametros})
  .then(function(respuesta){
      console.log(respuesta)
      var type = respuesta.data.tipo
      var message = respuesta.data.mensaje
      show_alerta(message,type)
      if (type === 'success'){
        removeDetails()
          getServices();
          setLoading(false)
      }
  })
  .catch(function(error){
      console.log(error)
      setLoading(false)
      if(error.response.status === 401){
        removeDetails()
          show_alerta('Sesion terminada','error')
          logOut()
      }else{
      show_alerta("Error en la solicitud",'error')
      console.log(error)
      }
  })
}

const deleteServicio = (id,name) =>{
  const MySwal = withReactContent(Swal)
  MySwal.fire({
      title: 'Seguro desea eliminar el Servicio '+name+' ?',
      icon: 'question', text: 'No se podra dar marcha atras',
      showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'Cancelar'
  }).then((result) => {
      if(result.isConfirmed){
          deleteService('DELETE',{id:id})
      }else{
          show_alerta('El servicio No se elimino', 'info')
      }
  })
  .catch(error => {
      if(error.response.status === 401){
          show_alerta('Sesion terminada','error')
          logOut()
      }else{
      show_alerta("Error en la solicitud",'error')
      console.log(error)
      }
  })

}

  const deleteService = async(metodo, parametros) => {
        
    var urlStr = ""
    switch (metodo){
        case 'DELETE':
            urlStr = baseUrl + '/services/'+parametros.id
            break;
    }
    var header ={'Content-Type': 'application/json','auth-token': token}

          //console.log(metodo, parametros,urlStr, header)

    await axios({method: metodo, url: urlStr,headers: header, data: parametros})
            .then(function(respuesta){
                console.log(respuesta)
                var message = respuesta.data.message
                show_alerta(message,"success")
                removeDetails()
                getServices();
                setLoading(false)
                
            })
            .catch(function(error){
                console.log(error)
                setLoading(false)
                if(error.response.status === 401){
                  removeDetails()
                    show_alerta('Sesion terminada','error')
                    logOut()
                }else{
                show_alerta("Error en la solicitud",'error')
                console.log(error)
                }
            })
  }

  return (
    <div className="RightDiv grid">
      <div className="listingContainer">
        <span className="cardTitle">Servicios</span>
        <div className="searchField flex">
          <div className="select places">
            <small>Selecciona categoria</small>
            <select name="" id="" onChange={(event) => validateCategory(event.target.value)}>
            <option value="Categorias">Todas las Categorias</option>
              {categorias.map((cat,index)=>(
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
       
          <button className="btn flex" onClick={() => showDetails()}>
            <FaPlus className="icon" /> Agregar{" "}
          </button>
        </div>

        <div className="secContainer grid">
          {servicios.map((list) => (
            <div className="singleProperty">
              <div className="infor flex">
                <div className="text">
                  <h4>{list.nombre}</h4>
                  <small>Categoria - {list.categoria}</small>
                </div>
              </div>
              <div className="temperature">
                <span className="title"><FaRegClock  ir className="icon" /> Duracion : {list.duration / 60} Horas</span>
              </div>

              <div className="imgDiv">
                <img src={list.images[0]} alt="House image" />
              </div>
              <div className="price flex">
                <span>
                  Rango de Precios
                  <h4>${list.precio.min} - ${list.precio.max}</h4>
                </span>
                <button onClick={() => showDetails(list)} className="btn">
                  Editar
                </button>
              </div>
                </div>

          ))}
        </div>
      </div>
      {/** Esta es la modal que se abre sobre el grid */}
      <div className={details}>
        {selectedService ? (
        <div>
        <span className="cardTitle flex">
          Detalles del Servicio{" "}
          <AiOutlineCloseCircle id='btnClose' className="icon" onClick={removeDetails} />
        </span>
        <div className="secContainer flex">
          <div className="imgsDiv">
            <img className="mainImg" src={selectedService.images[0]}  alt="main Image" />
            <div className="smallImages flex">
              {selectedService.images.map((image, index) => (
                <div>
                <img src={image} key={index} alt="small image" />
                <button className="btnRemovePic" onClick={(e) => handleRemoveImage(e,index)}>-</button>
                </div>
              ))}
            </div>
          </div>
          <div className="agentsDiv">
            <span className="cardTitle flex">Servicio</span>
            <div className="agentInfo">
              <div className="bottom">
                <div className="details grid">
                  <div> Nombre: <input id='nombre' name='nombre' value={selectedService.nombre} onChange={(e) => handleChange(e)}/></div>
                  <div> Fotos: <input type="file" multiple onChange={handleFileChange} /> </div>
                  <div>
                    Categoria:  <input id='categoria' name='categoria' value={selectedService.categoria} onChange={(e) => handleChange(e)}/>
                  </div>
                  <div>
                    Descripcion:  <textarea id='descripcion' name='descripcion' value={selectedService.descripcion} onChange={(e) => handleChange(e)}/>
                  </div>
                  <div>
                    Estaciones: <input id='estaciones' name='estaciones' value={selectedService.estaciones} onChange={(e) => handleChange(e)}/>
                  </div>
                  <div>
                   Indicaciones:  <textarea id='indicaciones' name='indicaciones' value={selectedService.indicaciones} onChange={(e) => handleChange(e)}/>
                  </div>
                  <div>
                    Duracion (Minutos): <input id='duration' name='duration' value={selectedService.duration} onChange={(e) => handleChange(e)}/> {selectedService.duration / 60} Horas
                  </div>
                  <div>
                    Precio (Min): <input id='preciomin' name='precioMin'  onChange={(e) => handleChange(e)}/>  ${selectedService.precio.min}
                  </div>
                  <div>
                    Precio (Max): <input id='preciomax' name='precioMax'  onChange={(e) => handleChange(e)}/>  ${selectedService.precio.max}
                  </div>
                  <div>
                    <button className='btn btn-sm' name='save' onClick={handleUpload}>Guardar</button>
                    <button className='btnBorrar' name='delete' onClick={() => deleteServicio(selectedService._id,selectedService.nombre)}>Borrar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> ) : (
      <div>
        <span className="cardTitle flex">
          Detalles del Servicio{" "}
          <AiOutlineCloseCircle id='btnClose' className="icon" onClick={removeDetails} />
        </span>
        <div className="secContainer flex">
        
          <div className="agentsDiv">
            <span className="cardTitle flex">Servicio</span>
            <div className="agentInfo">

              <div className="bottom">
                <div className="details grid">
                  <div>Nombre: <input id='nombre' name='nombre' onChange={(e) => handleChangeNew(e)}/></div>
                  <div> Fotos: <input type="file" multiple onChange={handleFileChange} /> </div>
                  <div>
                    Categoria:  <input id='categoria' name='categoria' onChange={(e) => handleChangeNew(e)}/>
                  </div>
                  <div>
                    Descripcion:  <textarea id='descripcion' name='descripcion'  onChange={(e) => handleChangeNew(e)}/>
                  </div>
                  <div>
                    Estaciones: <input id='estaciones' name='estaciones' onChange={(e) => handleChangeNew(e)}/>
                  </div>
                  <div>
                   Indicaciones:  <textarea id='indicaciones' name='indicaciones' onChange={(e) => handleChangeNew(e)}/>
                  </div>
                  <div>
                    Duracion (Minutos): <input id='duration' name='duration' onChange={(e) => handleChangeNew(e)}/>
                  </div>
                  <div>
                    Precio (Min): <input id='precioMin' name='precioMin' onChange={(e) => handleChangeNew(e)}/>
                  </div>
                  <div>
                    Precio (Max): <input id='precioMax' name='precioMax' onChange={(e) => handleChangeNew(e)}/>
                  </div>
                  <div><button className='btn btn-sm' name='save' onClick={handleUploadNew}>Guardar</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>) }
    </div>
    {/**Aqui termina el modal de edicion. */}
    </div>
  );
};

export default RightDiv;
