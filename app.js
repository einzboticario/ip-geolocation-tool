//display user ip
const user_ip = document.getElementById("user_ip");

//did not use ipgeoloc for less api request consumption
fetch('https://api.ipify.org/?format=json')
    .then(results => results.json())
    .then(data => user_ip.innerHTML = data.ip);


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

            displayDetails(country_flag, city, country_name);

            //test
            console.log(country_flag);
            console.log(city);
            console.log(country_name);
        })
    })

    function displayDetails(country_flag, city, country_name) {
        
        //append html containing ip details
        var ip_details = `<h4>${city}, ${country_name}</h4><br> 
                        <img src=${country_flag}`;

        $("#ip_details").append(ip_details);
    }
})