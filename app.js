// display user ip
const user_ip = document.getElementById("user_ip");
fetch('https://api.ipify.org/?format=json')
    .then(results => results.json())
    .then(data => user_ip.innerHTML = data.ip);

$(document).ready(function(){
    // ip search submit
    $("#form").submit(function(event){

        event.preventDefault();
        const ip = $("#input_ip").val();

        // empty these when submitted
        $("#ip_details").empty();
        $("others").empty();

        // if submitted blank, alert
        if(ip == ""){
            alert("Please enter an IP address.");
        }

        // ipgeoloc api
        var API_KEY = "1d9fa633bb0e412393c98f0ad011fd88";
        var url = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ip}`;

        $.get(url, function(data){
            // show data in console
            console.log(data);

            var country_name = data.country_name;
            var city = data.city;
            var zipcode = data.zipcode;
            var isp = data.isp;
            var country_flag = data.country_flag;

            // get latitude and longitude, convert it from string to float
            var latitude = parseFloat(data.latitude);
            var longitude = parseFloat(data.longitude);

            displayDetails(country_name, city, zipcode, isp, latitude, longitude, country_flag);   
        })
    })

    // function

    function displayDetails(country_name, city, zipcode, isp, latitude, longitude, country_flag) {

        var ip_details = `
        <h3>Country Name: <span class="ip_data">${country_name}</span></h2>
        <h3>City: <span class="ip_data">${city}</span></h2>
        <h3>Zip Code: <span class="ip_data">${zipcode}</span></h2>
        <h3>ISP: <span class="ip_data">${isp}</span></h2>
        <h3>Latitude: <span class="ip_data">${latitude}</span></h2>
        <h3>Longitude: <span class="ip_data">${longitude}</span></h2>
        `

        var other_details = `
        <img src="${country_flag}" alt="">
        <button>See google map</button>
        `

        $("#ip_details").html(ip_details);
        $("#others").html(other_details);
    }

})
