'use client';

import React, { useState } from 'react';
import WorkspaceShell from '@/components/layout/WorkspaceShell';
import { useAcademic } from '@/lib/store/academicContext';
import {
  FolderArchive,
  Upload,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  Sparkles,
  ExternalLink,
  Search,
  Filter,
  Plus
} from 'lucide-react';

export default function LibraryPage() {
  const {
    materials,
    addMaterial,
    deleteMaterial,
    courses,
    selectedCourseId,
    setSelectedCourseId
  } = useAcademic();

  const [activeFilter, setActiveFilter] = useState<'all' | 'pdf' | 'docx' | 'image' | 'notes'>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<any | null>(null);

  // New Upload Form State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadType, setUploadType] = useState<'pdf' | 'docx' | 'image' | 'notes'>('pdf');
  const [uploadCourseId, setUploadCourseId] = useState(selectedCourseId);
  const [rawText, setRawText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      addMaterial({
        courseId: uploadCourseId,
        topicIds: ['topic-etc-chemiosmosis'],
        title: uploadTitle.endsWith(`.${uploadType}`) ? uploadTitle : `${uploadTitle}.${uploadType}`,
        fileType: uploadType,
        sourceType: 'student_upload',
        fileSizeBytes: 1250000,
        pageCount: 3,
        extractedTopics: ['Extracted Concept A', 'Teacher Emphasis Formula'],
        summary: 'Multimodal AI extracted key vocabulary and definitions from uploaded document.',
        extractedText:
          rawText ||
          `[AI Document Ingestion Pipeline]\nExtracted text from "${uploadTitle}":\nSection 1: Foundations of the active topic.\nSection 2: Formula derivations and test review notes.\nAccuracy validated against teacher curriculum.`,
        ocrConfidence: uploadType === 'image' ? 98 : undefined,
        isTeacherProvided: false
      });
      setIsProcessing(false);
      setShowUploadModal(false);
      setUploadTitle('');
      setRawText('');
    }, 700);
  };

  const filteredMaterials = materials.filter((m) => {
    const matchesCourse = m.courseId === selectedCourseId;
    const matchesType = activeFilter === 'all' || m.fileType === activeFilter;
    const matchesSearch =
      m.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCourse && matchesType && matchesSearch;
  });

  return (
    <WorkspaceShell>
      <div className="space-y-6">
        {/* Header with Upload Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <FolderArchive className="h-4 w-4 text-emerald-700" />
              <span>Grounded Knowledge Corpus</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Course Materials & OCR Ingestion Library
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Upload lecture slides, homework worksheets, or photos of your handwritten notes to ground all AI tutoring and quizzes.
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center space-x-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors"
          >
            <Upload className="h-4 w-4 text-amber-400" />
            <span>Upload Document / Notes</span>
          </button>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
            {(['all', 'pdf', 'docx', 'image', 'notes'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors shrink-0 ${
                  activeFilter === type
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-white border border-stone-200 text-slate-700 hover:bg-stone-50'
                }`}
              >
                {type === 'all' ? 'All Files' : type.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search extracted text..."
              className="w-full rounded-lg border border-stone-300 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <Search className="absolute left-2.5 top-2.2 h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaterials.map((mat) => (
            <div
              key={mat.id}
              className="academic-card p-4 flex flex-col justify-between hover:border-slate-400 transition-all"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      mat.fileType === 'pdf'
                        ? 'bg-rose-50 text-rose-800 border border-rose-200'
                        : mat.fileType === 'image'
                        ? 'bg-purple-50 text-purple-800 border border-purple-200'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}
                  >
                    {mat.fileType}
                  </span>

                  {mat.ocrConfidence && (
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      OCR {mat.ocrConfidence}%
                    </span>
                  )}
                  {mat.isTeacherProvided && (
                    <span className="text-[10px] font-semibold text-slate-600 bg-stone-100 px-2 py-0.5 rounded">
                      Teacher Provided
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-sm font-bold text-slate-900 mt-2.5 truncate" title={mat.title}>
                  {mat.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {mat.summary}
                </p>

                {mat.extractedTopics.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {mat.extractedTopics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-stone-100 text-slate-700 px-1.5 py-0.2 rounded font-medium truncate max-w-[140px]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500">{mat.uploadedAt}</span>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => setSelectedMaterial(mat)}
                    className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-stone-100 rounded transition-colors"
                    title="Inspect Extracted Text"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteMaterial(mat.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                    title="Delete Material"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: View Extracted Text & Grounded Citations */}
        {selectedMaterial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
            <div className="academic-card max-w-2xl w-full p-6 max-h-[85vh] flex flex-col justify-between shadow-elevated">
              <div className="overflow-y-auto pr-1">
                <div className="flex items-start justify-between border-b border-stone-200 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      Extracted Grounding Context
                    </span>
                    <h3 className="font-serif text-lg font-bold text-slate-900 mt-1">
                      {selectedMaterial.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedMaterial(null)}
                    className="text-slate-400 hover:text-slate-700 text-sm font-semibold p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      AI Material Summary:
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {selectedMaterial.summary}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Extracted Text Content (Used for RAG & Tutoring):
                    </div>
                    <div className="mt-1 font-mono text-xs text-slate-800 bg-stone-50 p-3.5 rounded-lg border border-stone-200 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                      {selectedMaterial.extractedText}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end">
                <button
                  onClick={() => setSelectedMaterial(null)}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Upload New Material / Notes / OCR */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
            <div className="academic-card max-w-lg w-full p-6 shadow-elevated">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center space-x-2">
                  <Upload className="h-5 w-5 text-blue-700" />
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    Ingest Academic Material
                  </h3>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-semibold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSimulatedUpload} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Document or Handout Title
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g. Unit 3 Review Packet or Whiteboard Photo"
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Course
                    </label>
                    <select
                      value={uploadCourseId}
                      onChange={(e) => setUploadCourseId(e.target.value)}
                      className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs text-slate-900 bg-white"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Material Format
                    </label>
                    <select
                      value={uploadType}
                      onChange={(e) => setUploadType(e.target.value as any)}
                      className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs text-slate-900 bg-white"
                    >
                      <option value="pdf">PDF Document (.pdf)</option>
                      <option value="docx">Word Document (.docx)</option>
                      <option value="image">Screenshot / Photo (OCR)</option>
                      <option value="notes">Typed Notes (.txt)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Text / Notes Content (Optional Manual Paste)
                  </label>
                  <textarea
                    rows={4}
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Paste lecture notes or problem set text here, or leave blank to simulate automated OCR parsing..."
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono"
                  />
                </div>

                <div className="rounded-lg bg-stone-50 border border-stone-200 p-3 text-[11px] text-slate-600 space-y-1">
                  <div className="flex items-center space-x-1.5 font-semibold text-slate-800">
                    <Sparkles className="h-3.5 w-3.5 text-blue-700" />
                    <span>Multimodal Ingestion Pipeline:</span>
                  </div>
                  <div>• Extracts text, definitions, and equations automatically.</div>
                  <div>• Performs OCR for handwritten whiteboard or notebook screenshots.</div>
                  <div>• Links to course topics for grounded study guides and tutoring.</div>
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="rounded-lg border border-stone-300 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing OCR...' : 'Process & Ingest'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </WorkspaceShell>
  );
}
