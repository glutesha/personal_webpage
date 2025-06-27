import tribal from '../imgs/tribal.png';
fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=glutesha&api_key=ee9f8ab4cf3c744ba03248f2ac1f19e8&format=json").then(r => r.json()).then(r => r.recenttracks.track[0]).then(track => {
    const trackName = track.name;
    const artistName = track.artist["#text"];
    const albumName = track.album["#text"];
    const trackUrl = track.url;
    const trackImage = track.image[3]["#text"];
    const trackHtml = `
        <div class="flex flex-col md:flex-row relative font-sans font-stretch-ultra-expanded">
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

    const trackContainer = document.getElementById('lastfm');
    trackContainer.innerHTML = trackHtml;
});
