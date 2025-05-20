import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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

// Export reviews to PDF
export const exportToPDF = async (setIsExporting) => {
    setIsExporting(true);

    try {
        const pdf = new jsPDF("p", "mm", "a4");
        const printContent = document.getElementById("printable-content");
        const contentSections = printContent.querySelectorAll(".pdf-section");

        let verticalOffset = 10;

        // Add title to PDF
        pdf.setFontSize(16);
        pdf.setFont("helvetica", "bold");
        pdf.text("Code Review Summary", 105, verticalOffset, { align: "center" });
        verticalOffset += 15;

        for (let i = 0; i < contentSections.length; i++) {
            const section = contentSections[i];

            if (i > 0) {
                // Add a page break between files
                pdf.addPage();
                verticalOffset = 10;
            }

            // Create canvas from content section
            const canvas = await html2canvas(section, {
                scale: 1,
                useCORS: true,
                logging: false,
                allowTaint: true,
            });

            // Convert canvas to image data
            const imgData = canvas.toDataURL("image/png");

            // Calculate dimensions to fit in PDF
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Add file title
            const fileTitle = section.dataset.filename || `File ${i + 1}`;
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text(fileTitle, 10, verticalOffset);
            verticalOffset += 10;

            // Add the content image
            pdf.addImage(imgData, "PNG", 10, verticalOffset, imgWidth, imgHeight);
        }

        pdf.save("code-review-summary.pdf");
    } catch (err) {
        console.error("Error exporting to PDF:", err);
    } finally {
        setIsExporting(false);
    }
};

// Get UI style helpers
export const getSeverityColor = (sectionName) => {
    switch (sectionName) {
        case "strengths":
            return "bg-green-100 text-green-800 border-green-200";
        case "weaknesses":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "recommendations":
            return "bg-blue-100 text-blue-800 border-blue-200";
        case "code":
            return "bg-indigo-100 text-indigo-800 border-indigo-200";
        default:
            return "bg-gray-100 text-gray-800 border-gray-200";
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