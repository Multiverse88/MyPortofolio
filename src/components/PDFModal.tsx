"use client";

import { motion } from "framer-motion";

interface PDFModalProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

const PDFModal: React.FC<PDFModalProps> = ({ pdfUrl, title, onClose }) => {
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
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50 bg-slate-900/90 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-white truncate">{title}</h2>
          <div className="flex items-center space-x-3">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-blue-300 text-sm font-medium transition-all"
            >
              Open in New Tab
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-300 flex items-center justify-center transition-all"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="flex-1 bg-slate-800">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-none"
            title={title}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PDFModal;
