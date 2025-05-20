import * as _ from "lodash";
import html2pdf from "html2pdf.js";
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
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            throw new Error('Popup blocked. Please allow popups for this site.');
        }

        // Create the HTML content
        const content = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Code Review Summary</title>
                <style>
                    @page {
                        size: A4;
                        margin: 20mm;
                    }
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        background: #fff;
                    }
                    .page {
                        page-break-after: always;
                        position: relative;
                        min-height: 297mm;
                        padding: 20mm;
                        box-sizing: border-box;
                    }
                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 30px;
                        padding-bottom: 15px;
                        border-bottom: 2px solid #e5e7eb;
                    }
                    .header img {
                        height: 40px;
                        width: auto;
                    }
                    .header .date {
                        font-size: 14px;
                        color: #666;
                    }
                    .footer {
                        position: absolute;
                        bottom: 20mm;
                        left: 20mm;
                        right: 20mm;
                        text-align: center;
                        font-size: 12px;
                        color: #666;
                        border-top: 1px solid #e5e7eb;
                        padding-top: 10px;
                    }
                    h2 {
                        font-size: 20px;
                        font-weight: 600;
                        margin-bottom: 25px;
                        color: #1a1a1a;
                        border-bottom: 1px solid #e5e7eb;
                        padding-bottom: 10px;
                    }
                    h3 {
                        font-size: 16px;
                        font-weight: 600;
                        margin: 20px 0 15px;
                        color: #1a1a1a;
                    }
                    h4 {
                        font-size: 14px;
                        font-weight: 600;
                        margin: 15px 0 10px;
                        color: #333;
                    }
                    p {
                        margin-bottom: 15px;
                        color: #444;
                        font-size: 14px;
                    }
                    ul {
                        list-style-type: disc;
                        padding-left: 25px;
                        margin-bottom: 15px;
                    }
                    li {
                        margin-bottom: 8px;
                        color: #444;
                        font-size: 14px;
                    }
                    pre {
                        background-color: #f8f9fa;
                        padding: 15px;
                        border-radius: 6px;
                        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
                        font-size: 12px;
                        line-height: 1.5;
                        overflow-x: auto;
                        margin: 15px 0;
                        border: 1px solid #e5e7eb;
                    }
                    .code-label {
                        font-style: italic;
                        margin: 15px 0 5px;
                        color: #666;
                        font-size: 13px;
                    }
                    .section {
                        margin-bottom: 30px;
                        padding: 15px;
                        background: #f8f9fa;
                        border-radius: 6px;
                    }
                    .section-title {
                        font-weight: 600;
                        color: #1a1a1a;
                        margin-bottom: 15px;
                    }
                    @media print {
                        body {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                        .page {
                            margin: 0;
                            padding: 20mm;
                        }
                    }
                </style>
            </head>
            <body>
                ${formattedReviews.map((file, fileIndex) => `
                    <div class="page">
                        <div class="header">
                            <img src="${window.location.origin}/src/assets/cwl.png" alt="Logo">
                            <div class="date">${new Date().toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</div>
                        </div>
                        
                        <h2>${file.fileName}</h2>
                        
                        ${Object.keys(file.sections).map(sectionName => `
                            <div class="section">
                                <h3 class="section-title">${formatSectionTitle(sectionName)}</h3>
                                ${formatContent(file.sections[sectionName]).map(item => {
                                    if (item.type === 'list') {
                                        return `
                                            <ul>
                                                ${item.items.map(bullet => `
                                                    <li>${bullet}</li>
                                                `).join('')}
                                            </ul>
                                        `;
                                    } else {
                                        return `<p>${item.content}</p>`;
                                    }
                                }).join('')}
                            </div>
                        `).join('')}
                        
                        ${file.codeSnippets && file.codeSnippets.length > 0 ? `
                            <div class="section">
                                <h3 class="section-title">Code Suggestions</h3>
                                ${file.codeSnippets.map((snippet, index) => `
                                    <div>
                                        <h4>${snippet.title || `Code Suggestion ${index + 1}`}</h4>
                                        ${snippet.type === 'diff' ? `
                                            <div class="code-label">Original Code:</div>
                                            <pre>${snippet.before}</pre>
                                            <div class="code-label">Suggested Code:</div>
                                            <pre>${snippet.after}</pre>
                                        ` : `
                                            <pre>${snippet.code}</pre>
                                        `}
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                        
                        <div class="footer">
                            Page ${fileIndex + 1} of ${formattedReviews.length}
                        </div>
                    </div>
                `).join('')}
            </body>
            </html>
        `;

        // Write the content to the new window
        printWindow.document.write(content);
        printWindow.document.close();

        // Wait for images to load
        await new Promise(resolve => {
            const images = printWindow.document.getElementsByTagName('img');
            let loadedImages = 0;
            
            if (images.length === 0) {
                resolve();
                return;
            }

            Array.from(images).forEach(img => {
                if (img.complete) {
                    loadedImages++;
                    if (loadedImages === images.length) {
                        resolve();
                    }
                } else {
                    img.onload = () => {
                        loadedImages++;
                        if (loadedImages === images.length) {
                            resolve();
                        }
                    };
                    img.onerror = () => {
                        loadedImages++;
                        if (loadedImages === images.length) {
                            resolve();
                        }
                    };
                }
            });
        });

        // Print the window
        printWindow.print();
        
        // Close the window after printing
        printWindow.onafterprint = () => {
            printWindow.close();
        };
    } catch (err) {
        console.error("Error exporting to PDF:", err);
        alert("Error exporting to PDF. Please try again.");
    } finally {
        setIsExporting(false);
    }
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