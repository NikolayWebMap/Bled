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

//Marker Version 1	- Summit 1
var myIcon = L.icon({
iconUrl: 'css/images/mountain.png',
iconSize: [26, 26]
});

var ojs = L.marker([46.35963, 14.0784], {icon: myIcon, title:'Ojstrica'}).addTo(map);
ojs.bindPopup ("<img src="+"css/images/DSC_3018.jpg"+">", {
  	maxWidth: "auto"
  }); 


//Marker Version 2	- Summit 2
var myIcon = L.icon({
iconUrl: 'css/images/mountain.png',
iconSize: [26, 26]
});

var oso = L.marker([46.357206, 14.074532], {icon: myIcon, title:'Velica Osojnica'}).addTo(map);
oso.bindPopup ("<img src="+"css/images/DSC_3018_2.jpg"+">", {
  	maxWidth: "auto"
  }); 


//Marker Version 3	- Church
var myIcon = L.icon({
iconUrl: 'css/images/church.png',
iconSize: [24, 24]
});

var church = L.marker([46.362541, 14.090175], {icon: myIcon, title:'Pilgrimage Church of the Assumption of Maria'}).addTo(map);
church.bindPopup ("<img src="+"css/images/church_pic_3.jpg"+">", {
  	maxWidth: "auto"
  }); 

//Marker Version 4	- Train station 1
var myIcon = L.icon({
iconUrl: 'css/images/train.png',
iconSize: [24, 24]
});

var train = L.marker([46.368253, 14.082274], {icon: myIcon, title:'Bled lake train station'}).addTo(map);
train.bindPopup ("Bled lake train station. The principal railway station in Bled. Tickets and timetables: https://www.slo-zeleznice.si/en/passenger-transport/tickets-and-discounts")

//Marker Version 5	- Train station 2
var myIcon = L.icon({
iconUrl: 'css/images/train.png',
iconSize: [24, 24]
});

var train_main = L.marker([46.360332, 14.157915], {icon: myIcon, title:'Lesce-Bled train station'}).addTo(map);
train_main.bindPopup ("Lesce-Bled train station. It is on the route Villach to Ljubljana. Tickets and timetables: https://www.slo-zeleznice.si/en/passenger-transport/tickets-and-discounts")

//Marker Version 6	- Castle
var myIcon = L.icon({
iconUrl: 'css/images/tower.png',
iconSize: [24, 24]
});

var castle = L.marker([46.369883, 14.100659], {icon: myIcon, title:'Bled Castle'}).addTo(map);
castle.bindPopup("<img src="+"css/images/47.jpg"+">", {
  	maxWidth: "auto"
  }); 
  
  //Marker Version 7	- Rope park
var myIcon = L.icon({
iconUrl: 'css/images/tree.png',
iconSize: [24, 24]
});

var park = L.marker([46.34835, 14.116368], {icon: myIcon, title:'Pustolovski park'}).addTo(map);
park.bindPopup("<img src="+"css/images/adventure-park-bled.jpg"+">", {
  	maxWidth: "auto"
  }); 
  


var summits = L.layerGroup([oso, ojs])
var stations = L.layerGroup ([train, train_main])
var attractions = L.layerGroup ([castle, church, park])
 
 //---- Part 4: adding polygon features from a geojson file #1
//


//administrative boundaries around Bled lake
//defining a style for the adm

var myStyle = {
    "color": "#424743",
    "weight": 3,
    "opacity": 0.9
}


function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

var adminp = L.geoJson(admin, {
    style: myStyle,
    onEachFeature: function (feature, layer) {
       layer.on({click: zoomToFeature});
	   layer.bindPopup("<center><b>"+feature.properties.name)}

}).addTo(map);


//---- Part 5: adding line features from a geojson file #2
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

//---- Part 6: adding polygon features from a geojson file #3
//


//supermarkets around Bled lake
//defining a style for the supermarkets

var myStyle = {
    "color": "#1185DA",
    "weight": 5,
    "opacity": 1
}


function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

var supermarketsp = L.geoJson(supermarkets, {
    style: myStyle,
    onEachFeature: function (feature, layer) {
       layer.on({click: zoomToFeature});
	   layer.bindPopup("<center><b>"+feature.properties.name+"<br> Opening hours: "+feature.properties.opening_hours)}

}).addTo(map);


//---- Part 7: adding polygon features from a geojson file #4
//


//hotels around Bled lake
//defining a style for the hotels

var myStyle = {
    "color": "#DAB211",
    "weight": 5,
    "opacity": 1
}


function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

var hotelsp = L.geoJson(hotels, {
    style: myStyle,
    onEachFeature: function (feature, layer) {
       layer.on({click: zoomToFeature});
	   layer.bindPopup("<center><b>"+feature.properties.name)}

}).addTo(map);




//
//---- Part 8: Adding a layer control for base maps and feature layers
//

//the variable features lists layers that I want to control with the layer control



var features = {
"View points": summits,
"Train stations": stations,
"Points of interests": attractions,
"Hiking routes": trailsp,
"Supermarkets": supermarketsp,
"Hotels": hotelsp,
"Administrative boundaries": adminp
}

//the legend uses the layer control with entries for the base maps and two of the layers we added
//in case either base maps or features are not used in the layer control, the respective element in the properties is null

var legend = L.control.layers(baseMaps,features, {position:'bottomleft', collapsed:true}).addTo(map);



////Alert section
//map.addEventListener('click', function(e) {
    //alert(e.latlng);
//});


