import { useState, Suspense, useRef, useCallback, useEffect } from "react";
import useResizeObserver, { ResizeObserverCallback } from "../hooks/useResizeObserver";
import { Document, Page, pdfjs } from 'react-pdf';
import { ZoomInIcon, ZoomOutIcon, OpenInNewWindowIcon } from '@radix-ui/react-icons'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export function Resume() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(0.95); // Initial scale is 0.95
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const maxWidth = 800;


  const onResize = useCallback<ResizeObserverCallback>((entry: ResizeObserverEntry) => {
    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.05, 1.3))
  }

  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.05, 0.9))
  }

  const handleOpen = () => {
    window.open('/Kyle_Qin_Resume.pdf')
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  useResizeObserver(containerRef, onResize);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "+") {
        handleZoomIn; 
      } else if (event.key === "-") {
        handleZoomOut; 
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <Suspense>
      <div className="section-content" ref={containerRef}>
          {/* Zoom Controls */}
        <span className="zoom-control">
            <button onClick={handleZoomIn}>
              <ZoomInIcon />
            </button>
            <button onClick={handleZoomOut}>
              <ZoomOutIcon />
            </button>
            <button onClick={handleOpen}>
              <OpenInNewWindowIcon />
            </button>
            <div>{Math.round(scale * 100)}%</div>
        </span>
        <Document
          className="pdf-container"
          file="Kyle_Qin_Resume.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            pageNumber={pageNumber}
            width={(containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth) * scale}
            scale={scale} 
            className="pdf-page"
          />
        </Document>
      </div>
    </Suspense>
  )
}

export default Resume;
