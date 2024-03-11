// Entidades

class Clima{
	constructor(ciudad, grados, factor, dia){
		this.ciudad = ciudad;
		this.grados = grados;
		this.factor = factor;
		this.dia = dia;
	}
}

// Arreglos -------------------------------------

// const ClimaDefinido = [];

const fecha = new Date();
// console.log(fechaTexto(fecha));

const mañana = new Date(fecha);
mañana.setDate(mañana.getDate() + 1);
// console.log(fechaTexto(mañana));

const pasadoMañana = new Date(mañana);
pasadoMañana.setDate(pasadoMañana.getDate() + 1);

const diaTres = new Date(pasadoMañana);
diaTres.setDate(diaTres.getDate() + 1);

const diaCuatro = new Date(diaTres);
diaCuatro.setDate(diaCuatro.getDate() + 1);

const diaCinco = new Date(diaCuatro);
diaCinco.setDate(diaCinco.getDate() + 1);
// console.log(fechaTexto(pasadoMañana));

// Prueba JSON LEECTURA
//Json de ejemplo
// json_str=`{"Materias":[
// 	{"Clave":"Materia1"},
//   {"Clave":"Materia2"},
//   {"Clave":"Materia3"}
// ]}`;
// json_str = fetch('js/places.json')
// 	.then((response) => response.json())
//     .then((json) => 
// 		console.log(json)
// 	);

async function loadNames() {
	const response = await fetch('/js/places.json');
	const names = await response.json();
	
	// console.log(names); 
	// logs [{ name: 'Joker'}, { name: 'Batman' }]

	$.each(names, function() {
		if(names.id !== this.id) {
			$("#filtroSelect").append($('<option>').text(this.display).attr('value', this.city_name, this.lat, this.long));
			}
		});
	}
	
loadNames();

var select = document.getElementById('filtroSelect');

select.addEventListener('change',
  function(){
    var selectedOption = this.options[select.selectedIndex];
    console.log(selectedOption.value + ': ' + selectedOption.text);
});

// Selectores------------------------------------
let filtroSelect = document.getElementById("filtroSelect");

// let iconImgClima = document.getElementById("imagenClima");

let fechaActual = document.getElementById("fechaActual");
let fechaMañana = document.getElementById("fechaMañana");
let fechaPasadoMañana = document.getElementById("fechaPasadoMañana");
let mostrarClima = document.getElementById("mostrarClima");

let gradosClima = document.getElementById("grados");
let factorClima = document.getElementById("factor");
let ciudad = document.getElementById("ciudad");

let climaMax = document.getElementById("climaMax");
let climaMin = document.getElementById("climaMin");
let viento = document.getElementById("viento");
let sensacionTer = document.getElementById("sensacionTermica");
let humedad = document.getElementById("humedad");

let tempMaxTomorrow = document.getElementById("tempMaxMañana");
let tempMinTomorrow = document.getElementById("tempMinMañana");

let tempMaxPostTomorrow = document.getElementById("tempMaxPostMañana");
let tempMinPostTomorrow = document.getElementById("tempMinPostMañana");


// Selectores------------------------------------

var select = document.getElementById('filtroSelect');

select.addEventListener('change',
  function(){
    var selectedOption = this.options[select.selectedIndex];
    console.log(selectedOption.value + ': ' + selectedOption.text);
});

// Funcion Guardar Datos-------------------------

