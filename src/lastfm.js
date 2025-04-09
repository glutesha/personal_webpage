import tribal from '../imgs/tribal.png';
fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=glutesha&api_key=ee9f8ab4cf3c744ba03248f2ac1f19e8&format=json").then(r => r.json()).then(r => r.recenttracks.track[0]).then(track => {
    var trackName = track.name;
    var artistName = track.artist["#text"];
    var albumName = track.album["#text"];
    var trackUrl = track.url;
    var trackImage = track.image[3]["#text"];
    var trackHtml = `
        <div class="flex max-xl:flex-co relative ">
            <img class="rounded-3xl aspect-square shrink-0" src="${trackImage}" alt="${trackName}">
            <div class="flex justify-center p-5 flex-col text-2xl font-mono font-bold gap-2">
                <p class="text-5xl">${trackName}</p>
                <p class="text-xl">${artistName}</p>
                <p class="text-xl">${albumName}</p>
                <a class="text-red-400" href="${trackUrl}" target="_blank">listen</a>
                <img class="absolute right-3 flex-1 max-w-md -top-4 invert opacity-10" src="${tribal}"></img>
            </div>
        </div>
    `;

    var trackContainer = document.getElementById('lastfm');
    trackContainer.innerHTML = trackHtml;
});
