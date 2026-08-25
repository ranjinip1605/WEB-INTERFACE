import React, { useState } from 'react';
import { Code, Binary, FileText, Download } from 'lucide-react';

export function DeveloperConverter({ onShowToast }) {
  const [tab, setTab] = useState('bases');

  // Base Converter state
  const [decVal, setDecVal] = useState('255');

  // PX to REM state
  const [pxVal, setPxVal] = useState('16');
  const [rootPx, setRootPx] = useState('16');

  // Base64 state
  const [b64Input, setB64Input] = useState('Hello OmniConvert!');
  const [b64Mode, setB64Mode] = useState('encode');

  // Download Time state
  const [fileMb, setFileMb] = useState('1000'); // 1 GB = 1000 MB
  const [speedMbps, setSpeedMbps] = useState('100'); // 100 Mbps broadband

  // Base Math
  const numDec = parseInt(decVal, 10) || 0;
  const binVal = numDec.toString(2);
  const hexVal = numDec.toString(16).toUpperCase();
  const octVal = numDec.toString(8);

  // PX to REM Math
  const numPx = parseFloat(pxVal) || 0;
  const numRoot = parseFloat(rootPx) || 16;
  const remVal = (numPx / numRoot).toFixed(4);

  // Base64 Math
  let b64Output = '';
  try {
    if (b64Mode === 'encode') b64Output = btoa(b64Input);
    else b64Output = atob(b64Input);
  } catch (e) {
    b64Output = 'Invalid string for decoding';
  }

  // Download Time Math
  // File size in Megabits = MB * 8
  const fileMbNum = parseFloat(fileMb) || 0;
  const speedMbpsNum = parseFloat(speedMbps) || 1;
  const totalSeconds = (fileMbNum * 8) / speedMbpsNum;
  const downloadMin = (totalSeconds / 60).toFixed(1);

  return (
    <div className="tool-card glass-panel animate-fade-in">
      <div className="tool-header">
        <Code className="tool-icon text-red" />
        <div>
          <h3 className="tool-title">Developer & Tech Converter</h3>
          <p className="tool-subtitle">Base numbers, PX to REM, Base64, and Download Estimator</p>
        </div>
      </div>

      <div className="calc-tab-group">
        <button
          className={`calc-tab ${tab === 'bases' ? 'active' : ''}`}
          onClick={() => setTab('bases')}
        >
          Base Numbers
        </button>
        <button
          className={`calc-tab ${tab === 'pxrem' ? 'active' : ''}`}
          onClick={() => setTab('pxrem')}
        >
          PX ↔ REM
        </button>
        <button
          className={`calc-tab ${tab === 'base64' ? 'active' : ''}`}
          onClick={() => setTab('base64')}
        >
          Base64
        </button>
        <button
          className={`calc-tab ${tab === 'download' ? 'active' : ''}`}
          onClick={() => setTab('download')}
        >
          Download Time
        </button>
      </div>

      {tab === 'bases' && (
        <div className="dev-form">
          <div className="form-group">
            <label>Decimal (Base 10):</label>
            <input
              type="number"
              value={decVal}
              onChange={(e) => setDecVal(e.target.value)}
              className="tool-input"
            />
          </div>

          <div className="dev-output-grid">
            <div className="dev-out-card">
              <span className="dev-label">Binary (Base 2):</span>
              <code className="dev-code text-red">{binVal}</code>
            </div>
            <div className="dev-out-card">
              <span className="dev-label">Hexadecimal (Base 16):</span>
              <code className="dev-code text-red">0x{hexVal}</code>
            </div>
            <div className="dev-out-card">
              <span className="dev-label">Octal (Base 8):</span>
              <code className="dev-code text-red">{octVal}</code>
            </div>
          </div>
        </div>
      )}

      {tab === 'pxrem' && (
        <div className="dev-form">
          <div className="grid-2-col">
            <div className="form-group">
              <label>Pixels (px):</label>
              <input
                type="number"
                value={pxVal}
                onChange={(e) => setPxVal(e.target.value)}
                className="tool-input"
              />
            </div>
            <div className="form-group">
              <label>Root Font Size (default 16px):</label>
              <input
                type="number"
                value={rootPx}
                onChange={(e) => setRootPx(e.target.value)}
                className="tool-input"
              />
            </div>
          </div>
          <div className="dev-result-box">
            <span>{numPx}px =</span>
            <span className="result-val text-red">{remVal}rem</span>
          </div>
        </div>
      )}

      {tab === 'base64' && (
        <div className="dev-form">
          <div className="form-group">
            <label>Mode:</label>
            <div className="mode-btn-group">
              <button
                className={`mode-btn ${b64Mode === 'encode' ? 'active' : ''}`}
                onClick={() => setB64Mode('encode')}
              >
                Encode
              </button>
              <button
                className={`mode-btn ${b64Mode === 'decode' ? 'active' : ''}`}
                onClick={() => setB64Mode('decode')}
              >
                Decode
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Input Text:</label>
            <textarea
              value={b64Input}
              onChange={(e) => setB64Input(e.target.value)}
              className="tool-textarea"
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Result Output:</label>
            <code className="dev-code-block text-red">{b64Output}</code>
          </div>
        </div>
      )}

      {tab === 'download' && (
        <div className="dev-form">
          <div className="grid-2-col">
            <div className="form-group">
              <label>File Size (MB):</label>
              <input
                type="number"
                value={fileMb}
                onChange={(e) => setFileMb(e.target.value)}
                className="tool-input"
              />
            </div>
            <div className="form-group">
              <label>Connection Speed (Mbps):</label>
              <input
                type="number"
                value={speedMbps}
                onChange={(e) => setSpeedMbps(e.target.value)}
                className="tool-input"
              />
            </div>
          </div>
          <div className="dev-result-box">
            <span>Est. Download Time:</span>
            <span className="result-val text-red">
              {totalSeconds < 60 ? `${Math.round(totalSeconds)} seconds` : `${downloadMin} minutes`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
