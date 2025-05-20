import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  FileText,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  Code,
  ArrowRight,
  ExternalLink,
  Search,
  RefreshCw,
  Check,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import logo from "../assets/cwl.png";

import {
  parseReviewContent,
  formatContent,
  getFileExtension,
  getUniqueFileTypes,
  filterReviews,
  exportToPDF,
  getSeverityColor,
  formatSectionTitle,
} from "../utils/codeReviewUtils.js";

const CodeReviewResponse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const review = location.state?.review;
  const [formattedReviews, setFormattedReviews] = useState([]);
  const [expandedFile, setExpandedFile] = useState(null);
  const [activeSections, setActiveSections] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [filterActive, setFilterActive] = useState("all");
  const [copySuccess, setCopySuccess] = useState(null);

  // Determine if we have a valid review to display
  const hasReview = review?.reviews && review.reviews.length > 0;

  useEffect(() => {
    if (hasReview) {
      const processed = review.reviews.map((item, index) => {
        // Parse review content into structured sections
        const { sections, codeSnippets } = parseReviewContent(item.review);
        return {
          id: index,
          fileName: item.fileName,
          sections: sections,
          codeSnippets: codeSnippets,
          fileType: getFileExtension(item.fileName),
          expanded: index === 0, // Expand first file by default
        };
      });
      setFormattedReviews(processed);
      setExpandedFile(0); // Set first file as expanded by default

      // Initialize active sections
      const initialSections = {};
      processed.forEach((file) => {
        Object.keys(file.sections).forEach((section) => {
          initialSections[`${file.id}-${section}`] = true;
        });
      });
      setActiveSections(initialSections);
    }
  }, [review]);

  const toggleFile = (fileId) => {
    setExpandedFile(expandedFile === fileId ? null : fileId);
  };

  const toggleSection = (fileId, sectionName) => {
    const key = `${fileId}-${sectionName}`;
    setActiveSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isSectionActive = (fileId, sectionName) => {
    const key = `${fileId}-${sectionName}`;
    return activeSections[key] !== false; // Default to true if not set
  };

  const getSectionIcon = (sectionName) => {
    switch (sectionName) {
      case "strengths":
        return <CheckCircle className="size-4 mr-2 text-green-500" />;
      case "weaknesses":
        return <AlertCircle className="size-4 mr-2 text-yellow-500" />;
      case "recommendations":
        return <ExternalLink className="size-4 mr-2 text-blue-500" />;
      case "code":
        return <Code className="size-4 mr-2 text-indigo-500" />;
      default:
        return <FileText className="size-4 mr-2 text-gray-500" />;
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess(id);
        setTimeout(() => setCopySuccess(null), 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const goBack = () => {
    navigate("/home");
  };

  const handleExportPDF = () => {
    exportToPDF(setIsExporting);
  };

  const filterByType = (type) => {
    setFilterActive(type);
  };

  // Get filtered reviews based on current filters
  const filteredReviews = filterReviews(
    formattedReviews,
    filterActive,
    searchQuery
  );

  // Get unique file types for filtering
  const fileTypes = getUniqueFileTypes(formattedReviews);

  const renderFormattedContent = (formattedItems) => {
    if (!formattedItems) return null;

    return formattedItems.map((item, i) => {
      if (item.type === "list") {
        return (
          <ul key={i} className="list-disc pl-5 space-y-2 mb-4">
            {item.items.map((bullet, j) => (
              <li key={j} className="text-gray-700">
                {bullet}
              </li>
            ))}
          </ul>
        );
      } else {
        return (
          <p key={i} className="mb-4 text-gray-700">
            {item.content}
          </p>
        );
      }
    });
  };

  const renderCodeSnippet = (snippet) => {
    if (snippet.type === "diff") {
      return (
        <div className="mt-4 mb-6">
          <div className="bg-gray-50 border rounded-md p-4 mb-2">
            <div className="text-sm text-gray-500 mb-2">Original Code:</div>
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              customStyle={{ borderRadius: "0.375rem" }}
              showLineNumbers
            >
              {snippet.before}
            </SyntaxHighlighter>
          </div>

          <div className="flex justify-center my-2">
            <ArrowRight className="text-gray-500" />
          </div>

          <div className="bg-gray-50 border rounded-md p-4">
            <div className="text-sm text-gray-500 mb-2">Suggested Code:</div>
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              customStyle={{ borderRadius: "0.375rem" }}
              showLineNumbers
            >
              {snippet.after}
            </SyntaxHighlighter>
          </div>
        </div>
      );
    }

    return (
      <div className="my-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{snippet.title}</span>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none flex items-center text-xs"
            onClick={() => copyToClipboard(snippet.code, snippet.id)}
          >
            {copySuccess === snippet.id ? (
              <>
                <Check className="size-3 mr-1 text-green-500" /> Copied
              </>
            ) : (
              <>
                <Copy className="size-3 mr-1" /> Copy
              </>
            )}
          </button>
        </div>
        <SyntaxHighlighter
          language={snippet.language || "javascript"}
          style={vscDarkPlus}
          customStyle={{ borderRadius: "0.375rem" }}
          showLineNumbers
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white" id="printable-content">
      {/* Header with Logo and Export PDF Button */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <img src={logo} alt="Logo" className="h-6" />
          <button
            onClick={handleExportPDF}
            disabled={isExporting || !hasReview}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-normal rounded-md shadow-sm
              ${
                isExporting || !hasReview
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
          >
            {isExporting ? (
              <RefreshCw className="size-4 mr-2 animate-spin" />
            ) : (
              <Download className="size-4 mr-2" />
            )}
            Export PDF
          </button>
        </div>
      </header>

      {/* Navigation and Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
        <button
          onClick={goBack}
          className="inline-flex items-center text-gray-900 hover:text-gray-950"
        >
          <ChevronLeft className="size-5 mr-1" />
          <span className="font-normal text-gray-950">Go Back</span>
        </button>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search reviews..."
            className="pl-8 pr-4 py-2 border rounded-md text-sm focus:ring-black focus:border-black w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-2 top-2.5 size-4 text-gray-400" />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-xl font-semibold text-gray-900 py-4">
          Code Review Summary
        </h1>

        {/* File Type Filters */}
        {hasReview && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Filter by file type:
              </span>
              <button
                onClick={() => filterByType("all")}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  filterActive === "all"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                All Files
              </button>
              {fileTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => filterByType(type)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    filterActive === type
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Review Content */}
        {hasReview && filteredReviews.length > 0 ? (
          <div className="space-y-6">
            {filteredReviews.map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden pdf-section"
                data-filename={file.fileName}
              >
                <div
                  className={`px-6 py-5 border-b cursor-pointer hover:bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 ${
                    expandedFile === file.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => toggleFile(file.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="size-10 rounded-md flex items-center justify-center bg-black text-white font-medium">
                        {file.fileType}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-medium text-gray-900 truncate">
                        {file.fileName}
                      </h2>
                      <div className="flex flex-wrap mt-1 gap-2">
                        {Object.keys(file.sections).length > 0 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {Object.keys(file.sections).length} sections
                          </span>
                        )}
                        {file.codeSnippets.length > 0 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                            {file.codeSnippets.length} code suggestions
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {expandedFile === file.id ? (
                      <ChevronUp className="size-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="size-5 text-gray-500" />
                    )}
                  </div>
                </div>

                {expandedFile === file.id && (
                  <div className="px-4 py-5 sm:p-6 space-y-6">
                    {/* Regular review sections */}
                    {Object.keys(file.sections).map((section) => (
                      <div key={section} className="rounded-md border">
                        <div
                          className={`flex items-center px-4 py-3 rounded-t-md cursor-pointer ${getSeverityColor(
                            section
                          )}`}
                          onClick={() => toggleSection(file.id, section)}
                        >
                          {getSectionIcon(section)}
                          <h3 className="text-md font-medium">
                            {formatSectionTitle(section)}
                          </h3>
                          <div className="ml-auto">
                            {isSectionActive(file.id, section) ? (
                              <ChevronUp className="size-4" />
                            ) : (
                              <ChevronDown className="size-4" />
                            )}
                          </div>
                        </div>

                        {isSectionActive(file.id, section) && (
                          <div className="px-4 py-3 bg-white rounded-b-md">
                            <div className="prose max-w-none">
                              {renderFormattedContent(
                                formatContent(file.sections[section])
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Code suggestions section */}
                    {file.codeSnippets.length > 0 && (
                      <div className="rounded-md border">
                        <div
                          className={`flex items-center px-4 py-3 rounded-t-md cursor-pointer ${getSeverityColor(
                            "code"
                          )}`}
                          onClick={() => toggleSection(file.id, "code")}
                        >
                          {getSectionIcon("code")}
                          <h3 className="text-md font-medium">
                            Code Suggestions
                          </h3>
                          <div className="ml-auto">
                            {isSectionActive(file.id, "code") ? (
                              <ChevronUp className="size-4" />
                            ) : (
                              <ChevronDown className="size-4" />
                            )}
                          </div>
                        </div>

                        {isSectionActive(file.id, "code") && (
                          <div className="px-4 py-3 bg-white rounded-b-md">
                            {file.codeSnippets.map((snippet, index) => (
                              <div key={index} className="mb-6 last:mb-0">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">
                                  {snippet.title || "Code Suggestion"}
                                </h4>
                                {renderCodeSnippet({
                                  ...snippet,
                                  id: `${file.id}-snippet-${index}`,
                                })}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
            {!hasReview ? (
              <>
                <FileText className="mx-auto size-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No review data available
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  There are no code reviews for this repository commit.
                </p>
              </>
            ) : (
              <>
                <Search className="mx-auto size-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No matching results
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CodeReviewResponse;
