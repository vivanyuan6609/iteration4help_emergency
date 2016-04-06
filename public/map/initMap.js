var bounds = new L.LatLngBounds(
    new L.LatLng(37.406551, -122.070566),
    new L.LatLng(37.414310, -122.052258));
var map = L.map('mapid').fitBounds(bounds).setView([37.41039, -122.05961],17);
var options = {
    minZoom: 14,
    maxZoom: 17,
    opacity: 1.0,
    tms: false
};
L.tileLayer('{z}/{x}/{y}.png', options).addTo(map);
map.on('click', addPin);
$.get('/map/getPins', function(data, status){
    console.log(data);
    for (i=0; i<data.length; i++){
        var ltg = new L.LatLng(data[i].posx, data[i].posy);
        var newPin = new L.marker(ltg);
        newPin.bindPopup('Here is ' + data[i].User.username).openPopup();
        newPin.addTo(map);
    }
});

function addPin(e){
    var ans = confirm("Do you want to update location here?");
    if (ans == true){
        var newPin = new L.marker(e.latlng).addTo(map);
        $.post('/map/sendPins', {
            posx: e.latlng['lat'],
            posy: e.latlng['lng']
        }, function(data, status){
            window.location.reload();
        });        
    } else {
        console.log("give up update location");
    }
}