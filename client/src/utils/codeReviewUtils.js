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
        const element = document.getElementById('printable-content');
        if (!element) {
            throw new Error('Printable content not found');
        }

        const opt = {
            margin: 20,
            filename: 'code-review-summary.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: true
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait' 
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // Create a clone of the element to modify for PDF
        const clone = element.cloneNode(true);
        document.body.appendChild(clone);
        clone.style.display = 'block';
        clone.style.width = '210mm';
        clone.style.margin = '0 auto';
        clone.style.padding = '20mm';
        clone.style.background = '#fff';

        // Process images to ensure they load
        const images = clone.getElementsByTagName('img');
        await Promise.all(Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        }));

        // Generate PDF
        await html2pdf().set(opt).from(clone).save();

        // Clean up
        document.body.removeChild(clone);
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