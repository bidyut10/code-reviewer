import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import * as _ from "lodash";

const CodeReviewResponse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const review = location.state?.review;
  const [formattedReviews, setFormattedReviews] = useState([]);
  const [expandedFile, setExpandedFile] = useState(null);
  const [activeSections, setActiveSections] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const contentRef = useRef(null);
  const [filterActive, setFilterActive] = useState("all");

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

  const parseReviewContent = (content) => {
    // Enhanced parsing to identify sections and code snippets
    const sections = {};
    const codeSnippets = [];

    // Extract overview section
    const overviewMatch = content.match(
      /^(.*?)(?=Positive Aspects:|Strengths:|Weaknesses:|Areas for Improvement|$)/s
    );
    if (overviewMatch) {
      sections.overview = overviewMatch[0].trim();
    }

    // Extract positive aspects/strengths
    const strengthsMatch = content.match(
      /(?:Positive Aspects:|Strengths:)(.*?)(?=Weaknesses:|Areas for Improvement|Recommendations:|$)/s
    );
    if (strengthsMatch) {
      sections.strengths = strengthsMatch[1].trim();
    }

    // Extract weaknesses/areas for improvement
    const weaknessesMatch = content.match(
      /(?:Weaknesses:|Areas for Improvement:)(.*?)(?=Recommendations:|Further Recommendations:|$)/s
    );
    if (weaknessesMatch) {
      sections.weaknesses = weaknessesMatch[1].trim();
    }

    // Extract recommendations
    const recommendationsMatch = content.match(
      /(?:Recommendations:|Further Recommendations:)(.*?)$/s
    );
    if (recommendationsMatch) {
      sections.recommendations = recommendationsMatch[1].trim();
    }

    // If no sections were identified, put everything in overview
    if (Object.keys(sections).length === 0) {
      sections.overview = content.trim();
    }

    // Find code snippets or suggestions in the content
    // Looking for code blocks that might be wrapped in ```
    const codeBlockRegex =
      /```(?:jsx|js|ts|typescript|javascript|html|css|java|python|ruby|go|rust|cpp|csharp|c\+\+|c#|php|swift|kotlin|scala|shell|bash|sql)?\s*([\s\S]*?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      codeSnippets.push({
        code: match[1].trim(),
        language: match[0].match(/```(\w+)/)?.[1] || "javascript",
        title: getCodeSnippetTitle(content, match.index),
      });
    }

    // Also look for code suggestions that might be indented
    const indentedCodeRegex =
      /(?:^|\n)( {4}|\t)(.+)(?:\n(?:(?! {0,3}\S)(?:.|\n))*)/gm;
    while ((match = indentedCodeRegex.exec(content)) !== null) {
      if (match[0].trim().split("\n").length > 2) {
        // Only consider blocks with multiple lines
        codeSnippets.push({
          code: match[0].replace(/^( {4}|\t)/gm, "").trim(),
          language: "javascript", // Default to JS for indented blocks
          title: getCodeSnippetTitle(content, match.index),
        });
      }
    }

    // Look for suggested changes with "Before" and "After" patterns
    const beforeAfterRegex =
      /(?:Before|Original):([\s\S]*?)(?:After|Improved|Suggested):([\s\S]*?)(?=\n\n|$)/g;
    while ((match = beforeAfterRegex.exec(content)) !== null) {
      codeSnippets.push({
        type: "diff",
        before: match[1].trim(),
        after: match[2].trim(),
        title: "Suggested Code Change",
      });
    }

    return { sections, codeSnippets };
  };

  const getCodeSnippetTitle = (content, position) => {
    // Try to extract a title for the code snippet by looking at text before it
    const precedingText = content.substring(0, position);
    const lastParagraph = precedingText.split("\n\n").pop() || "";
    const possibleTitle = lastParagraph.split("\n").pop() || "";

    if (
      (possibleTitle.length < 100 && possibleTitle.includes("example")) ||
      possibleTitle.includes("suggest") ||
      possibleTitle.includes("change")
    ) {
      return possibleTitle.trim();
    }

    return "Code Suggestion";
  };

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

  const getSeverityColor = (sectionName) => {
    switch (sectionName) {
      case "strengths":
        return "bg-green-100 text-green-800 border-green-200";
      case "weaknesses":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "recommendations":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "code":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
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
        return <Code className="size-4 mr-2 text-purple-500" />;
      default:
        return <FileText className="size-4 mr-2 text-gray-500" />;
    }
  };

  const formatSectionTitle = (section) => {
    switch (section) {
      case "strengths":
        return "Strengths";
      case "weaknesses":
        return "Areas for Improvement";
      case "recommendations":
        return "Recommendations";
      case "overview":
        return "Overview";
      case "code":
        return "Code Suggestions";
      default:
        return section.charAt(0).toUpperCase() + section.slice(1);
    }
  };

  // Function to format the content with bullet points and paragraphs
  const formatContent = (content) => {
    if (!content) return null;

    // Clean up the content
    content = content
      .replace(/^\s*[•-]\s*/gm, "• ") // Standardize bullet points
      .replace(/\n{3,}/g, "\n\n"); // Remove excessive line breaks

    const paragraphs = content.split("\n\n");

    return paragraphs.map((paragraph, i) => {
      // Check if paragraph is a bullet list
      if (paragraph.includes("• ")) {
        const bullets = paragraph.split("• ").filter(Boolean);
        return (
          <ul key={i} className="list-disc pl-5 space-y-1 mb-4">
            {bullets.map((bullet, j) => (
              <li key={j} className="text-gray-700">
                {bullet.trim()}
              </li>
            ))}
          </ul>
        );
      }

      // For regular paragraphs
      return (
        <p key={i} className="mb-4 text-gray-700">
          {paragraph}
        </p>
      );
    });
  };

  // For highlighting code samples
  const highlightCode = (code, language) => {
    // This is a simple approach to highlight JavaScript code
    // In a production app, you'd use a proper syntax highlighter like Prism or highlight.js
    if (!code) return null;

    const keywords = [
      "function",
      "const",
      "let",
      "var",
      "return",
      "if",
      "else",
      "for",
      "while",
      "import",
      "export",
      "class",
      "try",
      "catch",
      "async",
      "await",
    ];
    const operators = [
      "=>",
      "===",
      "==",
      "=",
      "+",
      "-",
      "*",
      "/",
      "&&",
      "||",
      "!",
    ];
    const punctuation = ["{", "}", "(", ")", "[", "]", ";", ",", "."];

    // Split by spaces but preserve spaces
    const words = code.split(/(\s+)/);

    return words.map((word, index) => {
      if (keywords.includes(word)) {
        return (
          <span key={index} className="text-purple-600 font-medium">
            {word}
          </span>
        );
      } else if (operators.includes(word)) {
        return (
          <span key={index} className="text-red-500">
            {word}
          </span>
        );
      } else if (punctuation.includes(word)) {
        return (
          <span key={index} className="text-gray-500">
            {word}
          </span>
        );
      } else if (word.trim().startsWith("//") || word.trim().startsWith("/*")) {
        return (
          <span key={index} className="text-green-600 italic">
            {word}
          </span>
        );
      } else if (/^["'`].*["'`]$/.test(word)) {
        return (
          <span key={index} className="text-yellow-600">
            {word}
          </span>
        );
      } else if (/^\d+$/.test(word)) {
        return (
          <span key={index} className="text-blue-600">
            {word}
          </span>
        );
      } else if (word.match(/\s+/)) {
        return <span key={index}>{word}</span>;
      } else {
        return (
          <span key={index} className="text-gray-700">
            {word}
          </span>
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
            <pre className="bg-gray-800 text-gray-200 p-3 rounded overflow-x-auto text-sm">
              {highlightCode(snippet.before, "javascript")}
            </pre>
          </div>

          <div className="flex justify-center my-2">
            <ArrowRight className="text-gray-500" />
          </div>

          <div className="bg-gray-50 border rounded-md p-4">
            <div className="text-sm text-gray-500 mb-2">Suggested Code:</div>
            <pre className="bg-gray-800 text-gray-200 p-3 rounded overflow-x-auto text-sm">
              {highlightCode(snippet.after, "javascript")}
            </pre>
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
            onClick={() => copyToClipboard(snippet.code)}
          >
            <Copy className="size-3 mr-1" /> Copy
          </button>
        </div>
        <pre className="bg-gray-800 text-gray-200 p-3 rounded overflow-x-auto text-sm">
          {highlightCode(snippet.code, snippet.language)}
        </pre>
      </div>
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        // Success message could be shown here
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const goBack = () => {
    navigate("/home");
  };

  const getFileExtension = (filename) => {
    return filename.split(".").pop();
  };

  const exportToPDF = async () => {
    setIsExporting(true);

    try {
      // In a real implementation, you would use a PDF library
      // Here's a simplified approach that uses browser print functionality
      const printContent = document.getElementById("printable-content");
      const originalDisplay = printContent.style.display;

      // Create a new window for printing
      const printWindow = window.open("", "_blank");

      // Add styles to the new window
      printWindow.document.write(`
        <html>
          <head>
            <title>Code Review Export</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #333; }
              h2 { color: #444; margin-top: 20px; }
              h3 { color: #555; margin-top: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
              .file { margin-bottom: 30px; page-break-after: always; }
              pre { background: #f5f5f5; padding: 10px; border-radius: 5px; overflow-x: auto; }
              .strengths { color: #22863a; }
              .weaknesses { color: #cb2431; }
              .recommendations { color: #0366d6; }
              p { margin: 10px 0; }
              ul { margin: 10px 0; padding-left: 20px; }
              li { margin: 5px 0; }
            </style>
          </head>
          <body>
            <h1>Code Review Summary</h1>
            ${formattedReviews
              .map(
                (file) => `
              <div class="file">
                <h2>${file.fileName}</h2>
                ${Object.keys(file.sections)
                  .map(
                    (section) => `
                  <div>
                    <h3 class="${section}">${formatSectionTitle(section)}</h3>
                    <div>${file.sections[section]
                      .replace(/[•-]\s*/g, "- ")
                      .replace(/\n\n/g, "<br><br>")}</div>
                  </div>
                `
                  )
                  .join("")}
                ${
                  file.codeSnippets.length > 0
                    ? `
                  <h3>Code Suggestions</h3>
                  ${file.codeSnippets
                    .map(
                      (snippet) => `
                    <div>
                      <h4>${snippet.title || "Code Suggestion"}</h4>
                      ${
                        snippet.type === "diff"
                          ? `
                        <div>
                          <p>Original Code:</p>
                          <pre>${snippet.before}</pre>
                          <p>Suggested Code:</p>
                          <pre>${snippet.after}</pre>
                        </div>
                      `
                          : `
                        <pre>${snippet.code}</pre>
                      `
                      }
                    </div>
                  `
                    )
                    .join("")}
                `
                    : ""
                }
              </div>
            `
              )
              .join("")}
          </body>
        </html>
      `);

      // Wait for the content to load then print
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
        setIsExporting(false);
      };
    } catch (err) {
      console.error("Error exporting to PDF:", err);
      setIsExporting(false);
    }
  };

  const filterByType = (type) => {
    setFilterActive(type);
  };

  const filteredReviews = formattedReviews
    .filter((file) => {
      if (filterActive === "all") return true;

      // Filter by file extension
      return file.fileType === filterActive;
    })
    .filter((file) => {
      if (!searchQuery) return true;

      // Search in file name and review content
      const lowerQuery = searchQuery.toLowerCase();
      if (file.fileName.toLowerCase().includes(lowerQuery)) return true;

      // Search in sections
      return Object.values(file.sections).some((content) =>
        content.toLowerCase().includes(lowerQuery)
      );
    });

  // Get unique file types for filtering
  const fileTypes = _.uniq(formattedReviews.map((file) => file.fileType));

  return (
    <div className="min-h-screen bg-white" id="printable-content">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Code Review Summary
          </h1>

          <div className="ml-auto flex items-center gap-4">
            <button
              onClick={exportToPDF}
              disabled={isExporting || !hasReview}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-normal rounded-md shadow-sm 
                ${
                  isExporting || !hasReview
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-950"
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
        </div>
      </header>
      <div className="max-w-7xl mx-auto mt-8 mb-4 px-4 py-4 sm:px-6 lg:px-8 flex items-center">
        <button
          onClick={goBack}
          className="inline-flex items-center text-gray-900 hover:text-gray-950"
        >
          <ChevronLeft className="size-5 mr-1" />
          <span className="font-normal text-gray-950">Go Back</span>
        </button>

        <div className="ml-auto flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search reviews..."
              className="pl-8 pr-4 py-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-2 top-2.5 size-4 text-gray-400" />
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {hasReview && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Filter by file type:
              </span>
              <button
                onClick={() => filterByType("all")}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  filterActive === "all"
                    ? "bg-blue-100 text-blue-800"
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
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {hasReview && filteredReviews.length > 0 ? (
          <div className="space-y-6">
            {filteredReviews.map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div
                  className={`px-6 py-5 border-b cursor-pointer hover:bg-gray-50 flex justify-between items-center ${
                    expandedFile === file.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => toggleFile(file.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="size-10 rounded-md flex items-center justify-center bg-blue-100 text-blue-600 font-medium">
                        {file.fileType}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-medium text-gray-900 truncate">
                        {file.fileName}
                      </h2>
                      <div className="flex mt-1 text-xs">
                        {Object.keys(file.sections).length > 0 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 mr-2">
                            {Object.keys(file.sections).length} sections
                          </span>
                        )}
                        {file.codeSnippets.length > 0 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                            {file.codeSnippets.length} code suggestions
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {expandedFile === file.id ? (
                      <ChevronUp className="size-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="size-5 text-gray-500" />
                    )}
                  </div>
                </div>

                {expandedFile === file.id && (
                  <div className="px-6 py-5 sm:p-6 space-y-6">
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
                              {formatContent(file.sections[section])}
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
                                {renderCodeSnippet(snippet)}
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
          <div className="text-center py-12 bg-white rounded-lg shadow">
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
