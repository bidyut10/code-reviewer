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
        // Create a temporary container for PDF content
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '-9999px';
        container.style.width = '210mm';
        container.style.padding = '20mm';
        container.style.background = '#fff';
        container.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        container.style.fontSize = '12pt';
        container.style.lineHeight = '1.6';
        container.style.color = '#333';

        // Add content to container
        formattedReviews.forEach((file, fileIndex) => {
            const fileSection = document.createElement('div');
            fileSection.style.pageBreakAfter = 'always';
            fileSection.style.marginBottom = '20mm';

            // Add header
            const header = document.createElement('div');
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.style.marginBottom = '20px';
            header.style.paddingBottom = '10px';
            header.style.borderBottom = '2px solid #e5e7eb';

            const logo = document.createElement('img');
            logo.src = window.location.origin + '/src/assets/cwl.png';
            logo.alt = 'Logo';
            logo.style.height = '40px';
            logo.style.width = 'auto';

            const date = document.createElement('div');
            date.textContent = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            date.style.fontSize = '14px';
            date.style.color = '#666';

            header.appendChild(logo);
            header.appendChild(date);
            fileSection.appendChild(header);

            // Add file name
            const fileName = document.createElement('h2');
            fileName.textContent = file.fileName;
            fileName.style.fontSize = '20px';
            fileName.style.fontWeight = '600';
            fileName.style.marginBottom = '20px';
            fileName.style.paddingBottom = '10px';
            fileName.style.borderBottom = '1px solid #e5e7eb';
            fileSection.appendChild(fileName);

            // Add sections
            Object.keys(file.sections).forEach(sectionName => {
                const section = document.createElement('div');
                section.style.marginBottom = '20px';
                section.style.padding = '15px';
                section.style.background = '#f8f9fa';
                section.style.borderRadius = '6px';

                const sectionTitle = document.createElement('h3');
                sectionTitle.textContent = formatSectionTitle(sectionName);
                sectionTitle.style.fontSize = '16px';
                sectionTitle.style.fontWeight = '600';
                sectionTitle.style.marginBottom = '15px';
                sectionTitle.style.color = '#1a1a1a';
                section.appendChild(sectionTitle);

                const content = formatContent(file.sections[sectionName]);
                content.forEach(item => {
                    if (item.type === 'list') {
                        const ul = document.createElement('ul');
                        ul.style.listStyleType = 'disc';
                        ul.style.paddingLeft = '25px';
                        ul.style.marginBottom = '15px';

                        item.items.forEach(bullet => {
                            const li = document.createElement('li');
                            li.textContent = bullet;
                            li.style.marginBottom = '8px';
                            li.style.color = '#444';
                            ul.appendChild(li);
                        });

                        section.appendChild(ul);
                    } else {
                        const p = document.createElement('p');
                        p.textContent = item.content;
                        p.style.marginBottom = '15px';
                        p.style.color = '#444';
                        section.appendChild(p);
                    }
                });

                fileSection.appendChild(section);
            });

            // Add code snippets
            if (file.codeSnippets && file.codeSnippets.length > 0) {
                const codeSection = document.createElement('div');
                codeSection.style.marginBottom = '20px';
                codeSection.style.padding = '15px';
                codeSection.style.background = '#f8f9fa';
                codeSection.style.borderRadius = '6px';

                const codeTitle = document.createElement('h3');
                codeTitle.textContent = 'Code Suggestions';
                codeTitle.style.fontSize = '16px';
                codeTitle.style.fontWeight = '600';
                codeTitle.style.marginBottom = '15px';
                codeTitle.style.color = '#1a1a1a';
                codeSection.appendChild(codeTitle);

                file.codeSnippets.forEach((snippet, index) => {
                    const snippetDiv = document.createElement('div');
                    snippetDiv.style.marginBottom = '20px';

                    const snippetTitle = document.createElement('h4');
                    snippetTitle.textContent = snippet.title || `Code Suggestion ${index + 1}`;
                    snippetTitle.style.fontSize = '14px';
                    snippetTitle.style.fontWeight = '600';
                    snippetTitle.style.marginBottom = '10px';
                    snippetTitle.style.color = '#333';
                    snippetDiv.appendChild(snippetTitle);

                    if (snippet.type === 'diff') {
                        const beforeLabel = document.createElement('div');
                        beforeLabel.textContent = 'Original Code:';
                        beforeLabel.style.fontStyle = 'italic';
                        beforeLabel.style.marginBottom = '5px';
                        beforeLabel.style.color = '#666';
                        snippetDiv.appendChild(beforeLabel);

                        const beforeCode = document.createElement('pre');
                        beforeCode.textContent = snippet.before;
                        beforeCode.style.background = '#f8f9fa';
                        beforeCode.style.padding = '15px';
                        beforeCode.style.borderRadius = '6px';
                        beforeCode.style.fontFamily = '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace';
                        beforeCode.style.fontSize = '12px';
                        beforeCode.style.lineHeight = '1.5';
                        beforeCode.style.overflow = 'auto';
                        beforeCode.style.margin = '15px 0';
                        beforeCode.style.border = '1px solid #e5e7eb';
                        snippetDiv.appendChild(beforeCode);

                        const afterLabel = document.createElement('div');
                        afterLabel.textContent = 'Suggested Code:';
                        afterLabel.style.fontStyle = 'italic';
                        afterLabel.style.marginBottom = '5px';
                        afterLabel.style.color = '#666';
                        snippetDiv.appendChild(afterLabel);

                        const afterCode = document.createElement('pre');
                        afterCode.textContent = snippet.after;
                        afterCode.style.background = '#f8f9fa';
                        afterCode.style.padding = '15px';
                        afterCode.style.borderRadius = '6px';
                        afterCode.style.fontFamily = '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace';
                        afterCode.style.fontSize = '12px';
                        afterCode.style.lineHeight = '1.5';
                        afterCode.style.overflow = 'auto';
                        afterCode.style.margin = '15px 0';
                        afterCode.style.border = '1px solid #e5e7eb';
                        snippetDiv.appendChild(afterCode);
                    } else {
                        const code = document.createElement('pre');
                        code.textContent = snippet.code;
                        code.style.background = '#f8f9fa';
                        code.style.padding = '15px';
                        code.style.borderRadius = '6px';
                        code.style.fontFamily = '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace';
                        code.style.fontSize = '12px';
                        code.style.lineHeight = '1.5';
                        code.style.overflow = 'auto';
                        code.style.margin = '15px 0';
                        code.style.border = '1px solid #e5e7eb';
                        snippetDiv.appendChild(code);
                    }

                    codeSection.appendChild(snippetDiv);
                });

                fileSection.appendChild(codeSection);
            }

            // Add footer
            const footer = document.createElement('div');
            footer.style.textAlign = 'center';
            footer.style.fontSize = '12px';
            footer.style.color = '#666';
            footer.style.borderTop = '1px solid #e5e7eb';
            footer.style.paddingTop = '10px';
            footer.style.marginTop = '20px';
            footer.textContent = `Page ${fileIndex + 1} of ${formattedReviews.length}`;
            fileSection.appendChild(footer);

            container.appendChild(fileSection);
        });

        // Add container to document
        document.body.appendChild(container);

        // Wait for images to load
        const images = container.getElementsByTagName('img');
        await Promise.all(Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        }));

        // Configure PDF options
        const opt = {
            margin: 0,
            filename: 'code-review-summary.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: true,
                allowTaint: true,
                foreignObjectRendering: true
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // Generate PDF
        const pdf = await html2pdf().set(opt).from(container).save();

        // Clean up
        document.body.removeChild(container);
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