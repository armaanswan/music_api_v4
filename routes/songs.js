const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// GET /songs/new - Render form to create a new song
router.get('/new', (req, res) => {
    res.render('newSong');
});

// GET /songs/:id/edit - Render form to edit a song
router.get('/:id/edit', (req, res) => {
    const song = { id: req.params.id, title: 'Example Song', artist: 'Example Artist' }; // Example data
    res.render('editSong', { song });
});

// Other routes (GET, POST, PUT, DELETE) for handling specific song operations
// GET /songs - Retrieve all songs
router.get('/', async (req, res) => {
    try {
        const songsSnapshot = await db.collection('songs').get();
        const songs = songsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(songs);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET /songs/:id
router.get('/:id', async (req, res) => {
    try {
        const songId = req.params.id;
        const songDoc = await db.collection('songs').doc(songId).get();
        if (!songDoc.exists) {
            return res.status(404).send('Song not found!');
        }
        res.json(songDoc.data());
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST /songs
router.post('/', async (req, res) => {
    const data = req.body;
    try {
        const docRef = await db.collection('songs').add(data);
        res.json({ id: docRef.id });
    } catch (error) {
        console.error('Error adding document: ', error);
        res.status(500).send('Error uploading metadata!');
    }
});

// PUT /songs/:id
router.put('/:id', async (req, res) => {
    try {
        const songId = req.params.id;
        const songDoc = await db.collection('songs').doc(songId).update();
        if (!songDoc.exists) {
            return res.status(404).send('Song not found!');
        }
        res.json(songDoc.data());
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// DELETE /songs/:id
router.delete('/:id', (req, res) => {
    // Logic to delete a specific song by ID
    res.json({ message: 'Delete a specific song' });
});

module.exports = router;
