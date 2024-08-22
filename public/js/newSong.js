const form = document.querySelector('.form')

const convertLyricsToJSON = text => {
    const lines = text.split('\n');
    const sections = [];
    let currentSection = null;

    lines.forEach(line => {
        line = line.trim();

        if (line.startsWith('#')) {
            // Handle new section
            if (currentSection) {
                sections.push(currentSection);
            }
            currentSection = {
                type: line.substring(1).trim().toLowerCase(),
                lyrics: []
            };
        } else if (line) {
            // Handle lyrics lines
            const backgroundVocals = line.startsWith('(') && line.endsWith(')');
            const text = line.replace(/^\((.*)\)$/, '$1').trim();
            currentSection.lyrics.push({
                text: text,
                background_vocals: backgroundVocals
            });
        }
    });

    if (currentSection) {
        sections.push(currentSection);
    }

    return sections;
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const song = {
        'title': form.title.value,
        'single': form.single.checked ? true : false,
        'explicit': form.explicit.checked ? true : false,
        'album_title': form.album_title.value,
        'release_date': new Date(form.release_date.value).toISOString(),
        'year': parseInt(form.year.value),
        'track_number': parseInt(form.track_number.value),
        'disc_number': parseInt(form.disc_number.value),
        'isrc': form.isrc.value,
        'label': form.label.value,
        'duration': parseInt(form.duration.value),
        'genre': form.genre.value,
        'language_code': form.language_code.value,
        'socials': {
            'youtube_url': form.youtube_url.value,
            'youtube_music_url': form.youtube_music_url.value,
            'spotify_url': form.spotify_url.value,
            'apple_music_url': form.apple_music_url.value,
            'shazam_url': form.shazam_url.value,
            'soundcloud_url': form.soundcloud_url.value,
            'amazon_music_url': form.amazon_music_url.value,
        },
        'sections': convertLyricsToJSON(form.lyrics.value)
    };

    fetch('/songs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
});