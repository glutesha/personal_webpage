import tribal from '../imgs/tribal.png';
import ColorThief from 'colorthief';
const colorThief = new ColorThief();

//https://awik.io/determine-color-bright-dark-using-javascript/
function getBrightness([r, g, b]) {
  return Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);
}

function adjustFactor(brightness) {
  const factor = brightness > 127.5 ? 0.2 : 0.5;
  return factor;
}

fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=glutesha&api_key=ee9f8ab4cf3c744ba03248f2ac1f19e8&format=json").then(r => r.json()).then(r => r.recenttracks.track[0]).then(track => {
    const trackName = track.name;
    const artistName = track.artist["#text"];
    const albumName = track.album["#text"];
    const trackUrl = track.url;
    const trackImage = track.image[3]["#text"];

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = trackImage;
    
    const trackContainer = document.getElementById('lastfm');
    
    img.onload = () => {
        const colorThief = new ColorThief();
        const [r, g, b] = colorThief.getColor(img);
        const brightness = getBrightness([r, g, b]);
        const factor = adjustFactor(brightness);

        trackContainer.addEventListener('mouseenter', () => {
        trackContainer.style.boxShadow = `0 20px 25px rgba(${r},${g},${b},${factor})`;
        });
        trackContainer.addEventListener('mouseleave', () => {
        trackContainer.style.boxShadow = '';
        });
    };

    const trackHtml = `
        <div class="flex flex-col md:flex-row relative font-mona-sans font-black font-stretch-125%">
            <img class="rounded-3xl aspect-square shrink-0 z-1" src="${trackImage}" alt="${trackName}">
            <div class="flex justify-center px-1 md:px-5 py-2 flex-col text-2xl font-bold gap-2">
                <img alt="chuvirlatribal" class="absolute -right-20 -bottom-28 max-h-70 md:max-h-max md:left-auto md:right-3 flex-1 md:max-w-md md:-top-4 invert opacity-10" src="${tribal}">
                <p class="pt-2 text-4xl md:text-5xl z-1">${trackName}</p>
                <p class="text-xl z-1">${artistName}</p>
                <p class="text-xl z-1">${albumName}</p>
                <a class="text-red-400 z-1" href="${trackUrl}" target="_blank">listen</a>
            </div>
        </div>
    `;

    
    trackContainer.innerHTML = trackHtml;
});
