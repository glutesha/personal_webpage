import tribal from '../imgs/tribal.png';
fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=glutesha&api_key=ee9f8ab4cf3c744ba03248f2ac1f19e8&format=json").then(r => r.json()).then(r => r.recenttracks.track[0]).then(track => {
    const trackName = track.name;
    const artistName = track.artist["#text"];
    const albumName = track.album["#text"];
    const trackUrl = track.url;
    const trackImage = track.image[3]["#text"];
    const trackHtml = `
        <div class="flex max-xl:flex-co relative ">
            <img class="rounded-3xl aspect-square shrink-0 z-1" src="${trackImage}" alt="${trackName}">
            <div class="flex justify-center p-5 flex-col text-2xl font-mono font-bold gap-2">
                <img alt="chuvirlatribal" class="absolute right-3 flex-1 max-w-md -top-4 invert opacity-10" src="${tribal}">
                <p class="text-5xl z-1">${trackName}</p>
                <p class="text-xl z-1">${artistName}</p>
                <p class="text-xl z-1">${albumName}</p>
                <a class="text-red-400 z-1" href="${trackUrl}" target="_blank">listen</a>
            </div>
        </div>
    `;

    const trackContainer = document.getElementById('lastfm');
    trackContainer.innerHTML = trackHtml;
});
