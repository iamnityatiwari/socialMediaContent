const Tesseract = require('tesseract.js');


module.exports = async function ocrImage(filepath) {
const { data: { text } } = await Tesseract.recognize(filepath, 'eng', { logger: m => console.log(m) });
return text || '';
};