import { jsPDF } from "jspdf";
import * as _ from "lodash";

// Parse the review content into structured sections
export const parseReviewContent = (content) => {
    // Enhanced parsing to identify sections and code snippets
    const sections = {};
    const codeSnippets = [];

    // Clean up the content by removing any markdown syntax issues
    let cleanedContent = content.replace(/\*\*/g, "").replace(/\*/g, "");

    // Extract overview section
    const overviewMatch = cleanedContent.match(
        /^(.*?)(?=Positive Aspects:|Strengths:|Weaknesses:|Areas for Improvement|$)/s
    );
    if (overviewMatch) {
        sections.overview = overviewMatch[0].trim();
    }

    // Extract positive aspects/strengths
    const strengthsMatch = cleanedContent.match(
        /(?:Positive Aspects:|Strengths:)(.*?)(?=Weaknesses:|Areas for Improvement|Recommendations:|$)/s
    );
    if (strengthsMatch) {
        sections.strengths = strengthsMatch[1].trim();
    }

    // Extract weaknesses/areas for improvement
    const weaknessesMatch = cleanedContent.match(
        /(?:Weaknesses:|Areas for Improvement:)(.*?)(?=Recommendations:|Further Recommendations:|$)/s
    );
    if (weaknessesMatch) {
        sections.weaknesses = weaknessesMatch[1].trim();
    }

    // Extract recommendations
    const recommendationsMatch = cleanedContent.match(
        /(?:Recommendations:|Further Recommendations:)(.*?)$/s
    );
    if (recommendationsMatch) {
        sections.recommendations = recommendationsMatch[1].trim();
    }

    // If no sections were identified, put everything in overview
    if (Object.keys(sections).length === 0) {
        sections.overview = cleanedContent.trim();
    }

    // Find code snippets or suggestions in the content
    // Looking for code blocks that might be wrapped in ```
    const codeBlockRegex =
        /```(?:jsx|js|ts|typescript|javascript|html|css|java|python|ruby|go|rust|cpp|csharp|c\+\+|c#|php|swift|kotlin|scala|shell|bash|sql)?\s*([\s\S]*?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(cleanedContent)) !== null) {
        codeSnippets.push({
            code: match[1].trim(),
            language: match[0].match(/```(\w+)/)?.[1] || "javascript",
            title: getCodeSnippetTitle(cleanedContent, match.index),
        });
    }

    // Also look for code suggestions that might be indented
    const indentedCodeRegex =
        /(?:^|\n)( {4}|\t)(.+)(?:\n(?:(?! {0,3}\S)(?:.|\n))*)/gm;
    while ((match = indentedCodeRegex.exec(cleanedContent)) !== null) {
        if (match[0].trim().split("\n").length > 2) {
            // Only consider blocks with multiple lines
            codeSnippets.push({
                code: match[0].replace(/^( {4}|\t)/gm, "").trim(),
                language: "javascript", // Default to JS for indented blocks
                title: getCodeSnippetTitle(cleanedContent, match.index),
            });
        }
    }

    // Look for suggested changes with "Before" and "After" patterns
    const beforeAfterRegex =
        /(?:Before|Original):([\s\S]*?)(?:After|Improved|Suggested):([\s\S]*?)(?=\n\n|$)/g;
    while ((match = beforeAfterRegex.exec(cleanedContent)) !== null) {
        codeSnippets.push({
            type: "diff",
            before: match[1].trim(),
            after: match[2].trim(),
            title: "Suggested Code Change",
        });
    }

    return { sections, codeSnippets };
};

// Get a title for code snippets
export const getCodeSnippetTitle = (content, position) => {
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

// Format content with bullet points and paragraphs
export const formatContent = (content) => {
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
            return {
                type: "list",
                items: bullets.map(bullet => bullet.trim())
            };
        }

        // For regular paragraphs
        return {
            type: "paragraph",
            content: paragraph
        };
    });
};

// Get file extension
export const getFileExtension = (filename) => {
    return filename.split(".").pop();
};

// Get unique file types for filtering
export const getUniqueFileTypes = (reviews) => {
    return _.uniq(reviews.map((file) => file.fileType));
};

// Filter reviews by type and search query
export const filterReviews = (reviews, filterActive, searchQuery) => {
    return reviews
        .filter((file) => {
            if (filterActive === "all") return true;
            return file.fileType === filterActive;
        })
        .filter((file) => {
            if (!searchQuery) return true;

            const lowerQuery = searchQuery.toLowerCase();
            if (file.fileName.toLowerCase().includes(lowerQuery)) return true;

            return Object.values(file.sections).some((content) =>
                content.toLowerCase().includes(lowerQuery)
            );
        });
};

