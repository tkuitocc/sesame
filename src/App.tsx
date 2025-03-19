import React, { useState, useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';

const App: React.FC = () => {
  const [barcodeText, setBarcodeText] = useState('000000000');
  const [barcodeFormat, setBarcodeFormat] = useState('CODE39');
  const svgRef = useRef<SVGSVGElement>(null);

  // Automatically generate barcode on text/format change
  useEffect(() => {
    if (svgRef.current) {
      try {
        JsBarcode(svgRef.current, barcodeText, {
          format: barcodeFormat,
          lineColor: '#000000',
          width: 2,
          height: 100,
          displayValue: true,
          fontSize: 14,
          margin: 10,
        });
      } catch (error) {
        console.error('Error generating barcode:', error);
      }
    }
  }, [barcodeText, barcodeFormat]);

  // Clear the inputs back to defaults
  const handleClear = () => {
    setBarcodeText('');
    setBarcodeFormat('CODE128');
  };

  return (
    <div
      style={{
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '2rem',
      }}
    >
      {/* Card Container */}
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '0.5rem',
          width: '90%',
          maxWidth: '400px',
          padding: '2rem',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        {/* Barcode Preview */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <svg ref={svgRef} />
        </div>

        {/* Barcode Text Input */}
        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '.5rem',
              fontWeight: 600,
            }}
          >
            Barcode Text
          </label>
          <input
            type="text"
            value={barcodeText}
            onChange={(e) => setBarcodeText(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Barcode Format Select */}
        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '.5rem',
              fontWeight: 600,
            }}
          >
            Barcode Format
          </label>
          <select
            value={barcodeFormat}
            onChange={(e) => setBarcodeFormat(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              border: '1px solid #ccc',
            }}
          >
            <option value="CODE39">CODE39</option>
            <option value="EAN13">EAN13</option>
            <option value="UPC">UPC</option>
            <option value="EAN8">EAN8</option>
            <option value="CODE128">CODE128</option>
          </select>
        </div>

        {/* Clear Button */}
        <button
          onClick={handleClear}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: '1rem',
          }}
        >
          Clear
        </button>

        {/* Note Section */}
        <div
          style={{
            fontSize: '0.875rem',
            backgroundColor: '#f9f9f9',
            padding: '1rem',
            borderRadius: '0.25rem',
            border: '1px solid #eee',
          }}
        >
          <strong>Note:</strong> Different barcode formats have different
          requirements:
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
            <li>EAN13: Requires exactly 12 or 13 numeric digits</li>
            <li>UPC: Requires exactly 11 or 12 numeric digits</li>
            <li>EAN8: Requires exactly 7 or 8 numeric digits</li>
            <li>CODE39: Alphanumeric characters, spaces, and some special characters</li>
            <li>CODE128: Can encode all ASCII characters</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
