document.querySelector('#btn').addEventListener('click', adivinar);
document.querySelector('#otro').addEventListener('click', (e) => {
    location.reload();
});

var max = 10;
var min = 1;
var numero = Math.random() * (max - min) + min;
numero = parseInt(numero);
info.innerHTML = '';
var intentos = 0;

function adivinar() {

    var usuario = document.getElementById('dato').value;
    if (usuario == "") {
        alert("Numero incorrecto");
    } else {
        usuario = parseInt(usuario);
        document.getElementById('dato').value = "";
        intentos++;
        info.innerHTML = '';
        while (true) {

            if (usuario === numero) {
                info.innerHTML += `
            <div class="alert alert-success" role="alert">
                Ganaste, lo has logrado en ${intentos} intentos
            </div>
            
            `
                break;
            } else if (usuario > numero) {
                info.innerHTML += `
            <div class="alert alert-danger" role="alert">
            El numero es  menor, Vuelve a intentarlo!
            </div>
            
            `
                break;
            } else if (usuario < numero) {
                info.innerHTML += `
            <div class="alert alert-warning" role="alert">
            El numero es  mayor, Vuelve a intentarlo!
            </div>
            
            `
                break;
            }
        }
    }
}