// Export reviews to PDF with selectable text
export const exportToPDF = async (setIsExporting, formattedReviews) => {
    setIsExporting(true);

    try {
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: "a4"
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 40;
        const contentWidth = pageWidth - 2 * margin;
        const footerHeight = 30;

        // Add header with logo and date
        const addHeader = (pageNum) => {
            pdf.setFontSize(20);
            pdf.setFont("helvetica", "bold");
            pdf.text("Code Review Summary", pageWidth / 2, margin, { align: "center" });
            
            // Add date
            const today = new Date();
            const dateStr = today.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            pdf.setFontSize(12);
            pdf.setFont("helvetica", "normal");
            pdf.text(dateStr, pageWidth - margin, margin, { align: "right" });
        };

        // Add footer with page numbers
        const addFooter = (pageNum, totalPages) => {
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "normal");
            pdf.text(
                `Page ${pageNum} of ${totalPages}`,
                pageWidth / 2,
                pageHeight - footerHeight,
                { align: "center" }
            );
        };

        let currentPage = 1;
        let totalPages = 1;
        let yPosition = margin + 60; // Increased to account for header

        // First pass to count total pages
        formattedReviews.forEach(file => {
            // Estimate pages needed for this file
            const contentLength = JSON.stringify(file).length;
            const estimatedPages = Math.ceil(contentLength / 5000); // Rough estimate
            totalPages += estimatedPages;
        });

        // Process each review
        for (let fileIndex = 0; fileIndex < formattedReviews.length; fileIndex++) {
            const file = formattedReviews[fileIndex];

            // Add new page if not the first file
            if (fileIndex > 0) {
                pdf.addPage();
                currentPage++;
                yPosition = margin + 60;
            }

            // Add header to each page
            addHeader(currentPage);

            // File heading
            pdf.setFontSize(16);
            pdf.setFont("helvetica", "bold");
            pdf.text(file.fileName, margin, yPosition += 30);

            // Add sections
            Object.keys(file.sections).forEach(sectionName => {
                if (yPosition > pageHeight - 100) {
                    pdf.addPage();
                    currentPage++;
                    yPosition = margin + 60;
                    addHeader(currentPage);
                }

                // Section title
                yPosition += 30;
                pdf.setFontSize(14);
                pdf.setFont("helvetica", "bold");
                pdf.text(formatSectionTitle(sectionName), margin, yPosition);

                // Section content
                pdf.setFontSize(12);
                pdf.setFont("helvetica", "normal");

                const contentLines = formatTextForPDF(file.sections[sectionName], contentWidth, pdf);
                contentLines.forEach(line => {
                    if (yPosition > pageHeight - 100) {
                        pdf.addPage();
                        currentPage++;
                        yPosition = margin + 60;
                        addHeader(currentPage);
                    }
                    yPosition += 20;
                    pdf.text(line, margin, yPosition);
                });

                yPosition += 20; // Add space after section
            });

            // Add code snippets
            if (file.codeSnippets && file.codeSnippets.length > 0) {
                if (yPosition > pageHeight - 100) {
                    pdf.addPage();
                    currentPage++;
                    yPosition = margin + 60;
                    addHeader(currentPage);
                }

                yPosition += 30;
                pdf.setFontSize(14);
                pdf.setFont("helvetica", "bold");
                pdf.text("Code Suggestions", margin, yPosition);

                file.codeSnippets.forEach((snippet, snippetIndex) => {
                    if (yPosition > pageHeight - 120) {
                        pdf.addPage();
                        currentPage++;
                        yPosition = margin + 60;
                        addHeader(currentPage);
                    }

                    // Snippet title
                    yPosition += 30;
                    pdf.setFontSize(12);
                    pdf.setFont("helvetica", "bold");
                    pdf.text(snippet.title || `Code Suggestion ${snippetIndex + 1}`, margin, yPosition);

                    // Code content
                    pdf.setFontSize(10);
                    pdf.setFont("courier", "normal");

                    if (snippet.type === "diff") {
                        // Before code
                        yPosition += 20;
                        pdf.setFont("helvetica", "italic");
                        pdf.text("Original Code:", margin, yPosition);

                        const beforeLines = formatCodeForPDF(snippet.before, contentWidth - 20, pdf);
                        pdf.setFont("courier", "normal");
                        beforeLines.forEach(line => {
                            if (yPosition > pageHeight - 80) {
                                pdf.addPage();
                                currentPage++;
                                yPosition = margin + 60;
                                addHeader(currentPage);
                            }
                            yPosition += 16;
                            pdf.text(line, margin + 10, yPosition);
                        });

                        // After code
                        if (yPosition > pageHeight - 120) {
                            pdf.addPage();
                            currentPage++;
                            yPosition = margin + 60;
                            addHeader(currentPage);
                        }

                        yPosition += 20;
                        pdf.setFont("helvetica", "italic");
                        pdf.text("Suggested Code:", margin, yPosition);

                        const afterLines = formatCodeForPDF(snippet.after, contentWidth - 20, pdf);
                        pdf.setFont("courier", "normal");
                        afterLines.forEach(line => {
                            if (yPosition > pageHeight - 80) {
                                pdf.addPage();
                                currentPage++;
                                yPosition = margin + 60;
                                addHeader(currentPage);
                            }
                            yPosition += 16;
                            pdf.text(line, margin + 10, yPosition);
                        });
                    } else {
                        // Regular code snippet
                        const codeLines = formatCodeForPDF(snippet.code, contentWidth - 20, pdf);
                        codeLines.forEach(line => {
                            if (yPosition > pageHeight - 80) {
                                pdf.addPage();
                                currentPage++;
                                yPosition = margin + 60;
                                addHeader(currentPage);
                            }
                            yPosition += 16;
                            pdf.text(line, margin + 10, yPosition);
                        });
                    }

                    yPosition += 20; // Space after snippet
                });
            }

            // Add footer to each page
            addFooter(currentPage, totalPages);
        }

        pdf.save("code-review-summary.pdf");
    } catch (err) {
        console.error("Error exporting to PDF:", err);
    } finally {
        setIsExporting(false);
    }
};

