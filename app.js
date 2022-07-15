// api
const API_KEY = "be468e25afa1470d931519db29f2575c";

// display user ip
const user_ip = document.getElementById("user_ip");
fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`)
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

        // making api request
        const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ip}`;

        $.get(url, function(data){
            // show data in console
            console.log(data);

            const country_name = data.country_name;
            const city = data.city;
            const zipcode = data.zipcode;
            const isp = data.isp;
            const country_flag = data.country_flag;

            // get latitude and longitude, convert it from string to float
            const latitude = parseFloat(data.latitude);
            const longitude = parseFloat(data.longitude);

            displayDetails(country_name, city, zipcode, isp, latitude, longitude, country_flag);   
        })
    })

    function displayDetails(country_name, city, zipcode, isp, latitude, longitude, country_flag) {

        const ip_details = `
        <h3>Country Name: <span class="ip_data">${country_name}</span></h2>
        <h3>City: <span class="ip_data">${city}</span></h2>
        <h3>Zip Code: <span class="ip_data">${zipcode}</span></h2>
        <h3>ISP: <span class="ip_data">${isp}</span></h2>
        <h3>Latitude: <span class="ip_data">${latitude}</span></h2>
        <h3>Longitude: <span class="ip_data">${longitude}</span></h2>
        `

        const other_details = `
        <img src="${country_flag}" alt="">
        <a href="https://maps.google.com/maps?q=loc:${latitude},${longitude}" id="map_link" target="_blank">Google Map</a>
        `

        // set html
        $("#ip_details").html(ip_details);
        $("#others").html(other_details);
    }

})
