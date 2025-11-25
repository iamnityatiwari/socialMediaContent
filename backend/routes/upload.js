const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const parsePdf = require('../services/parsePdf');
const ocrImage = require('../services/ocrImage');


const storage = multer.diskStorage({
destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});


const upload = multer({
storage,
limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
fileFilter: (req, file, cb) => {
const allowed = /pdf|jpg|jpeg|png/;
const ext = path.extname(file.originalname).toLowerCase();
if (allowed.test(ext)) cb(null, true);
else cb(new Error('Only PDF and image files are allowed'));
}
});


router.post('/', upload.single('file'), async (req, res) => {
if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
const filepath = req.file.path;
try {
let extractedText = '';
const ext = path.extname(req.file.filename).toLowerCase();
if (ext === '.pdf') {
extractedText = await parsePdf(filepath);
} else {
extractedText = await ocrImage(filepath);
}


// Basic engagement suggestions (stateless)
const suggestions = generateSuggestions(extractedText);


// Optionally: save result to DB here


// cleanup file if you don't want to store
// fs.unlinkSync(filepath);


res.json({ text: extractedText, suggestions });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed to process file', details: err.message });
}
});


function generateSuggestions(text) {
// Simple heuristic-based suggestions. Replace with ML/NLP later.
const suggestions = [];
const len = text.trim().length;
if (len < 50) suggestions.push('Add more detail — try to reach 100+ characters.');
if (!text.includes('?')) suggestions.push('Ask a question to invite replies.');
if (!text.includes('#')) suggestions.push('Add 2–3 relevant hashtags.');
if (!/[!?]$/.test(text.trim())) suggestions.push('End with a call-to-action (CTA) or emoji to increase engagement.');
if (/http/.test(text)) suggestions.push('If linking, add short description and mention why it matters.');
return suggestions;
}


module.exports = router;
