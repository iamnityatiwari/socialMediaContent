import React, { useState } from 'react';
import DropzoneUpload from './components/DropzoneUpload';
import './styles.css';

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="page">
      <div className="app">
        <header className="hero">
          <p className="eyebrow">AI Assisted Workflow</p>
          <h1>Social Media Content Analyzer</h1>
          <p className="subhead">
            Extract copy from PDFs or images and get instant AI-powered ideas to
            repurpose the content for social platforms.
          </p>
          <div className="hero-badges">
            <span className="badge">PDF</span>
            <span className="badge">Images</span>
            <span className="badge accent">Automated Insights</span>
          </div>
        </header>

        <section className="panel">
          <DropzoneUpload onResult={setResult} />
          <ul className="tips">
            <li>Best results come from clear screenshots or exported decks.</li>
            <li>Keep file size below 10 MB for faster processing.</li>
            <li>We never store your media; everything stays on your device.</li>
          </ul>
        </section>

        {result && (
          <section className="result-grid">
            <div className="result-card">
              <div className="result-card__header">
                <h2>Extracted Text</h2>
                <span className="badge soft">
                  {result.text?.length || 0} chars
                </span>
              </div>
              <pre className="extracted">{result.text}</pre>
            </div>

            <div className="result-card">
              <div className="result-card__header">
                <h2>Suggested Angles</h2>
                <span className="badge soft">
                  {result.suggestions?.length || 0} ideas
                </span>
              </div>
              <ul className="suggestions">
                {(result.suggestions || []).map((s, i) => (
                  <li key={i} className="suggestion-chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
