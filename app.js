//display user ip
var user_ip = document.getElementById("user_ip");

fetch('https://api.ipify.org/?format=json')
    .then(results => results.json())
    .then(data => user_ip.innerHTML = data.ip);

$(document).ready(function(){
    $("#form").submit(function(event){
        event.preventDefault;
    })
})