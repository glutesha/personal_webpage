fetch("https://webring.otomir23.me/30/data").then(r => r.json()).then(webring => {
const prev = webring.prev;
const next = webring.next;
document.getElementById('prevurl').innerText = "< " + prev.name;
document.getElementById('prevurl').href = prev.url;
document.getElementById('nexturl').innerText = next.name + " >";
document.getElementById('nexturl').href = next.url;
});