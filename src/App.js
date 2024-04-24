
import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'

function App() {

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [antiguedad, setAntiguedad] = useState();
  const [id, setId] = useState();


  const [editar, setEditar] = useState(false);

  const [empleadosLista, setEmpleados] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      antiguedad: antiguedad
    }).then(() => {
      getEmpleados();
      cancel();
      Swal.fire({
        title: "Registro exitoso!",
        text: `El empleado ${nombre} fue registrado con exito!!`,
        icon: "success",
        timer: 3000
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logro registrar al empleado!",
        footer: JSON.parse(JSON.stringify(error)).message ==="Network Error" ?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    })
  }

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      antiguedad: antiguedad
    }).then(() => {
      getEmpleados();
      cancel();
      Swal.fire({
        title: "Actualización exitoso!",
        text: `El empleado ${nombre} fue actualizado con exito!!`,
        icon: "success",
        timer: 3000
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logro actualizar al empleado!",
        footer: JSON.parse(JSON.stringify(error)).message ==="Network Error" ?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    })
  }


  const deleteEmple = (val) => {

    Swal.fire({
      title: "Confirmar eliminado??",
      html: "Realmente desea eliminar a <strong>" + val.nombre + "</strong>?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getEmpleados();
          cancel();
          Swal.fire({
            title:'Eliminado!',
            html: 'El empleado '+val.nombre+' fue eliminado.',
            icon:'seccess',
            timer:3000
          });
        }).catch(function(error){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logro eliminar el empleado!",
            footer: JSON.parse(JSON.stringify(error)).message ==="Network Error" ?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
          });
        })
        
      }
    });


  }

  const cancel = () => {
    setAntiguedad("");
    setNombre("");
    setEdad("");
    setCargo("");
    setPais("");
    setId("");
    setEditar(false);
  }

  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAntiguedad(val.antiguedad);
    setId(val.id);
  }
  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    })
  }

  getEmpleados();


  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          GESTION DE EMPLEADOS
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              type="text" className="form-control" value={nombre} placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad: </span>
            <input
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              type="number" className="form-control" value={edad} placeholder="Ingrese edad" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">País: </span>
            <input
              onChange={(event) => {
                setPais(event.target.value);
              }}
              type="text" className="form-control" value={pais} placeholder="Ingrese un país" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo: </span>
            <input
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              type="text" className="form-control" value={cargo} placeholder="Ingrese un cargo" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Antiguedad: </span>
            <input
              onChange={(event) => {
                setAntiguedad(event.target.value);
              }}
              type="number" className="form-control" value={antiguedad} placeholder="Ingrese antiguedad" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

        </div>
        <div className="card-footer text-muted">


          {
            editar ?
              <div>
                <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                <button className='btn btn-danger m-2' onClick={cancel}>Cancelar</button>
              </div>
              : <button className='btn btn-success' onClick={add}>Registrar</button>
          }


        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Cargo</th>
            <th scope="col">Antiguedad</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>

          {
            empleadosLista.map((val, key) => {
              return <tr key={val.id}>
                <th scope="row">{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.país}</td>
                <td>{val.cargo}</td>
                <td>{val.antiguedad}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button"
                      onClick={() => {
                        editarEmpleado(val);
                      }}
                      className="btn btn-info">Editar</button>
                    <button type="button"
                      onClick={() => {
                        deleteEmple(val)
                      }}
                      className="btn btn-danger">Eliminar</button>
                  </div>
                </td>
              </tr>


            })
          }

        </tbody>
      </table>
    </div>
  );
}

export default App;
