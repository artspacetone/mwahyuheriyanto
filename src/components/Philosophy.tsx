import React, { useEffect } from 'react';

interface PhilosophyProps {
    content: {
        title: string;
        description: string;
    };
    isAdmin: boolean;
}

const Philosophy: React.FC<PhilosophyProps> = ({ content, isAdmin }) => {

    useEffect(() => {
        if (isAdmin) {
            // Using a timeout to ensure the DOM element is fully ready.
            setTimeout(() => {
                if (window.tinymce) {
                    const editorId = 'philosophy-editor';
                    const existingEditor = window.tinymce.get(editorId);
                    if (!existingEditor) {
                        window.tinymce.init({
                            selector: `#${editorId}`,
                            inline: true,
                            menubar: false,
                            toolbar: 'bold italic | bullist numlist',
                            plugins: ['lists', 'autoresize'],
                            skin: 'oxide',
                            content_css: 'default'
                        });
                    }
                }
            }, 100);
        }

        return () => {
            // Clean up the editor instance when the component unmounts or isAdmin becomes false
            const editor = window.tinymce?.get('philosophy-editor');
            if (editor) {
                editor.destroy();
            }
        };
    }, [isAdmin]);


    return (
        <section id="philosophy" className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 
                        className={`text-3xl font-bold text-slate-900 inline-flex items-center ${isAdmin ? 'editable-outline' : ''}`} 
                        contentEditable={isAdmin} 
                        suppressContentEditableWarning
                        data-content-key="philosophy.title"
                    >
                         <span className="section-title-icon" aria-hidden="true">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        </span>
                        {content.title}
                    </h2>
                    <div 
                        id={isAdmin ? 'philosophy-editor' : undefined}
                        className={`mt-2 text-slate-600 max-w-2xl mx-auto prose-justify ${isAdmin ? 'editable-outline' : ''}`}
                        data-content-key="philosophy.description"
                        data-content-type="html"
                        dangerouslySetInnerHTML={{ __html: content.description }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Philosophy;