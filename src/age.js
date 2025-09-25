const today = new Date();
const birthDate = new Date("2008-09-25");

let age = today.getFullYear() - birthDate.getFullYear();
const m = today.getMonth() - birthDate.getMonth();

if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
}

document.getElementById('about').innerHTML = document.getElementById('about').innerHTML.replace("17", age.toString());

