'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { FiEye, FiEdit, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import 'highlight.js/styles/github.css';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  rows?: number;
}

export function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = "Markdown formatında içerik yazın...",
  label,
  required = false,
  rows = 12
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className={`border border-gray-300 rounded-lg overflow-hidden ${
        isFullscreen ? 'fixed inset-4 z-50 bg-white shadow-2xl' : ''
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-2">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'edit'
                  ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiEdit className="mr-1.5" size={14} />
              Düzenle
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'preview'
                  ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiEye className="mr-1.5" size={14} />
              Önizleme
            </button>
          </div>
          
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            title={isFullscreen ? 'Küçült' : 'Tam Ekran'}
          >
            {isFullscreen ? <FiMinimize2 size={16} /> : <FiMaximize2 size={16} />}
          </button>
        </div>

        {/* Content */}
        <div className={`${isFullscreen ? 'h-[calc(100vh-8rem)]' : ''}`}>
          {activeTab === 'edit' ? (
            <div className="relative">
              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={isFullscreen ? 30 : rows}
                className={`w-full px-4 py-3 border-0 focus:ring-0 focus:outline-none resize-none font-mono text-sm text-black ${
                  isFullscreen ? 'h-full' : ''
                }`}
                required={required}
              />
              
              {/* Markdown Cheat Sheet */}
              <div className="absolute top-2 right-2 opacity-60 hover:opacity-100 transition-opacity">
                <div className="bg-gray-800 text-white text-xs p-2 rounded shadow-lg max-w-xs hidden group-hover:block">
                  <div className="space-y-1">
                    <div><strong># Başlık 1</strong></div>
                    <div><strong>## Başlık 2</strong></div>
                    <div><strong>**kalın**</strong></div>
                    <div><strong>*italik*</strong></div>
                    <div><strong>- Liste</strong></div>
                    <div><strong>[link](url)</strong></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`p-4 bg-white overflow-auto ${
              isFullscreen ? 'h-full' : `max-h-[${rows * 1.5}rem]`
            }`}>
              {value ? (
                <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeRaw]}
                    components={{
                      // Custom components for better styling
                      h1: ({ children }) => (
                        <h1 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                          {children}
                        </h3>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside space-y-1 mb-4">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside space-y-1 mb-4">
                          {children}
                        </ol>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
                          {children}
                        </blockquote>
                      ),
                      code: ({ children, className }) => {
                        const isInline = !className;
                        if (isInline) {
                          return (
                            <code className="bg-gray-100 text-pink-600 px-1 py-0.5 rounded text-sm">
                              {children}
                            </code>
                          );
                        }
                        return (
                          <code className={className}>
                            {children}
                          </code>
                        );
                      },
                      pre: ({ children }) => (
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                          {children}
                        </pre>
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-4">
                          <table className="min-w-full border border-gray-300">
                            {children}
                          </table>
                        </div>
                      ),
                      th: ({ children }) => (
                        <th className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold text-left">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="border border-gray-300 px-4 py-2">
                          {children}
                        </td>
                      ),
                    }}
                  >
                    {value}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="text-gray-400 italic text-center py-8">
                  Önizleme için markdown içerik yazın...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer with tips */}
        {activeTab === 'edit' && (
          <div className="bg-gray-50 border-t border-gray-200 px-4 py-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <span><strong>**kalın**</strong></span>
                <span><strong>*italik*</strong></span>
                <span><strong># Başlık</strong></span>
                <span><strong>- Liste</strong></span>
                <span><strong>[link](url)</strong></span>
              </div>
              <div>
                Markdown desteklenir
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 