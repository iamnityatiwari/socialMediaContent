import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';


export default function DropzoneUpload({ onResult }) {
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);


const onDrop = useCallback(async (acceptedFiles) => {
if (!acceptedFiles || !acceptedFiles[0]) return;
setError(null);
setLoading(true);
const form = new FormData();
form.append('file', acceptedFiles[0]);
try {
const res = await axios.post('http://localhost:5000/api/upload', form, {
headers: { 'Content-Type': 'multipart/form-data' },
timeout: 120000
});
onResult(res.data);
} catch (err) {
console.error(err);
setError(err.response?.data?.error || err.message);
} finally {
setLoading(false);
}
}, [onResult]);


const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'], 'image/*': [] } });


return (
<div className="dropzone" {...getRootProps()}>
<input {...getInputProps()} />
{loading ? <p>Processing... (this can take a while for images)</p> : (
isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop a PDF/image, or click to select</p>
)}
{error && <p className="error">{error}</p>}
</div>
);
}