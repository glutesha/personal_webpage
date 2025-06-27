fetch("https://webring.otomir23.me/30/data").then(r => r.json()).then(webring => {
const prev = webring.prev;
const next = webring.next;
document.getElementById('prevurl').innerText = "< " + prev.name;
document.getElementById('prevurl').href = prev.url;
document.getElementById('nexturl').innerText = next.name + " >";
document.getElementById('nexturl').href = next.url;
});
window.addEventListener('scroll', function () {
    const webring = document.getElementById('webring');
    const scrolled = window.scrollY > 20;

    if (scrolled) {
        webring.classList.remove('translate-y-50');
        webring.classList.add('translate-y-0');
    } else {
        webring.classList.remove('translate-y-0');
        webring.classList.add('translate-y-50');
    }
});