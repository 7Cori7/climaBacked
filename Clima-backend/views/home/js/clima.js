//* SELECTORES:
const contenedor = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

//* EVENTOS:
window.addEventListener('load', ()=> {
    formulario.addEventListener('submit', buscarClima);
})

//* FUNCIONES:

function buscarClima(e){
    e.preventDefault();

    //? Selectores de los campos input:
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    ////console.log(ciudad)
    ////console.log(pais)

    // Validaciones:
    if(ciudad === '' || pais === '') {
        ////console.log('Todos los campos son obligatorios')

        //! Funcion para mostrar mensaje de error:
        mostrarError('Todos los campos son obligatorios');
        return;

    }else{
        ////console.log('bien')

    // Funcion para llamar al API:
        consultarAPI( ciudad, pais);
    }
}


function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){ //<-- Si no aparece la clase ^ en el html:
        const alertaMsj = document.createElement('div');
        alertaMsj.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'relative', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        alertaMsj.innerHTML = `
            <strong class='font-bold'>Error!</strong>
            <span class='block sm:inline'>${mensaje}</span>
        `;

        contenedor.appendChild(alertaMsj);

        setTimeout(()=>{
            alertaMsj.remove();
        }, 3000);
    }
}

function consultarAPI(ciudad,pais){
    // url
    // imprimir resultado

    const appid = '64ff9a397817540553e0ab216950548a';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`;

    Spinner();
    
    fetch(url)
        .then(respuesta=>{
            return respuesta.json();
        })
        .then(datos=>{
            console.log(datos);

            limpiarHTML();

            //Validacion:
            if(datos.cod === '404'){
                mostrarError('La ciudad ingresada no ha sido encontrada');
            }else{
                mostrarClima(datos);
            }
        })
        .catch(error=>{
            console.log(error)
        })        
}

function mostrarClima(datos){
    ////console.log('mostrar datos clima')

    const {name,main:{temp,temp_max,temp_min}} = datos; //<--main es otro arreglo, por eso se desglosa así

    const grados = kelvinACenti(temp); //<--- una constante puede ser igual a una funcion
    ////console.log(grados);

    const min = kelvinACenti(temp_min);
    const max = kelvinACenti(temp_max);

    //Estructura del HTML:

    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `Clima en: ${name}`;
    nombreCiudad.classList.add('font-bold','text-2xl');

    const tempAct = document.createElement('p'); 
    tempAct.innerHTML = `${grados}&#8451;`;  // &#8451 es el codigo para el grado celcius
    tempAct.classList.add('font-bold','text-6xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min}&#8451;`;
    tempMin.classList.add('text-xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max}&#8451;`;
    tempMax.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center','text-white');
    
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(tempAct);
    resultadoDiv.appendChild(tempMin);
    resultadoDiv.appendChild(tempMax);

    resultado.appendChild(resultadoDiv);
}

function kelvinACenti(temp){
    return parseInt(temp-273.15);
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}


function Spinner(){

    // Se buscan Spinners o loaders CSS en google y se pega el contenido respectivo en el CSS y aqui en el codigo

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"><div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `

    resultado.appendChild(divSpinner);
}
