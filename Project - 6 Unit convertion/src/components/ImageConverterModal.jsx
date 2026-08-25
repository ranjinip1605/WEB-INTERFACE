import React, { useState } from 'react';
import { X, Upload, FileImage, ArrowRight, Loader2 } from 'lucide-react';
import { parseImageForUnits } from '../utils/ocrParser';

export function ImageConverterModal({ isOpen, onClose, onLoadExtractedConversion }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [extractedData, setExtractedData] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleFileSelect = async (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setLoading(true);

    try {
      const res = await parseImageForUnits(selected);
      setPreviewUrl(res.imageUrl);
      setExtractedData(res.extracted);
    } catch (err) {
      console.error('Image processing failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyExtract = (item) => {
    onLoadExtractedConversion(item);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel animate-fade-in image-ocr-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <FileImage className="text-red" />
            <h3>Image-Based OCR Unit Scanner</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="ocr-upload-box">
          <input
            type="file"
            accept="image/*"
            id="ocr-file-input"
            onChange={handleFileSelect}
            className="hidden-file-input"
          />
          <label htmlFor="ocr-file-input" className="upload-dropzone">
            <Upload size={32} className="upload-icon text-red" />
            <span className="drop-title">
              {file ? file.name : 'Click to Upload Image / Receipt / Recipe'}
            </span>
            <span className="drop-sub">PNG, JPG, WEBP formats supported</span>
          </label>
        </div>

        {loading && (
          <div className="ocr-loading">
            <Loader2 className="animate-spin text-red" size={28} />
            <span>Scanning image text and numeric values...</span>
          </div>
        )}

        {previewUrl && !loading && (
          <div className="ocr-results-layout">
            <div className="image-preview-card">
              <img src={previewUrl} alt="OCR Upload Preview" className="ocr-img" />
            </div>

            <div className="extracted-items-panel">
              <h4 className="panel-subtitle">Extracted Values & Units</h4>
              <div className="extracted-list">
                {extractedData.map((item, idx) => (
                  <div key={idx} className="ocr-extracted-card">
                    <div className="ocr-text-info">
                      <span className="ocr-raw-text">{item.text}</span>
                      <span className="ocr-parsed-tag">
                        Value: <strong>{item.value}</strong> ({item.unit})
                      </span>
                    </div>
                    <button
                      className="use-ocr-btn"
                      onClick={() => handleApplyExtract(item)}
                    >
                      <span>Convert</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
