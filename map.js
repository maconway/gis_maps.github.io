var adUnit, infowindow, directionsDisplay, geocoder, map;
var directionsService = new google.maps.DirectionsService();
var latlng = new google.maps.LatLng(39.8345, -85.8298);

var myOptions = {
    zoom: 4,
    center: latlng,
    scaleControl: true,
    overviewMapControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
	mapTypeControl: true,
		  mapTypeControlOptions : {
			position: google.maps.ControlPosition.TOP_LEFT
			},
			streetViewControl: true,
			streetViewControlOptions: {
			position: google.maps.ControlPosition.LEFT_TOP
			},
			zoomControl: true,
			zoomControlOptions: {
			position: google.maps.ControlPosition.LEFT_TOP
			},
			rotateControl: true,
			rotateControlOptions: {
				position: google.maps.ControlPosition.LEFT_TOP
			}
  };
map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

var layers = new Array();

//var kmzContainers = new Array();

var cb_i = 0;

var LayerContainer = function(n, u, c)
{
	this.name = n;
	this.kmzURL = u;
	this.category = c;
	this.layer = new google.maps.KmlLayer(this.kmzURL, {preserveViewport: true});

	this.putOnMap = function()
	{
		this.layer.setMap(map);
	};
	this.clearFromMap = function()
	{
		this.layer.setMap(null);
	};

  this.isOnMap = function()
  {
    return false;
  };
};

//Special Layer includes Traffic, Weather and Pictures and Bicycle
var SpecialLayer = function(n, t, c)
{
	this.name = n;

	this.category = c;

	if(t == 'photo')
	{
		this.layer = new google.maps.panoramio.PanoramioLayer();
	}
	else if(t == 'traffic')
	{
		this.layer = new google.maps.TrafficLayer();
	}
	else if(t == 'weather')
	{
		this.layer = new google.maps.weather.WeatherLayer({
			temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT});
	}
	else if(t == 'bike')
	{
		this.layer = new google.maps.BicyclingLayer();
	}

	this.putOnMap = function()
	{
		this.layer.setMap(map);
	};
	this.clearFromMap = function()
	{
		this.layer.setMap(null);
	};
};

//CartoDB Layer
var CartoDBLayer = function (n, u, c)
{
	this.category = c;
	this.name = n;
  var l;



   cb_i++;
   var l_in = cb_i;

  this.putOnMap = function()
	{
		cartodb.createLayer(map, u).addTo(map, l_in).on('done', function(layer) {
    		l = layer;
    		});
	};
	this.clearFromMap = function()
	{
		l.getSubLayer(0).hide();
		l.remove();
		l.clear();

	};
  this.isOnMap = function()
  {
    return true;
  };
};



layers.push(	new CartoDBLayer('Depressed mood (State)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/f35ee76e-0ca1-4901-afaf-4b9f79a7a323/viz.json', 'State Layers'));
layers.push(	new CartoDBLayer('Diminished ability to think (State)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/dfc2a1bb-d36b-43f8-a394-815ad57763d9/viz.json', 'State Layers'));
layers.push(	new CartoDBLayer('Disturbed sleep (State)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/f28166cf-7bab-4f9a-8fb9-061f495825e7/viz.json', 'State Layers'));
layers.push(	new CartoDBLayer('Fatigue or loss of energy (State)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/70cd2c36-163a-439c-9734-463e44893aec/viz.json', 'State Layers'));
layers.push(	new CartoDBLayer('Feelings of worthlessness (State)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/d0c39a65-e243-4f2b-b207-f683953aa465/viz.json', 'State Layers'));
layers.push(	new CartoDBLayer('Housing problems (State)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/90b53dc8-ee49-4642-86a9-6660e7269aca/viz.json', 'State Layers'));
layers.push(	new CartoDBLayer('Occupational problems (State)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/3cb8ebd8-ad52-4cb5-9131-e2d263fee62e/viz.json', 'State Layers'));
layers.push(	new CartoDBLayer('Problems with support group (State)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/02992e08-2db7-48d2-b548-2e13ba8b5ecb/viz.json', 'State Layers'));
layers.push(	new CartoDBLayer('Weight Change (State)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/fd863630-507e-4494-94b0-5c5c72577eab/viz.json', 'State Layers'));
layers.push(	new CartoDBLayer('Psychomotor agitation (State)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/00d6de05-a0d6-4e6a-8b42-a8a44b266d89/viz.json', 'State Layers'));

layers.push(	new CartoDBLayer('Depressed mood (County)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/582ec611-0f7d-4da5-9d1e-1f58f7b295dd/viz.json', 'County Layers'));
layers.push(	new CartoDBLayer('Diminished ability to think (County)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/188d5f7a-e17c-4627-b680-22904f3a1ce3/viz.json', 'County Layers'));
layers.push(	new CartoDBLayer('Disturbed sleep (County)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/0e054d7e-c2f7-4d18-beee-426df3ab54e3/viz.json', 'County Layers'));
layers.push(	new CartoDBLayer('Fatigue or loss of energy (County)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/26dd0f42-8d18-49a5-addc-dcf49b56d215/viz.json', 'County Layers'));
layers.push(	new CartoDBLayer('Feelings of worthlessness (County)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/92273be7-4f48-45bb-9080-d1c45bcf3cdd/viz.json', 'County Layers'));
layers.push(	new CartoDBLayer('Housing problems (County)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/85726efd-7d8a-4ca4-a1ea-01bb5c48aab4/viz.json', 'County Layers'));
layers.push(	new CartoDBLayer('Occupational problems (County)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/6acbfd41-04c3-46e6-9a37-18e1b79d31bb/viz.json', 'County Layers'));
layers.push(	new CartoDBLayer('Problems with support group (County)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/bf3d36b8-91e0-4a64-87a0-b7c13ce392a1/viz.json', 'County Layers'));
layers.push(	new CartoDBLayer('Weight Change (County)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/592b1bb0-b784-4b11-b29e-a57ab962928f/viz.json', 'County Layers'));
layers.push(	new CartoDBLayer('Psychomotor agitation (County)', 'https://infobytes-maps.carto.com/u/cartedesignmaps/api/v2/viz/8281c6ed-be33-45c1-ba87-f6c8cee42dc9/viz.json', 'County Layers'));



function initialize() {
  geocoder = new google.maps.Geocoder();
  directionsDisplay = new google.maps.DirectionsRenderer();

  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('panel'));
  /*     .on('done', function(layer) {
      var subLayer = layer.getSubLayer(0);
      subLayer.infowindow.set('template', $('#infowindow_template').html());
	 }
	 )*/;
  startVisible('Depressed Mood (State)');
}

google.maps.event.addDomListener(window, 'load', initialize);