function guardarDatosClima(e){
	e.preventDefault();

// Selectores------------------------------------

	
	// let split = ciudadUsuario.split(",");
	// let city = split[0];
	// let longitud = split[1];
	// let latitud = split[2];

	// console.log(split);

	// let ciudadUsuario = document.getElementById("filtroSelect").value;
	// const ClimaUsuario = new Clima(city, 18, "Parcialmente Nublado", fechaTexto(fecha));
	// Url de conexion api concatenando el valor de la ciudad
	// const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&lang=sp&appid=509a71114c79dce7fe4e067058ed0286';
	const url = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=0eebd1fcf852d29ca0340c5c451d4c9a';
	// console.log(url);

// Selectores------------------------------------

	// ClimaDefinido.push(ClimaUsuario);

	// Imprime en mi id=ciudad lo que traiga mi Valor de ciudadUsuario
	ciudad.textContent = city;

	// API CLIMA Openweathermap ---------------------
	
	// Conexion por fetch y agregar variables que se van a utilizar

	fetch(url).then(response => response.json())
	.then(data => {

		// console.log(url);
		let nombreCiudadData = data['name'];
		let idClima = data['id'];

		let temperatura = data['main']['temp'];
		let sensacionTermica = data['main']['feels_like'];
		let humedadClima = data['main']['humidity'];
		let temperaturaMinima = data['main']['temp_min'];
		let temperaturaMaxima = data['main']['temp_max'];

		let statusClima = data['weather'];
		let statusClimaDescripcion = data['weather'][0]['description'];
		let iconClimaDescripcion = data['weather'][0]['icon'];

		let vientoClima = data['wind']['speed'];
		

		// Imprimir los datos del clima - dependiendo de la respuesta del usuario
		gradosClima.textContent = Math.round(temperatura);
		factorClima.textContent = statusClimaDescripcion;
		climaMax.textContent = `${Math.round(temperaturaMaxima)} °C /`;
		climaMin.textContent = `${Math.round(temperaturaMinima)} °C`;
		viento.textContent = `${vientoClima} km/h`;
		sensacionTer.textContent = `${Math.round(sensacionTermica)} °C`;
		humedad.textContent = `${humedadClima} %`;

		// jQuery Animación de Imagen del Clima

		$(function mostrarImagen() { 
			// console.log(iconClimaDescripcion);
			$("#imagenClima").attr("src",`http://openweathermap.org/img/wn/${iconClimaDescripcion}@2x.png`);
		});
	})
	.catch(error => alert("Nombre de la ciudad Invalido"));

	// API CLIMA Openweathermap ---------------------

	// Resetear pagina despues de 2 minutos ---------

	setTimeout(function(){
		window.location.reload(1);
	}, 60000);

	// Resetear pagina despues de 2 minutos ---------

	// Funcion Clima 7 Days -------------------------

	function clima7Dias(){

		const url7Days = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitud+'&lon='+longitud+'&units=metric&lang=sp&exclude=current,minutely,hourly,alerts&appid=509a71114c79dce7fe4e067058ed0286';

		fetch(url7Days).then(response => response.json())
		.then(data => {

			console.log(url7Days);

			let daily = data['daily'];
			let tomorrow = data['daily'][0];
			let tomorrowTemp = data['daily'][0]['temp'];
			// console.log(tomorrowTemp);
			let tomorrowTempMin = data['daily'][0]['temp']['min'];
			// console.log(tomorrowTempMin);
			let tomorrowTempMax = data['daily'][0]['temp']['max'];
			// console.log(tomorrowTempMax);

			let iconClimaTomorrowDescripcion = data['daily'][0]['weather'][0]['icon'];
			// console.log(iconClimaTomorrowDescripcion);

			let postTomorrowTempMin = data['daily'][1]['temp']['min'];
			// console.log(postTomorrowTempMin);
			let postTomorrowTempMax = data['daily'][1]['temp']['max'];
			// console.log(postTomorrowTempMax);

			let iconClimaPostTomorrowDescripcion = data['daily'][1]['weather'][0]['icon'];
			// console.log(iconClimaPostTomorrowDescripcion);

			// Imprimir los datos del clima - dependiendo de la respuesta del usuario

			tempMaxTomorrow.textContent = `${Math.round(tomorrowTempMax)} °C /`;
			tempMinTomorrow.textContent = `${Math.round(tomorrowTempMin)} °C`;

			tempMaxPostTomorrow.textContent = `${Math.round(postTomorrowTempMax)} °C /`;
			tempMinPostTomorrow.textContent = `${Math.round(postTomorrowTempMin)} °C`;
			// Imprimir los datos del clima - dependiendo de la respuesta del usuario

			$(function mostrarImagenSiguientesDias() { 
				// console.log(iconClimaDescripcion);
				$("#imagenClimaMañana").attr("src",`http://openweathermap.org/img/wn/${iconClimaTomorrowDescripcion}@2x.png`);
	
				$("#imagenClimaPostMañana").attr("src",`http://openweathermap.org/img/wn/${iconClimaPostTomorrowDescripcion}@2x.png`);
			});
			
		})
		.catch(error => alert("Nombre de la ciudad Invalido"));

		// API CLIMA Openweathermap ---------------------

	}

	clima7Dias();

	// Funcion Clima 7 Days -------------------------
}

// Evento Mostrar Clima--------------------------

// mostrarClima.addEventListener("click", guardarDatosClima);
filtroSelect.addEventListener("change", guardarDatosClima);

// Evento Mostrar Clima--------------------------

// Funcion Guardar Datos-------------------------

// Funcion Fecha Actual -------------------------

function fechaTexto(fecha){

	// Arreglos
	let dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
	let meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

	//getDay() devuelve el dia de la semana.(0-6)
	let numeroDiaSemana = fecha.getDay();
	//El día de la semana en letras. getDay() devuelve el dia de la semana.(0-6)
	let diaLetras = dias[fecha.getDay()];
	//El mes en letras
	let mesLetras = meses[fecha.getMonth()];
	//getDate() devuelve el dia(1-31).
	let diaMes = fecha.getDate();

	let devolverFecha = diaLetras+ ", " + diaMes + " de " + mesLetras;
    return devolverFecha;
}

function imprimirFecha(){
	
let escribirFechaAtual = document.createElement("p");
	escribirFechaAtual.textContent = fechaTexto(fecha);
	fechaActual.appendChild(escribirFechaAtual);

let escribirFechaMañana = document.createElement("p");
	escribirFechaMañana.textContent = fechaTexto(mañana);
	fechaMañana.appendChild(escribirFechaMañana);

let escribirFechaPasadoMañana = document.createElement("p");
	escribirFechaPasadoMañana.textContent = fechaTexto(pasadoMañana);
	fechaPasadoMañana.appendChild(escribirFechaPasadoMañana);
}

imprimirFecha();

// Funcion Fecha Actual -------------------------

// Modos Iluminación-----------------------------

// Selectores------------------------------------

let btnDark = document.getElementById("btnDark");
let btnLight = document.getElementById("btnLight");

// Selectores------------------------------------

// Funcion Light Mood ---------------------------

function cambiarModoLight(){
	let actualWeather = document.getElementById("actualWeather");
	actualWeather.classList.add('actualWeatherLight');

	let detailsWeather = document.getElementById("detailsWeather");
	detailsWeather.classList.add('detailsWeatherLight');
}

btnLight.addEventListener("click", cambiarModoLight);

// Funcion Light Mood ---------------------------

// Funcion Dark Mood ---------------------------

function cambiarModoDark(){
	let actualWeatherDark = document.getElementById("actualWeather");
	actualWeatherDark.classList.remove('actualWeatherLight');

	let detailsWeatherDark = document.getElementById("detailsWeather");
	detailsWeatherDark.classList.remove('detailsWeatherLight');
}

btnDark.addEventListener("click", cambiarModoDark);

// Funcion Dark Mood ---------------------------

// Modos Iluminación-----------------------------