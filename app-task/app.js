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
            if(element.estado == true){
            listaactividades.innerHTML += `
                <div class="alert alert-success" role="alert">
                <i class="fas fa-angle-double-right mr-2"></i>
                <b>${element.actividad}</b> -  ${element.estado} 
                <span class="float-right">
                    <i class="fas fa-check mr-2"></i>
                    <i class="fas fa-trash"></i>
                </span>
                </div>
                `   
            }else{
                listaactividades.innerHTML += `
                <div class="alert alert-danger" role="alert">
                <i class="fas fa-angle-double-right mr-2"></i>
                <b>${element.actividad}</b> -  ${element.estado} 
                <span class="float-right">
                    <i class="fas fa-check mr-2"></i>
                    <i class="fas fa-trash"></i>
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
   
   

    const clase = e.path[0].classList[1];
    
    if(clase === "fa-check" || clase === "fa-trash"){
        //console.log(e.path[2].childNodes[3].innerHTML);
        if (clase === "fa-check") {
            EdiarDB(e.path[2].childNodes[3].innerHTML);
            //console.log(e.path[2].childNodes[3].innerHTML)
        }
        if (clase === "fa-trash") {
            EliminarDB(e.path[2].childNodes[3].innerHTML);
        }
    }
})