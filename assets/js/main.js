function initMap(){
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 10, 
		center:{lat:-33.4430, lng: -70.6619},
		mapTypeControl: false,
		zoomControl: false,
		streetViewControl:false
	});

	function buscar(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}
	document.addEventListener("click", buscar);

	var latitud,longitud;

	
	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

		
		var miUbicacion = new google.maps.Marker({
			position: {lat:latitud, lng:longitud},
			animation: google.maps.Animation.DROP,
			map: map,
			icon:"../img/bici.png"
		});

		map.setZoom(17);
		map.setCenter({lat:latitud, lng:longitud});
	}

	var funcionError = function(){
		alert(":( Lo sentimos, pero no podemos encontrar tu ubicación. Vuelve a intentarlo");
	}
	var inputOrigen = document.getElementById("origen");    
	var autocompleteOrigen = new google.maps.places.Autocomplete(inputOrigen);
  	autocompleteOrigen.bindTo('bounds', map);

  	var inputDestino = document.getElementById("destino");
  	var autocompleteDestino = new google.maps.places.Autocomplete(inputDestino);
  	autocompleteDestino.bindTo('bounds', map);

  	var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);

        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('origen').addEventListener('change', onChangeHandler);
        document.getElementById('destino').addEventListener('change', onChangeHandler);
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: document.getElementById("origen").value,
          destination: document.getElementById("destino").value,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
          	document.getElementById("ruta").addEventListener("click",function(){
          		directionsDisplay.setDirections(response);
          	})
          }
        });
      }
