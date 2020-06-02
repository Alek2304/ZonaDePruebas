  
// variables globales
const formularioUI = document.querySelector('#formulario');
const listaactividades = document.querySelector('#actividades');
let arrayActividades = [];

//funciones

const CrearItems = (actividad) => {
    let item ={
        "actividad" : actividad,
        "estado" : false
    }
    arrayActividades.push(item);
}

const GuardarDB = () => {
    localStorage.setItem('rutina', JSON.stringify(arrayActividades));
    PintarDB();
}

const PintarDB = () =>{
    listaactividades.innerHTML = '';
    arrayActividades = JSON.parse(localStorage.getItem('rutina'));
    if(arrayActividades === null){
        arrayActividades = [];
    }else{
        arrayActividades.forEach(element => {
            if(element.estado === true){
            listaactividades.innerHTML += `
            <div class="alert alert-success d-flex justify-content-between d-flex align-items-center" role="alert">
                <b></i>${element.actividad}</b> Estado - ${element.estado} 
                <span class="">
                    <a class="btn btn-outline-success edit">Edit</a>
                    <a class="btn btn-outline-success delete">Delete</a>
                       
                </span>
            </div>
                `   
            }else{
                listaactividades.innerHTML += `
                <div class="alert alert-danger d-flex justify-content-between d-flex align-items-center" role="alert">
                    <b>${element.actividad}</b> Estado - ${element.estado} 
                    <span class="">
                    <a class="btn btn-outline-success edit">Edit</a>
                    <a class="btn btn-outline-success delete">Delete</a>
                          
                    </span>
                </div>
                `  
            }
            
        });
    }
}

const EliminarDB = (actividad) => {
    let indexArray;
    arrayActividades.forEach((element, index) =>{
        if(element.actividad === actividad){
            indexArray = index;
            //console.log(indexArray);
        }
    });
    arrayActividades.splice(indexArray,1)
    GuardarDB();
}
const EdiarDB = (actividad) =>{
    let indexArray = arrayActividades.findIndex((element) => {
        return element.actividad === actividad;
       
    });
   // console.log(arrayActividades[indexArray].estado)
    arrayActividades[indexArray].estado = true;
    GuardarDB();
    //console.log(indexArray);
}

//eventos

formularioUI.addEventListener('submit', (e) =>{
    e.preventDefault();
    let actividadUI = document.querySelector('#activiad').value;

    CrearItems(actividadUI);
    GuardarDB();
    formularioUI.reset();
    
})
document.addEventListener('DOMContentLoaded', PintarDB);

listaactividades.addEventListener('click', (e) => {
    e.preventDefault();
   
   

    const clase = e.path[0].classList[2];
    //console.log(e);
    
    if(clase === "edit" || clase === "delete"){
        //console.log(e.path[3].childNodes[1].innerHTML);
        if (clase === "edit") {
            EdiarDB(e.path[2].childNodes[1].innerHTML);
            //console.log(e.path[2].childNodes[1].innerHTML)
           //console.log(e);
        }
        if (clase === "delete") {
          EliminarDB(e.path[2].childNodes[1].innerHTML);
           //console.log(e.path[2].childNodes[1].innerHTML)
        }
    }
})