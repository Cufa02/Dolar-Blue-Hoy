const pesosAConvertir = document.querySelector("#pesosAConvertir");
fetch("https://api.bluelytics.com.ar/v2/latest")
  .then(Response => Response.json() )
  .then(data => {

    let valorBlueCompra = document.getElementById('valorBlueC')
    valorBlueCompra.innerHTML = `
    <p>${data.blue.value_buy}</p>
    `;
    let valorBlueVenta = document.getElementById('valorBlueV')
    valorBlueVenta.innerHTML = `
    <p>${data.blue.value_sell}</p>
    `;

  console.log(data)
  })
  
  const btn_guardar = document.querySelector('#btn-guardar');
  const datoPesosAConvertir = document.getElementById('pesosAConvertir');

  let validar = () =>{
    let inputsRequeridos = document.querySelectorAll('#conversorDato [required]');
    let error = false;
    
    for(let i=0; i<inputsRequeridos.length; i++){
        if (inputsRequeridos[i].value == ''){
            inputsRequeridos[i].classList.add('errorInput');
             error = true;
        }else{
            inputsRequeridos[i].classList.remove('errorInput');
        }
    }
    if(Number(datoPesosAConvertir.value) < Number(datoPesosAConvertir.min)) {
        datoPesosAConvertir.classList.add('errorInput');
        error = true;
    }
    
    return error;
  };

  let limpiar=()=>{
    datoPesosAConvertir.value = "";
  };

  let obtenerDatos = () =>{
    let error = validar();

    if (error){
        Swal.fire({
           'title': "Ocurrió un error",
           'text': "Por favor ingresa una cantidad valida de pesos a convertir",
           'icon': 'warning'
        });
    } else {
        Swal.fire({
            'title': "Conversion realizada",
            'icon': 'success'
         }).then(()=>{
        limpiar();
         }

         );
        //  console.log(datoPesosAConvertir.value);
        document.getElementById('dolaresImpreso').innerHTML = (datoPesosAConvertir.value) + " pesos son " + (datoPesosAConvertir.value) / document.getElementById('valorBlueV').innerText + " dolares";
        
    }
  };

  btn_guardar.addEventListener('click', obtenerDatos);
  btn_guardar.addEventListener('click', function(){
    localStorage.setItem('Conversiones', pesosAConvertir.value);
    
  });