
import React from 'react';

interface FooterProps {
    content: {
        title: string;
        subtitle: string;
        copyright: string;
    };
    onLogin: () => void;
    isAdmin: boolean;
}

const Footer: React.FC<FooterProps> = ({ content, onLogin, isAdmin }) => {
    return (
        <footer className="bg-slate-800 text-white py-12">
            <div className="container mx-auto px-6 text-center">
                <h2 
                    className={`text-2xl font-bold inline-flex items-center ${isAdmin ? 'editable-outline' : ''}`} 
                    contentEditable={isAdmin} 
                    suppressContentEditableWarning
                    data-content-key="footer.title"
                >
                     <span className="section-title-icon text-white" aria-hidden="true">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.555-3.862 8.25-8.625 8.25a9.06 9.06 0 01-4.322-.994l-3.178 1.191a.75.75 0 01-.976-.976l1.191-3.178A9.06 9.06 0 013 12c0-4.555 3.862-8.25 8.625-8.25S21 7.445 21 12z" /></svg>
                    </span>
                    {content.title}
                </h2>
                <p 
                    className={`mt-2 max-w-lg mx-auto prose-justify ${isAdmin ? 'editable-outline' : ''}`}
                    contentEditable={isAdmin}
                    suppressContentEditableWarning
                    data-content-key="footer.subtitle"
                >
                    {content.subtitle}
                </p>
                 <p className="mt-8 text-sm text-slate-400">
                    &copy; {new Date().getFullYear()} <span className={isAdmin ? 'editable-outline' : ''} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="footer.copyright">{content.copyright}</span>
                 </p>
                 {!isAdmin && (
                    <div className="mt-4">
                        <button onClick={onLogin} className="text-slate-500 text-xs hover:text-slate-300 transition-colors">
                            Admin Login
                        </button>
                    </div>
                 )}
            </div>
        </footer>
    );
};

export default Footer;