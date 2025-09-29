import React, { useState, useCallback, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./ProtectedPDFViewer.scss";
// import "../../../public/pdf.worker.min.mjs"

// ✅ правильне підключення pdf.worker для Vite

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url
// ).toString();

// import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
// import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?worker";
// pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
const usePDFWorker = () => {
  useEffect(() => {
    console.log(import.meta.env);
    
    // Для разработки используем один способ, для продакшена - другой
    if (import.meta.env.PROD) {
      console.log("PROD mode - using CDN for pdf.worker");
      console.log("pdfjs.version:", pdfjs.version);
      
      // Продакшен: используем CDN
      pdfjs.GlobalWorkerOptions.workerSrc = 
        `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    } else {
      // Разработка: пытаемся использовать локальный worker
      try {
        console.log("DEV mode - using local pdf.worker");
        
        pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
      } catch (error) {
        console.log("Error loading local pdf.worker, falling back to CDN:", error);
        
        // Fallback на CDN
        pdfjs.GlobalWorkerOptions.workerSrc = 
          `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
      }
    }
  }, []);
};

const ProtectedPDFViewer = ({ filePath, fileName }) => {
  const [numPages, setNumPages] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scale, setScale] = useState(1.0);
  const wrapperRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(null);

  usePDFWorker();

  useEffect(() => {
    setScale(1.0);
  }, [isExpanded]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  function onDocumentLoadError(error) {
    console.error("Error loading PDF:", error);
    setIsLoading(false);
  }

  const handleToggle = () => {
    if (!isExpanded) {
      setIsLoading(true);
    }
    setIsExpanded(!isExpanded);
  };

  const preventDefault = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, []);

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    return false;
  }, []);

  const handleSelectStart = useCallback((e) => {
    e.preventDefault();
    return false;
  }, []);

  const handleDragStart = useCallback((e) => {
    e.preventDefault();
    return false;
  }, []);

  // const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3.0));
  // const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        setContainerWidth(wrapperRef.current.getBoundingClientRect().width);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    console.log("containerWidth!!!!", containerWidth);

    return () => window.removeEventListener("resize", handleResize);
  });

  console.log("containerWidth", containerWidth);
  console.log("scale", scale);

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= numPages; i++) {
      pages.push(
        <div key={i} className="pdf-page-container">
          <div className="page-number">
            Сторінка {i} з {numPages}
          </div>
          <Page
            pageNumber={i}
            // scale={scale}
            width={containerWidth ? Math.min(containerWidth, 842) : undefined}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading={
              <div className="pdf-page-loading">
                Завантаження сторінки {i}...
              </div>
            }
          />
        </div>
      );
    }
    return pages;
  };

  return (
    <div className="pdf-container">
      <button
        className="pdf-toggle-button"
        onClick={handleToggle}
        disabled={isLoading}
      >
        <span className="button-content">
          {fileName}
          {isLoading ? " ⏳" : isExpanded ? " ▲" : " ▼"}
        </span>
      </button>

      {isExpanded && (
        <div
          className="pdf-viewer"
          onContextMenu={handleContextMenu}
          onSelectStart={handleSelectStart}
          onDragStart={handleDragStart}
        >
          {isLoading && (
            <div className="pdf-loading-overlay">
              <div className="loading-spinner"></div>
              Завантаження звіту...
            </div>
          )}

          {/* <div className="pdf-controls">
            <div className="pdf-info">
              <span className="total-pages">Всього сторінок: {numPages || '--'}</span>
            </div>

            <div className="pdf-zoom-controls">
              <button onClick={zoomOut} title="Зменшити" className="zoom-button">-</button>
              <span className="zoom-level">{(scale * 100).toFixed(0)}%</span>
              <button onClick={zoomIn} title="Збільшити" className="zoom-button">+</button>
            </div>
          </div> */}

          <div
            className="pdf-document-wrapper"
            ref={wrapperRef}
            onContextMenu={handleContextMenu}
            onCopy={preventDefault}
            onCut={preventDefault}
            onPaste={preventDefault}
          >
            <Document
              file={filePath}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="pdf-loading">Завантаження документа...</div>
              }
              error={
                <div className="pdf-error">Помилка завантаження документа</div>
              }
            >
              {numPages && renderPages()}
            </Document>

            {/* <div className="pdf-watermark">
              ТІЛЬКИ ДЛЯ ПЕРЕГЛЯДУ
            </div> */}
          </div>

          {/* <div className="pdf-protection-note">
            ⚠️ Захищено від копіювання, скачування та друку
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ProtectedPDFViewer;
