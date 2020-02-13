// Using Leaflet for creating the map and adding controls for interacting with the map

//
//--- Part 1: adding base maps ---
//

//creating the map; defining the location in the center of the map (geographic coords) and the zoom level. These are properties of the leaflet map object
//the map window has been given the id 'map' in the .html file
var map = L.map('map', {
	center: [46.36, 14.09],
	zoom: 13
});

//adding three base maps 
var landscape = L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=0c3e7259479e4f55820b68c594b79e9c', {
	attribution: 'Tiles from Thunderforest'});

var toner = L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>' });
	

var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 25
});
landscape.addTo(map);

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

//Marker Version 1	- using a specific symbol
var myIcon = L.icon({
iconUrl: 'css/images/peak.png',
iconSize: [24, 24]
});

var ojs = L.marker([46.35963, 14.0784], {icon: myIcon, title:'Ojstrica'}).addTo(map);
ojs.bindPopup ("<img src="+"css/images/DSC_3018.jpg"+">", {
  	maxWidth: "auto"
  }); 


//Marker Version 2	- using a specific symbol
var myIcon = L.icon({
iconUrl: 'css/images/peak.png',
iconSize: [24, 24]
});

var oso = L.marker([46.357206, 14.074532], {icon: myIcon, title:'Velica Osojnica'}).addTo(map);
oso.bindPopup ("<img src="+"css/images/DSC_3018_2.jpg"+">", {
  	maxWidth: "auto"
  }); 


//Marker Version 3	- using a specific symbol
var myIcon = L.icon({
iconUrl: 'css/images/church.png',
iconSize: [24, 24]
});

var church = L.marker([46.362541, 14.090175], {icon: myIcon, title:'Pilgrimage Church of the Assumption of Maria'}).addTo(map);
church.bindPopup ("<img src="+"css/images/church_pic_2.jpg"+">", {
  	maxWidth: "auto"
  }); 

//Marker Version 4	- using a specific symbol
var myIcon = L.icon({
iconUrl: 'css/images/train.png',
iconSize: [24, 24]
});

var train = L.marker([46.368268, 14.082285], {icon: myIcon, title:'Bled lake train station'}).addTo(map);
train.bindPopup ("Bled lake train station")

//Marker Version 5	- using a specific symbol
var myIcon = L.icon({
iconUrl: 'css/images/train.png',
iconSize: [24, 24]
});

var train_main = L.marker([46.360332, 14.157915], {icon: myIcon, title:'Lesce-Bled train station'}).addTo(map);
train.bindPopup ("Lesce-Bled train station")

//Marker Version 6	- Castle
var myIcon = L.icon({
iconUrl: 'css/images/tower.png',
iconSize: [24, 24]
});

var castle = L.marker([46.369883, 14.100659], {icon: myIcon, title:'Castle'}).addTo(map);
train.bindPopup ("Castle")

var summits = L.layerGroup([oso, ojs])
var stations = L.layerGroup ([train, train_main])
var attractions = L.layerGroup ([])
  

//---- Part 4: adding line features from a geojson file 
//


//hicking tracks around Bled lake
//defining a style for the hiking tracks

var trackStyle = {
    color: "#7B241C",
    weight: 2,
	opacity: 1
	}
	
var trailsp = L.geoJson(trails, {style: trackStyle});


/*
var trails = L.geoJson(tracksJson, 
	{style: trackStyle, 
	onEachFeature: function (feature, layer){
	layer.bindPopup("my text about: " +feature.properties.Name)}
	});

*/

trailsp.addTo(map);

map.addEventListener('click', function(e) {
    alert(e.latlng);
});


//
//---- Part 5: Adding a layer control for base maps and feature layers
//

//the variable features lists layers that I want to control with the layer control



var features = {
"View points": summits,
"Train stations": stations
}

//the legend uses the layer control with entries for the base maps and two of the layers we added
//in case either base maps or features are not used in the layer control, the respective element in the properties is null

var legend = L.control.layers(baseMaps,features, {position:'bottomleft', collapsed:true}).addTo(map);