// Format text for PDF with proper line breaks
const formatTextForPDF = (text, maxWidth, pdf) => {
    if (!text) return [];

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    const lines = [];
    text.split("\n").forEach(paragraph => {
        if (paragraph.trim() === "") {
            lines.push(" ");
            return;
        }

        // Handle bullet points
        if (paragraph.trim().startsWith("•") || paragraph.trim().startsWith("-")) {
            const bulletItems = paragraph.split(/[•-]\s+/).filter(Boolean);
            bulletItems.forEach(item => {
                const wrappedText = pdf.splitTextToSize("• " + item.trim(), maxWidth);
                wrappedText.forEach((line, i) => {
                    if (i > 0) {
                        // Indent continuing bullet point lines
                        lines.push("  " + line);
                    } else {
                        lines.push(line);
                    }
                });
            });
        } else {
            // Regular paragraph
            const wrappedText = pdf.splitTextToSize(paragraph, maxWidth);
            lines.push(...wrappedText);
        }
    });

    return lines;
};

// Format code for PDF with proper line breaks
const formatCodeForPDF = (code, maxWidth, pdf) => {
    if (!code) return [];

    pdf.setFont("courier", "normal");
    pdf.setFontSize(10);

    const lines = [];
    code.split("\n").forEach(line => {
        if (pdf.getStringUnitWidth(line) * 10 > maxWidth) {
            // If line is too long, wrap it
            const wrappedText = pdf.splitTextToSize(line, maxWidth);
            lines.push(...wrappedText);
        } else {
            lines.push(line);
        }
    });

    return lines;
};

// Get UI style helpers
export const getSeverityColor = (sectionName) => {
    switch (sectionName) {
        case "strengths":
            return "bg-emerald-100 text-emerald-800 border-emerald-200";
        case "weaknesses":
            return "bg-amber-100 text-amber-800 border-amber-200";
        case "recommendations":
            return "bg-sky-100 text-sky-800 border-sky-200";
        case "code":
            return "bg-indigo-100 text-indigo-800 border-indigo-200";
        default:
            return "bg-slate-100 text-slate-800 border-slate-200";
    }
};

export const getSectionBgColor = (sectionName) => {
    switch (sectionName) {
        case "strengths":
            return "bg-emerald-50";
        case "weaknesses":
            return "bg-amber-50";
        case "recommendations":
            return "bg-sky-50";
        case "code":
            return "bg-indigo-50";
        default:
            return "bg-slate-50";
    }
};

export const formatSectionTitle = (section) => {
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