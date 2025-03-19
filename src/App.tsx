import React, { useState, useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';

type FormatOption = 'CODE39' | 'EAN13' | 'UPC' | 'EAN8' | 'CODE128';

const App: React.FC = () => {
  const [barcodeText, setBarcodeText] = useState('12345678');
  const [barcodeFormat, setBarcodeFormat] = useState<FormatOption>('CODE39');

  // We'll generate the barcode into this SVG element
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      try {
        JsBarcode(svgRef.current, barcodeText, {
          format: barcodeFormat,   // E.g., CODE39, EAN13, etc.
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

  // Optional: Provide some info about each format
  const formatRequirements: Record<FormatOption, string> = {
    EAN13: 'Requires exactly 12 or 13 numeric digits',
    UPC: 'Requires exactly 11 or 12 numeric digits',
    EAN8: 'Requires exactly 7 or 8 numeric digits',
    CODE39: 'Alphanumeric, spaces, and some special characters',
    CODE128: 'Can encode all ASCII characters',
  };

  return (
    <div style={{ margin: '2rem', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          width: '600px',
          margin: '0 auto', 
          textAlign: 'center',
          paddingTop: '1rem',
        }}>
        <div >
          {/* The barcode will be generated inside this SVG */}
          <svg ref={svgRef}></svg>
        </div>

        <h1>Sesame</h1>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '.5rem' }}>
            <strong>Barcode Text</strong>
          </label>
          <input
            type="text"
            value={barcodeText}
            onChange={(e) => setBarcodeText(e.target.value)}
            style={{ width: '300px', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '.5rem' }}>
            <strong>Barcode Format</strong>
          </label>
          <select
            value={barcodeFormat}
            onChange={(e) => setBarcodeFormat(e.target.value as FormatOption)}
            style={{ width: '150px', padding: '0.5rem' }}
          >
            <option value="CODE39">CODE39</option>
            <option value="EAN13">EAN13</option>
            <option value="UPC">UPC</option>
            <option value="EAN8">EAN8</option>
            <option value="CODE128">CODE128</option>
          </select>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <p><em>{formatRequirements[barcodeFormat]}</em></p>
        </div>
      </div>
    </div>
  );
};

export default App;
