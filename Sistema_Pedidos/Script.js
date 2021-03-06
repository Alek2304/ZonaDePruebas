
document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnimprimir");
    $boton.addEventListener("click", () => {
        console.log("CLICK");
        const $elementoParaConvertir = document.querySelector("#contenido"); // <-- Aquí puedes elegir cualquier elemento del DOM
        const $NombreCliente = document.querySelector("#name").value;
        html2pdf()
            .set({
                margin: 1,
                filename: `${$NombreCliente}.pdf`,
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a3",
                    orientation: 'portrait' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});





  function capturar() {
    function Producto(modelo, ram, capacidad, precio) {
      this.modelo = modelo;
      this.ram = ram;
      this.capacidad = capacidad;
      this.precio = precio;
    }
    var modelo_Capturado = document.getElementById("Modelo").value;
    var ram_Capturado = document.getElementById("Ram").value;
    var capacidad_Capturado = document.getElementById("Capacidad").value;
    var precio_Capturado = document.getElementById("Precio").value;

    nuevo_Producto = new Producto(modelo_Capturado, ram_Capturado,capacidad_Capturado,precio_Capturado);

    agregar();
  };
  var baseDatos = [];
  function agregar() {
    baseDatos.push(nuevo_Producto);
    document.getElementById("table").innerHTML += '<tbody><td>' + nuevo_Producto.modelo + '</td><td>' + nuevo_Producto.ram + '</td><td>' + nuevo_Producto.capacidad + '</td><td>' + nuevo_Producto.precio + '</td></tbody>';

  };


  function Datos() {
    function Cliente(nombre, dpi, direccion,telefono) {
      this.nombre = nombre;
      this.dpi = dpi;
      this.direccion = direccion;
      this.telefono = telefono;
    }
    var nombre = document.getElementById("Nombre").value;
    var dpi = document.getElementById("Dpi").value;
    var direccion = document.getElementById("Direccion").value;
    var telefono = document.getElementById("Telefono").value;

    nuevo_Cliente = new Cliente(nombre,dpi,direccion,telefono);


    agregarcliente();
  };
  var baseDatos = [];
  function agregarcliente() {
    baseDatos.push(nuevo_Cliente);
    document.getElementById("dato1").innerHTML += '<label id="name">' + nuevo_Cliente.nombre + '</label>' 
    document.getElementById("dato3").innerHTML += '<label>' + nuevo_Cliente.dpi + '</label>' 
    document.getElementById("dato4").innerHTML += '<label>' + nuevo_Cliente.direccion + '</label>' 
    document.getElementById("dato5").innerHTML += '<label>' + nuevo_Cliente.telefono + '</label>' 
  };


  function OcultarElementos(e,f) {
    document.getElementById(e).style.display=f;
  }


  function Contra_entrega() {
    function data(monto) {
      this.Monto = monto;
    }

    var Monto = document.getElementById("monto_contra_entrega").value;
    console.log(Monto);
    if (Monto.length == 0 ) {
      Monto = "0.00"
    }
    function numberWithCommas(x) {
      x = x.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x))
          x = x.replace(pattern, "$1,$2");
      return x;
  }
  let valor = numberWithCommas(Monto);

    nuevo_Monto = new data(valor);

    console.log(nuevo_Monto);
    agregarmonto();
  };
  //var baseDatos = [];

  function agregarmonto() {
   // baseDatos.push(nuevo_Monto);
    document.getElementById("subcaja1").innerHTML += `<li class="list-group-item">
                                                        <div class="alert alert-success" role="alert">
                                                          <h1>Q ${nuevo_Monto.Monto}</h1>
                                                        </div>
                                                        
                                                      </li>`
  }


  function Deposito_bancario() {
    function data(monto,referencia,banco) {
      this.Monto = monto;
      this.Referencia = referencia;
      this.Banco = banco;
    }

    var Banco = document.getElementById("banco").value;
    var Referencia = document.getElementById("referencia").value;
    var Monto = document.getElementById("monto").value;

    if (Monto.length == 0 || Referencia.length == 0 || Banco.length == 0)  {
      alert("Es obligatorio Llenar Todos los Campos");
    }else{
      function numberWithCommas(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }
    let valor = numberWithCommas(Monto);
  
      nuevo_Monto = new data(valor,Referencia,Banco);
      console.log(nuevo_Monto);
      agregarmonto();
    };
    //var baseDatos = [];
    function agregarmonto() {
     // baseDatos.push(nuevo_Monto);
      document.getElementById("subcaja2").innerHTML += `<li class="list-group-item alert alert-success">
                                                          <div class="data">
                                                          <h4>Banco</h4>
                                                          <h4>${nuevo_Monto.Banco}</h4>
                                                          </div>
                                                          <div class="data"> 
                                                          <h4>Referencia:<h4>
                                                          <h4>${nuevo_Monto.Referencia}</h4>
                                                          </div>
                                                          <div class="data">
                                                          <h4>Monto</h4>
                                                          <h1>Q${nuevo_Monto.Monto}</h1>
                                                          </div>
                                                        </li>`
    }
    }
 