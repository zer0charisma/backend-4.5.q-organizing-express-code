const path = require("path");
const notes = require(path.resolve("src/data/notes-data"));

 // Add 

function noteExists(req, res, next) {
    const noteId = Number(req.params.noteId);
    const foundNote = notes.find((note) => note.id === noteId);
    if (foundNote) {
        return next();
    } else {
        return next({
            status: 404,
            message: `Note id not found: ${req.params.noteId}`,
        });
    }
}

function hasText(req, res, next) {
    const { data: { text } = {} } = req.body;
    if (text) {
        return next();
    }
    return next({
        status: 400,
        message: "A 'text' property is required.",
    });
};

 
function list(req, res) {
    res.status(200).json({ data: notes });
}

 // Read note handler
function read(req, res) {
    const { noteId } = req.params;
    const foundNote = notes.find((note) => note.id === Number(noteId));
    res.json({ data: foundNote });
};

//   Create new note route
function create(req, res, next) {
    const { data: { text } = {} } = req.body;
    const newNote = {
        id: notes.length + 1, // Assign the next ID
        text,
    };
    notes.push(newNote);
    res.status(201).json({ data: newNote });
}

// Update note
function update(req, res) {
    const { noteId } = req.params;
    const foundNote = notes.find((note) => note.id === Number(noteId));
    const { data: { text } = {} } = req.body;

    // Update note data
    foundNote.text = text;

    res.json({ data: foundNote });
}

// Delete note
function destroy(req, res) {
    const { noteId } = req.params;
    const index = notes.findIndex((note) => note.id === Number(noteId));
    const deletedNotes = notes.splice(index, 1);
    res.sendStatus(204);
}

module.exports = {
    list,
    create: [hasText, create],
    read: [noteExists, read],
    update: [hasText, noteExists, update],
    delete: [noteExists, destroy],
};