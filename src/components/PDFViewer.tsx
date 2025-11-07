"use client";

import { useState, useEffect } from "react";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";

interface PDFViewerProps {
  pdfUrl: string;
  className?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, className = "" }) => {
  const { isMobile, isLowEndDevice, connectionSpeed } =
    usePerformanceOptimization();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(isMobile ? 0.8 : 1.2);

  // Dynamically import PDF.js only when needed
  useEffect(() => {
    let mounted = true;

    const loadPDF = async () => {
      try {
        setIsLoading(true);

        // Check if we're in browser environment
        if (typeof window === "undefined") {
          setError("PDF viewer not available on server side.");
          setIsLoading(false);
          return;
        }

        // Dynamic import of PDF.js
        const pdfjsLib = await import("pdfjs-dist");

        // Set worker path
        if (pdfjsLib.GlobalWorkerOptions) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
        }

        // Load PDF document
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          // Optimize for mobile
          cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/",
          cMapPacked: true,
          // Disable streaming for better mobile performance
          disableStream: isMobile || isLowEndDevice,
          // Reduce worker memory usage
          maxImageSize: isLowEndDevice ? 1024 * 1024 : 4096 * 4096,
        });

        const pdf = await loadingTask.promise;

        if (mounted) {
          setPdfDoc(pdf);
          setTotalPages(pdf.numPages);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error loading PDF:", err);
        if (mounted) {
          setError("Failed to load PDF. Please try again.");
          setIsLoading(false);
        }
      }
    };

    loadPDF();

    return () => {
      mounted = false;
    };
  }, [pdfUrl, isMobile, isLowEndDevice]);

  // Render PDF page
  const renderPage = async (pageNum: number, canvas: HTMLCanvasElement) => {
    if (!pdfDoc) return;

    try {
      const page = await pdfDoc.getPage(pageNum);
      const context = canvas.getContext("2d");

      // Calculate scale for mobile optimization
      const viewport = page.getViewport({ scale: 1 });
      const canvasScale = Math.min(
        (canvas.parentElement?.clientWidth || 800) / viewport.width,
        scale,
      );

      const scaledViewport = page.getViewport({ scale: canvasScale });

      // Set canvas dimensions
      canvas.height = scaledViewport.height;
      canvas.width = scaledViewport.width;

      // Render page
      const renderContext = {
        canvasContext: context!,
        viewport: scaledViewport,
        // Optimize rendering for mobile
        renderInteractiveForms: !isMobile,
      };

      await page.render(renderContext).promise;
    } catch (err) {
      console.error("Error rendering page:", err);
      setError("Failed to render PDF page.");
    }
  };

  // Handle page navigation
  const goToPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  // Handle zoom
  const handleZoom = (newScale: number) => {
    setScale(Math.max(0.5, Math.min(3, newScale)));
  };

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center h-96 bg-gray-100 rounded-lg ${className}`}
      >
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading PDF...</p>
          <p className="text-sm text-gray-500 mt-2">
            {connectionSpeed === "slow"
              ? "This may take a while on slow connections"
              : "Please wait"}
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className={`flex items-center justify-center h-96 bg-red-50 rounded-lg border border-red-200 ${className}`}
      >
        <div className="text-center">
          <svg
            className="w-12 h-12 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Fallback for devices that can't handle PDF.js
  if (isLowEndDevice && connectionSpeed === "slow") {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`}>
        <svg
          className="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          PDF Certificate
        </h3>
        <p className="text-gray-600 mb-4">
          PDF viewer is not available on your device for optimal performance.
        </p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download PDF
        </a>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg overflow-hidden ${className}`}>
      {/* PDF Controls */}
      <div className="bg-gray-100 p-4 flex items-center justify-between border-b">
        <div className="flex items-center space-x-4">
          {/* Page Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <span className="text-sm font-medium">
              {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Zoom Controls - Desktop only */}
          {!isMobile && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleZoom(scale - 0.2)}
                className="p-2 rounded hover:bg-gray-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>

              <span className="text-sm font-medium min-w-[60px] text-center">
                {Math.round(scale * 100)}%
              </span>

              <button
                onClick={() => handleZoom(scale + 0.2)}
                className="p-2 rounded hover:bg-gray-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Download Button */}
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download
        </a>
      </div>

      {/* PDF Canvas */}
      <div className="p-4 bg-gray-50 flex justify-center min-h-[400px]">
        <div className="bg-white shadow-lg">
          <canvas
            ref={(canvas) => {
              if (canvas && pdfDoc) {
                renderPage(currentPage, canvas);
              }
            }}
            className="max-w-full h-auto"
          />
        </div>
      </div>

      {/* Mobile Page Indicator */}
      {isMobile && totalPages > 1 && (
        <div className="bg-gray-100 p-2">
          <div className="flex justify-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                className={`w-3 h-3 rounded-full ${
                  currentPage === i + 1 ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
