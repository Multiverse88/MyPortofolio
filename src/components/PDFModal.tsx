"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PDFModalProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

const PDFModal: React.FC<PDFModalProps> = ({
  pdfUrl,
  title,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [isRendering, setIsRendering] = useState(false);

  // Load PDF.js dynamically
  useEffect(() => {
    const loadPDF = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Dynamic import of PDF.js
        const pdfjsLib = await import("pdfjs-dist");

        // Set worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

        // Load PDF document
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.3.31/cmaps/",
          cMapPacked: true,
        });

        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setError(
          "Failed to load PDF. Please try downloading or opening in a new tab.",
        );
        setIsLoading(false);
      }
    };

    if (pdfUrl) {
      loadPDF();
    }

    return () => {
      if (pdfDoc) {
        pdfDoc.destroy();
      }
    };
  }, [pdfUrl]);

  // Render current page
  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current || isRendering) return;

      try {
        setIsRendering(true);
        const page = await pdfDoc.getPage(currentPage);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const viewport = page.getViewport({ scale });

        // Set canvas dimensions
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Clear previous content
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Render page
        await page.render({
          canvasContext: ctx,
          viewport: viewport,
        }).promise;

        setIsRendering(false);
      } catch (err) {
        console.error("Error rendering page:", err);
        setError("Failed to render PDF page");
        setIsRendering(false);
      }
    };

    renderPage();
  }, [pdfDoc, currentPage, scale, isRendering]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3.0));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewInNewTab = () => {
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-slate-900 rounded-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col overflow-hidden border border-cyan-500/20 shadow-xl shadow-cyan-500/10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50 bg-slate-900/90 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <motion.div
              className="w-3 h-3 bg-cyan-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <h2 className="text-xl font-bold text-white truncate max-w-md">
              {title}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            {/* Page Navigation */}
            {!isLoading && !error && totalPages > 0 && (
              <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg px-3 py-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage <= 1}
                  className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
                <span className="text-sm text-gray-300 px-2">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages}
                  className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
            )}

            {/* Zoom Controls */}
            {!isLoading && !error && (
              <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg px-3 py-2">
                <button
                  onClick={handleZoomOut}
                  disabled={scale <= 0.5}
                  className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
                <span className="text-sm text-gray-300 px-2">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={scale >= 3.0}
                  className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* Download Button */}
            <motion.button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-lg text-green-300 text-sm font-medium transition-all duration-200 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Download</span>
            </motion.button>

            {/* New Tab Button */}
            <motion.button
              onClick={handleViewInNewTab}
              className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-blue-300 text-sm font-medium transition-all duration-200 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span>New Tab</span>
            </motion.button>

            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-300 flex items-center justify-center transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative overflow-hidden bg-slate-800">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full mx-auto mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="text-cyan-300 text-lg font-medium">
                  Loading PDF...
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Please wait while we prepare your document
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md p-8">
                <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
                  <svg
                    className="w-10 h-10 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-300 mb-3">
                  PDF Load Failed
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{error}</p>

                <div className="space-y-3">
                  <motion.button
                    onClick={handleDownload}
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      className="w-5 h-5"
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
                    <span>Download PDF</span>
                  </motion.button>

                  <motion.button
                    onClick={handleViewInNewTab}
                    className="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-gray-300 font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    <span>Open in New Tab</span>
                  </motion.button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full overflow-auto p-4">
              <div className="relative">
                {isRendering && (
                  <div className="absolute inset-0 bg-slate-800/50 backdrop-blur-sm flex items-center justify-center z-10">
                    <motion.div
                      className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                )}
                <canvas
                  ref={canvasRef}
                  className="max-w-full max-h-full shadow-lg shadow-black/20 rounded-lg bg-white"
                  style={{
                    filter: isRendering ? "blur(1px)" : "none",
                    transition: "filter 0.2s ease-in-out",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer with additional controls */}
        {!isLoading && !error && (
          <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <span>Use mouse wheel or zoom controls to adjust size</span>
              <span>•</span>
              <span>Navigate with arrow buttons or keyboard</span>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PDFModal;
