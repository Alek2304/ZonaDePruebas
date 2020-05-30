
function capturar(){
    function Persona(nombre,edad){
        this.nombre=nombre;
        this.edad=edad;
    }
    var nombre_Capturado = document.getElementById("nombre").value;
    var edad_Capturado = document.getElementById("edad").value;
    
    nueva_persona = new Persona(nombre_Capturado,edad_Capturado);

    agregar();
};
var baseDatos = [];
function agregar(){
    baseDatos.push(nueva_persona);
    document.getElementById("tabla").innerHTML += '<tbody><td>'+nueva_persona.nombre+'</td><td>'+nueva_persona.edad+'</td></tbody>';
    
};