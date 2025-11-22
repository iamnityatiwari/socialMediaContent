import React, { useState } from 'react';
import DropzoneUpload from './components/DropzoneUpload';
import './styles.css';


export default function App() {
const [result, setResult] = useState(null);


return (
<div className="app">
<h1>Social Media Content Analyzer</h1>
<DropzoneUpload onResult={setResult} />


{result && (
<div className="result">
<h2>Extracted Text</h2>
<pre className="extracted">{result.text}</pre>


<h2>Suggestions</h2>
<ul>
{result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
</ul>
</div>
)}
</div>
);
}