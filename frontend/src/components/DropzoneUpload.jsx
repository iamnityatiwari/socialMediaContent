import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function DropzoneUpload({ onResult }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('');

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles || !acceptedFiles[0]) return;
      const file = acceptedFiles[0];
      setError(null);
      setLoading(true);
      setFileName(file.name);

      const form = new FormData();
      form.append('file', file);

      try {
const res = await axios.post('http://localhost:5001/api/upload', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 120000,
        });
        onResult(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    },
    [onResult]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'image/*': [] },
  });

  return (
    <>
      <div
        className={`dropzone ${isDragActive ? 'dropzone--active' : ''} ${
          loading ? 'dropzone--disabled' : ''
        }`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="dropzone__content">
          <div className="icon-circle">⬆️</div>
          <h3>Drop your creative file</h3>
          <p>
            {isDragActive
              ? 'Release to start analyzing'
              : 'Drag & drop or click to upload a PDF or image'}
          </p>
          {fileName && !loading && (
            <p className="filename">Queued: {fileName}</p>
          )}
          {loading && <p className="loading">Processing… hang tight!</p>}
        </div>
      </div>
      {error && <p className="error">{error}</p>}
    </>
  );
}
