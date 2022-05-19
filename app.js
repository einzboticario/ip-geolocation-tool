//display user ip
const user_ip = document.getElementById("user_ip");

fetch('https://api.ipify.org/?format=json')
    .then(results => results.json())
    .then(data => user_ip.innerHTML = data.ip);

$(document).ready(function(){

    //ip search submit
    $("#form").submit(function(event){

        event.preventDefault();
        let ip = $("#input_ip").val();

        //if submitted blank, alert
        if(ip == ""){
            alert("Please enter an IP address.");
        }

        const API_KEY = "1d9fa633bb0e412393c98f0ad011fd88";
        let url = "https://api.ipgeolocation.io/ipgeo?apiKey="+API_KEY+"&ip="+ip;

        $.get(url, function(data){
            //show data in console
            console.log(data);
        })
        // zzz
    })
})