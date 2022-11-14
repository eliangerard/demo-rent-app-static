
const imagen = () => {
    const [img] = document.getElementsByName('fotoGranja');
    const fotoGranja = document.getElementById('dimg');
    const [file] = img.files;
    if(file) {
        fotoGranja.src = URL.createObjectURL(file);
    }
}

function registrar(){
    var grupo;
    var nom = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var dir = document.getElementById('direccion').value;
    var tel = document.getElementById('tel').value;
    var menu = document.getElementById('menu').value;
    var ti = document.getElementById('tiempo').value;
    var de = document.getElementById('diferente').value;
    var cs = document.getElementById('costo').value;
    const registro = document.getElementById('registro');

    grupo=document.getElementsByName("val");

    for (var i = 0; i<grupo.length; i++){
        if(grupo[i].value ===""){
            return alert("Por favor, verifica que no haya campos vacios");
        }
    }
        registro.style.filter = 'opacity(100%)';

        document.getElementById("d1").innerHTML = "¡Hola, soy " + nom + "!";
        document.getElementById("d2").innerHTML = "Puedes contactarme en mi correo: " + email;
        document.getElementById("d3").innerHTML = "Mi numero telefonico es " + tel;
        document.getElementById("d4").innerHTML = "La granja está ubicada en " + dir;
        document.getElementById("d5").innerHTML = "El tipo de granja es: " + menu;
        document.getElementById("d6").innerHTML = "Se ofrece un servicio por: " + ti;
        document.getElementById("d7").innerHTML = "Esta granja ofrece: " + de;
        document.getElementById("d8").innerHTML = "Todo por un costo de: " + cs;
}

function validarEmail(){
    var emailField = document.getElementById('email');
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if( validEmail.test(emailField.value) ){
        return true;
    }else{
     alert('El email es invalido, favor de comprobar que el formato coincida:\nuser@email.com');
        return false;
    }
}

function error(objeto){
     if(document.getElementById(objeto).value!=""){
         document.getElementById(objeto).style.backgroundColor="D0D3D3"; 
     }else{
         document.getElementById(objeto).style.backgroundColor="000000";
         alert("Este campo es obligatorio");
     }
 }