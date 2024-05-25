    // Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
    //   import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
    //   import { getDatabase } from "https://www.gstatic.com/firebasejs/8.6.8/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  let scene, camera, rendered, cube;
  const firebaseConfig = {
    apiKey: "AIzaSyD_Bka5u_-BclNShLmRLyrdjTdsoIupsr0",
    authDomain: "telemetry-1094a.firebaseapp.com",
    databaseURL: "https://telemetry-system-74957-default-rtdb.firebaseio.com",
    projectId: "telemetry-1094a",
    storageBucket: "telemetry-1094a.appspot.com",
    messagingSenderId: "763860112170",
    appId: "1:763860112170:web:51404d5f6d5f39e3f88453",
    measurementId: "G-YFY9EWGF3H"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  	//getting reference to the data we want
    var dataRef1 = database.ref('GYRO/angleX');
	  var dataRef2 = database.ref('GYRO/angleY');
    var dataRef3 = database.ref('GYRO/angleZ');
    var dataRef4 = database.ref('GYRO/temperature')
    var dataRef5 = database.ref('GYRO/totalMilliLitres')
    var dataRef6 = database.ref('GYRO/flowRate')
    var dataRef7 = database.ref('GYRO/speed')
    


	//fetch the data
	dataRef1.on('value', function(getdata1){
	  	var _angleX = getdata1.val();
	  	document.getElementById('gyroX').innerHTML = _angleX + "rad";
        
	})

	dataRef2.on('value', function(getdata2){
	  	var _angleY = getdata2.val();
	  	document.getElementById('gyroY').innerHTML = _angleY + "rad" ;
	})

	dataRef3.on('value', function(getdata3){
	  	var _angleZ = getdata3.val();
	  	document.getElementById('gyroZ').innerHTML = _angleZ + "rad" ;
	})

  dataRef4.on('value', function(getdata4){
    var _temp = getdata4.val();
    document.getElementById('temperature').innerHTML = _temp + " degree c" ;
})

dataRef5.on('value', function(getdata5){
  var _totalmililitres = getdata5.val();
  document.getElementById('totalmillilitres').innerHTML = _totalmililitres + " mL" ;
})

dataRef6.on('value', function(getdata6){
  var _flowrate = getdata6.val();
  document.getElementById('flowrate').innerHTML = _flowrate + " mL/min" ;
  setFlowRateGaugeValue(flowRateGaugeElement, _flowrate);
})

dataRef7.on('value', function(getdata7){
  var _speed = getdata7.val();
  document.getElementById('speed').innerHTML = _speed + " mL/min" ;
  setGaugeValue(gaugeElement, _speed);
})

var dataRefLatitude = database.ref('GYRO/latitude');
var dataRefLongitude = database.ref('GYRO/longitude');

dataRefLatitude.on('value', function(snapshot) {
  var latitude = snapshot.val();
  dataRefLongitude.on('value', function(snapshot) {
      var longitude = snapshot.val();

      // Update the map view and marker position
      map.setView([latitude, longitude], 13);
      marker.setLatLng([latitude, longitude]).update();
  });
});
// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13); // Default location (latitude, longitude)

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker to the default location
var marker = L.marker([51.505, -0.09]).addTo(map);


  






const gaugeElement = document.querySelector(".motorspeed");
function setGaugeValue(motorspeed , Value){
   if(Value <0 || Value > 255) {
           return;
       }

   motorspeed.querySelector(".gauge__fill").style.transform = `rotate(${Value / 510 }turn)`;
   motorspeed.querySelector(".gauge__cover").textContent = `${Math.round(Value ) + " kmph"}`;
       
}




const flowRateGaugeElement = document.querySelector(".flowRate .gauge__body");

function setFlowRateGaugeValue(flowRateGauge, value) {
    if (value < 0 || value > 255) {
        return;
    }

    flowRateGauge.querySelector(".gauge__fill").style.transform = `rotate(${value / 510}turn)`;
    flowRateGauge.querySelector(".gauge__cover").textContent = `${Math.round(value)} mL/min`;
}


