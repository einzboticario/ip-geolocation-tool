
//display user ip
const user_ip = document.getElementById("user_ip");
fetch('https://api.ipify.org/?format=json')
    .then(results => results.json())
    .then(data => user_ip.innerHTML = data.ip);

//google map
function initMap(){

    //default loc
    const def = { lat: 14.5589, lng: 121.0181 };

    var options = {
        zoom: 15,
        center: def,
    }

    //map centered at default loc
    const map = new google.maps.Map(document.getElementById('map'), {options});

    //marker placed at default loc
    const marker = new google.maps.Marker({
        position: def,
        map: map,
    })
}

$(document).ready(function(){
    //ip search submit
    $("#form").submit(function(event){

        event.preventDefault();
        const ip = $("#input_ip").val();

        //clear ip_details div when submitted
        $("#ip_details").empty();

        //if submitted blank, alert
        if(ip == ""){
            alert("Please enter an IP address.");
        }

        //ipgeoloc api
        var API_KEY = "1d9fa633bb0e412393c98f0ad011fd88";
        var url = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ip}`;

        $.get(url, function(data){
            //show data in console
            console.log(data);

            var country_flag = data.country_flag;
            var city = data.city;
            var country_name = data.country_name;

            //get latitude and longitude, convert it from string to float
            var lat = parseFloat(data.latitude);
            var lng = parseFloat(data.longitude);

            //will use this data to show location in google map
            var pos = {
                lat: lat,
                lng: lng
            }

            displayDetails(country_flag, city, country_name);

            //show pos in console
            console.log(pos)
        })
    })

    //functions
    function displayDetails(country_flag, city, country_name) {
        //append html containing ip details
        var ip_details = `<img src=${country_flag}><h4>${city}, ${country_name}</h4>`;
        
        $("#ip_details").append(ip_details);
    }

})
