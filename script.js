// Database of songs per mood (15-20 tracks per mood placeholder database)
// Note: youtubeId matches the string code at the end of a YouTube video link
const songDatabase = {
    happy: [
        { title: "Can't Stop the Feeling", artist: "Justin Timberlake", youtubeId: "ru0K8uYEZWw" },
        { title: "Happy", artist: "Pharrell Williams", youtubeId: "ZbZSe6N_BXs" },
        { title: "Uptown Funk", artist: "Bruno Mars", youtubeId: "OPf0YbXqDm0" },
        { title: "Good Vibes", artist: "HRVY", youtubeId: "U3o8VpI6mrs" },
        { title: "Dynamite", artist: "BTS", youtubeId: "gdZLi9oWNZg" },
        { title: "Walking On Sunshine", artist: "Katrina and the Waves", youtubeId: "iPUmE-tRJ5U" },
        { title: "Don't Start Now", artist: "Dua Lipa", youtubeId: "oygrmJFKYZY" },
        { title: "Best Day Of My Life", artist: "American Authors", youtubeId: "Y66j_BUCBMY" }
    ],
    sad: [
        { title: "Someone Like You", artist: "Adele", youtubeId: "hLQl3WQQoQ0" },
        { title: "Stay With Me", artist: "Sam Smith", youtubeId: "pB-5XG-DbAA" },
        { title: "Fix You", artist: "Coldplay", youtubeId: "k4V3Mo61fJM" },
        { title: "All I Want", artist: "Kodaline", youtubeId: "mtf7hC17IBM" },
        { title: "Say Something", artist: "A Great Big World", youtubeId: "-2U0Ivkn2Ds" },
        { title: "Driver's License", artist: "Olivia Rodrigo", youtubeId: "ZmDBpeDNnNJ" },
        { title: "Another Love", artist: "Tom Odell", youtubeId: "MwpMEbgC6Mc" }
    ],
    chill: [
        { title: "Sunflower", artist: "Post Malone", youtubeId: "ApXoWvfEYVU" },
        { title: "Location", artist: "Khalid", youtubeId: "by3yRdlQvzs" },
        { title: "Sunday Best", artist: "Surfaces", youtubeId: "🚀_dQw4w9WgXcQ" }, 
        { title: "Comethru", artist: "Jeremy Zucker", youtubeId: "jO2viLEW-1A" },
        { title: "Ocean Drive", artist: "Duke Dumont", youtubeId: "FHCYHldJi_g" },
        { title: "Put Your Records On", artist: "Ritt Momney", youtubeId: "77m6XvP5S9w" }
    ],
    energetic: [
        { title: "Blinding Lights", artist: "The Weeknd", youtubeId: "4NRXx6U8ABQ" },
        { title: "Remember the Name", artist: "Fort Minor", youtubeId: "VDvr08sCPOc" },
        { title: "Till I Collapse", artist: "Eminem", youtubeId: "_1xX7YdVvjk" },
        { title: "Wake Me Up", artist: "Avicii", youtubeId: "IcrbM1l_BoI" },
        { title: "Level Up", artist: "Ciara", youtubeId: "Dh-ULbQmmF8" },
        { title: "Stronger", artist: "Kanye West", youtubeId: "PsO6ZnUZI0w" }
    ],
    sleepy: [
        { title: "Weightless", artist: "Marconi Union", youtubeId: "UfcAVejsvU4" },
        { title: "Lullaby", artist: "Sleeping At Last", youtubeId: "w_M4A8O_NRE" },
        { title: "Gymnopédie No.1", artist: "Erik Satie", youtubeId: "S-Xm7s9eGxU" },
        { title: "Clair de Lune", artist: "Claude Debussy", youtubeId: "WNcsUNKlAKw" },
        { title: "River Flows In You", artist: "Yiruma", youtubeId: "7maJOI3QMu0" }
    ]
};

let ytPlayer; 

// Initializing YouTube Global Player API Function Hook
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('youtube-player', {
        height: '360',
        width: '640',
        videoId: '', // Loaded dynamically later
        playerVars: {
            'playsinline': 1,
            'autoplay': 1
        }
    });
}

// Attach Event Listeners to Mood Selection DOM Elements
document.querySelectorAll('.mood-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const selectedMood = e.target.getAttribute('data-mood');
        generatePlaylist(selectedMood);
    });
});

// Logic to pull 3 unique, randomized tracks from the pool array
function generatePlaylist(mood) {
    const songPool = songDatabase[mood];
    const shuffled = [...songPool].sort(() => 0.5 - Math.random()); // Shuffles array values
    const selectedSongs = shuffled.slice(0, 3); // Grab first 3 items post-shuffle

    displaySongs(selectedSongs);
}

// Renders the generated cards onto the DOM webpage layout
function displaySongs(songs) {
    const songsListContainer = document.getElementById('songs-list');
    const recommendationsSection = document.getElementById('recommendations-section');
    
    songsListContainer.innerHTML = ''; // Empty previous content execution
    recommendationsSection.classList.remove('hidden');

    songs.forEach(song => {
        const card = document.createElement('div');
        card.className = 'song-card';
        card.innerHTML = `
            <h4>${song.title}</h4>
            <p>${song.artist}</p>
        `;
        
        // Listen to active click transitions to play the tracking video
        card.addEventListener('click', () => {
            playSong(song.youtubeId);
        });

        songsListContainer.appendChild(card);
    });
}

// Connects to active YouTube player object instance to load and track videos
function playSong(videoId) {
    const playerSection = document.getElementById('player-section');
    playerSection.classList.remove('hidden');
    
    if (ytPlayer && typeof ytPlayer.loadVideoById === 'function') {
        ytPlayer.loadVideoById(videoId);
    }
}
