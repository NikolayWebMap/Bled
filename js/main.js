// Using Leaflet for creating the map and adding controls for interacting with the map

//
//--- Part 1: adding base maps ---
//

//creating the map; defining the location in the center of the map (geographic coords) and the zoom level. These are properties of the leaflet map object
//the map window has been given the id 'map' in the .html file
var map = L.map('map', {
	center: [47.5, 13.05],
	zoom: 9
});

//adding three base maps 
var landscape = L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
	attribution: 'Tiles from Thunderforest'});

var toner = L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>' });
	toner.addTo(map);

var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 19
});
//esri.addTo(map);

// for using the base maps in the layer control, I defined a baseMaps variable
// the text on the left is the label shown in the layer control; the text right is the variable name
var baseMaps = {
	"Thunderforest landscape": landscape,
	"Toner": toner,
	"ESRI":esri
	}

//
//---- Part 2: Adding a scale bar
//

L.control.scale({position: 'bottomright', imperial: false, maxWidth: 200}).addTo(map);


//
//---- Part 3: Adding symbols ---- 
//


//Marker Version 1
var mark = L.marker([47, 14], {title:'marker1', clickable:true}).addTo(map).bindPopup("popup of marker 1");

	
//Marker Version 2
var mark2 = L.marker([47, 12], {title:'marker2', clickable:true}).addTo(map);
mark.bindPopup("popup of marker 2");


//Marker Version 3	- using a specific symbol
var myIcon = L.icon({
iconUrl: 'css/images/house.png',
iconSize: [28, 28]
});

L.marker([48, 13], {icon: myIcon, title:'theHouse'}).addTo(map);



//
//---- Part 4: adding line features from a geojson file 
//


//hicking tracks to Gaisberg mountain

//defining a style for the hiking tracks
var trackStyle = {
    color: "#900C3F",
    weight: 2,
	opacity: 0.5
	}
	
var hikingtracks = L.geoJson(tracksJson, {style: trackStyle});


/*
var hikingtracks = L.geoJson(tracksJson, 
	{style: trackStyle, 
	onEachFeature: function (feature, layer){
	layer.bindPopup("my text about: " +feature.properties.Name)}
	});

*/

hikingtracks.addTo(map);


//
//---- Part 5: Adding GeoJSON Point Features
//

//
//---- Adding GeoJSON point features - to marker object
//

var summitsJson = {
"type":"FeatureCollection",
"features":[{"type":"Feature","properties":{"NAME":"Kreuzkogel","HEIGHT":2027},"geometry":{"type":"Point","coordinates":[13.153268433907614,47.22421002245328]}},
{"type":"Feature","properties":{"NAME":"Kieserl","HEIGHT":1953},"geometry":{"type":"Point","coordinates":[13.152967420479607,47.24300413792524]}}]};


var myIconsummit = L.icon({
iconUrl: 'css/images/peak.png',
iconSize: [20, 20],
});

var summits = L.geoJson(summitsJson, {
	pointToLayer: function(feature, latlng) {
    return  L.marker(latlng, {icon: myIconsummit});
	},
	onEachFeature: function(feature, marker) {
			marker.bindPopup("<center><br><b>"+ "my text about: " +feature.properties.NAME + " at location: " + marker.getLatLng() + 
			"</b></center>" );
	}
});
summits.addTo(map);


//
//---- Part 6: Adding a click event to our map
//


//when you click in the map, an alert with the latitude and longitude coordinates of the click location is shown
// e is the event object that is created on mouse click

/*
map.addEventListener('click', function(e) {
    alert(e.latlng);
});
*/


/*
//the same functionality can be realized with reference to the function onClick

//definition of the function onClick
function onClick(evt){
	alert(evt.latlng);
}

map.addEventListener('click', onClick);
*/


//
//---- Part 7: Adding interactive features to GeoJSON Polygons
//


//adding a GeoJSON polygon feature set
var myStyle = {
    "color": "#115D4B",
    "weight": 5,
    "opacity": 0.65
}


function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

var fedstate = L.geoJson(federalstateSBG, {
    style: myStyle,
    onEachFeature: function (feature, layer) {
       layer.on({click: zoomToFeature}); }
}).addTo(map);





//
//---- Part 8: Adding combined interactive features to GeoJSON Polygons
//

/*

function highlightFeature(e) {
    var activefeature = e.target;  //access to activefeature that was hovered over through e.target
	
    activefeature.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
	
    if (!L.Browser.ie && !L.Browser.opera) {
        activefeature.bringToFront();
    }
}

//function for resetting the highlight
function resetHighlight(e) {
	fedstate.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//to call these methods we need to add listeners to our features
//the word on is a short version of addEventListener

function interactiveFunction(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
   } );
}


var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
}

fedstate = L.geoJson(federalstateSBG, {
    style: myStyle,
    onEachFeature: interactiveFunction
}).addTo(map);

*/

//
//---- Part 9: Adding a layer control for base maps and feature layers
//

//the variable features lists layers that I want to control with the layer control
var features = {
	"Marker 1": mark,
	"Marker 2": mark2,
	"hiking tracks": hikingtracks,
	"Salzburg": fedstate,
	"Summits": summits
}

//the legend uses the layer control with entries for the base maps and two of the layers we added
//in case either base maps or features are not used in the layer control, the respective element in the properties is null

var legend = L.control.layers(baseMaps,features, {position:'bottomleft', collapsed:true}).addTo(map);

