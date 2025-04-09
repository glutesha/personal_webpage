var today = new Date();
var birthDate = new Date("2008-09-25");
    
var age = today.getFullYear() - birthDate.getFullYear();
var m = today.getMonth() - birthDate.getMonth();

if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
}

document.getElementById('about').innerHTML = document.getElementById('about').innerHTML.replace("16", age);

