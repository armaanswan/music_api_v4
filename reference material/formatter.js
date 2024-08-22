function convertLyricsToJSON(text) {
    const lines = text.split('\n');
    const result = { sections: [] };
    let currentSection = null;

    lines.forEach(line => {
        line = line.trim();

        if (line.startsWith('#')) {
            // Handle new section
            if (currentSection) {
                result.sections.push(currentSection);
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
        result.sections.push(currentSection);
    }

    return result;
}

// Example usage
const txtContent = `
#VERSE 
ਕੁੜੀ ਹੱਸਦੀਆਂ ਅੱਖਾਂ ਵਾਲ਼ੀ ਸੀ
ਉਹਦੀ ਤੋਰ ਪੈਰਾਂ ਤੋਂ ਕਾਹਲ਼ੀ ਸੀ
ਕੁੜੀ ਹੱਸਦੀਆਂ ਅੱਖਾਂ ਵਾਲ਼ੀ ਸੀ
ਉਹਦੀ ਤੋਰ ਪੈਰਾਂ ਤੋਂ ਕਾਹਲ਼ੀ ਸੀ
ਕਿਤੋਂ ਧੋਖਾ ਖਾ ਲਿਆ ਏ
ਦੇਖਿਆ ਨਹੀਂ ਜਾਂਦਾ ਹਾਲ ਉਹਦਾ, ਹਾਲ ਉਹਦਾ

#CHORUS
ਹੰਝੂਆਂ ਦਾ ਹਿਸਾਬ ਕਰੇ
ਹਾਏ ਰੇਸ਼ਮੀ ਰੁਮਾਲ ਉਹਦਾ, ਰੁਮਾਲ ਉਹਦਾ
ਹੰਝੂਆਂ ਦਾ ਹਿਸਾਬ ਕਰੇ
ਹਾਏ ਰੇਸ਼ਮੀ ਰੁਮਾਲ ਉਹਦਾ, ਰੁਮਾਲ ਉਹਦਾ

#VERSE
‘ਕੱਲੀ ਬੈਠ ਕੰਟੀਨਾਂ ‘ਤੇ
ਪੜ੍ਹਦੀ ਹੁੰਦੀ ਹੀਰ ਸੀ ਉਹ
ਹੁਣ ਆਖੇ ਕੈਦੋਂ ਸੱਚਾ ਸੀ
ਪਹਿਲਾਂ ਲੋਹੇ ਉੱਤੇ ਲਕੀਰ ਸੀ ਉਹ
ਹੁਣ ਆਖੇ ਕੈਦੋਂ ਸੱਚਾ ਸੀ
ਪਹਿਲਾਂ ਲੋਹੇ ਉੱਤੇ ਲਕੀਰ ਸੀ ਉਹ
ਕਈਆਂ ਦੀ ਤਕਦੀਰ ਸੀ ਉਹ
ਕੋਈ ਕਰ ਨਾ ਸਕੀ ਤਦਬੀਰ ਸੀ ਉਹ
ਖੌਰੇ ਕਿਹੜਾ ਤੋੜ ਗਿਆ
ਹਾਏ ਜ਼ੁਲਫ਼ਾਂ ਦਾ ਜਾਲ਼ ਉਹਦਾ, ਜਾਲ਼ ਉਹਦਾ 

#CHORUS
(ਹੰਝੂਆਂ ਦਾ ਹਿਸਾਬ ਕਰੇ)
(ਹੰਝੂਆਂ ਦਾ ਹਿਸਾਬ ਕਰੇ)
(ਹਾਏ ਰੇਸ਼ਮੀ ਰੁਮਾਲ ਉਹਦਾ, ਰੁਮਾਲ ਉਹਦਾ)
ਦਿਲ ਭਰ-ਭਰ ਆਉਂਦਾ ਏ
ਦੇਖਿਆ ਨਹੀਂ ਜਾਂਦਾ ਹਾਲ ਉਹਦਾ, ਹਾਲ ਉਹਦਾ
ਹੰਝੂਆਂ ਦਾ ਹਿਸਾਬ ਕਰੇ
(ਹੰਝੂਆਂ ਦਾ ਹਿਸਾਬ ਕਰੇ)

#VERSE
ਕੋਲੋਂ ਲੰਘਦੀ ਨੀਵੀਂ ਚੱਕਦੀ ਨਹੀਂ
ਜਦ ਵੀ ਕਾਲਜ ਆਉਂਦੀ ਆ
ਸਾਰੇ ਦੇਖਣ ਅੱਜ-ਕੱਲ੍ਹ ਉਹ
ਸੂਟ ਵੀ ਫਿੱਕੇ ਪਾਉਂਦੀ ਆ
ਸਾਰੇ ਦੇਖਣ ਅੱਜ-ਕੱਲ੍ਹ ਉਹ
ਸੂਟ ਵੀ ਫਿੱਕੇ ਪਾਉਂਦੀ ਆ
ਨਾ ਹੱਥ ਵਿੱਚ ਗੁੱਤ ਘੁਮਾਉਂਦੀ ਆ
ਨਾ ਹੋਰਾਂ ਨੂੰ ਤੜਫਾਉਂਦੀ ਆ
ਜਿਹੜਾ ਦਿਸਣੋ ਰਹਿ ਗਿਆ ਏ
ਸੀ ਨਖ਼ਰਾ ਕਮਾਲ ਉਹਦਾ, ਕਮਾਲ ਉਹਦਾ

#CHORUS
(ਹੰਝੂਆਂ ਦਾ ਹਿਸਾਬ ਕਰੇ)
(ਹੰਝੂਆਂ ਦਾ ਹਿਸਾਬ ਕਰੇ)
(ਹਾਏ ਰੇਸ਼ਮੀ ਰੁਮਾਲ ਉਹਦਾ, ਰੁਮਾਲ ਉਹਦਾ)
ਦਿਲ ਭਰ-ਭਰ ਆਉਂਦਾ ਏ
ਦੇਖਿਆ ਨਹੀਂ ਜਾਂਦਾ ਹਾਲ ਉਹਦਾ, ਹਾਲ ਉਹਦਾ
ਹੰਝੂਆਂ ਦਾ ਹਿਸਾਬ ਕਰੇ
ਹਾਏ ਰੇਸ਼ਮੀ ਰੁਮਾਲ ਉਹਦਾ, ਰੁਮਾਲ ਉਹਦਾ

#VERSE
ਚੰਗਾ-ਭਲਾ ਮਟਕਾਉਂਦੀ ਸੀ
ਕਿਉਂ ਰਾਹ ਪਾਇਆ ਖੁਰਨੇ ਨੂੰ?
ਅਰਜਣ ਦੀ ਉਮਰ ਵੀ ਲੱਗ ਜਾਵੇ
ਰੱਬ ਕਰਕੇ ਉਹਦੇ ਸੁਰਮੇ ਨੂੰ
ਅਰਜਣ ਦੀ ਉਮਰ ਵੀ ਲੱਗ ਜਾਵੇ
ਰੱਬ ਕਰਕੇ ਉਹਦੇ ਸੁਰਮੇ ਨੂੰ
ਹਜੇ ਕੀ ਉਮਰ ਹੈ ਝੁਰਨੇ ਨੂੰ?
ਖ਼ੁਸ਼ੀਆਂ ਖੜ੍ਹੀਆਂ ਨੇ ਮੁੜਨੇ ਨੂੰ
ਸੁੱਖੀ-ਸਾਂਦੀ ਟੱਪ ਜਾਵੇ
ਆਹ 19ਵਾਂ ਜਿਹਾ ਸਾਲ ਉਹਦਾ, ਸਾਲ ਉਹਦਾ

#CHORUS
ਹੰਝੂਆਂ ਦਾ ਹਿਸਾਬ ਕਰੇ
(ਹਾਏ ਰੇਸ਼ਮੀ ਰੁਮਾਲ ਉਹਦਾ, ਰੁਮਾਲ ਉਹਦਾ)
ਹੰਝੂਆਂ ਦਾ ਹਿਸਾਬ ਕਰੇ
(ਹਾਏ ਰੇਸ਼ਮੀ ਰੁਮਾਲ ਉਹਦਾ, ਰੁਮਾਲ ਉਹਦਾ)
`;

document.querySelector('body').textContent = (JSON.stringify(convertLyricsToJSON(txtContent)));
