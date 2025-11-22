const fs = require('fs');
const pdf = require('pdf-parse');


module.exports = async function parsePdf(filepath) {
const dataBuffer = fs.readFileSync(filepath);
const data = await pdf(dataBuffer, { max: 1000 });
// pdf-parse returns `text` with some spacing. You can refine.
return data.text || '';
};