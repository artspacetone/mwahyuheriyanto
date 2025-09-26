// src/components/Header.tsx

import React, { useState, useEffect } from 'react';
import { HeaderContent } from '@/types';

interface HeaderProps {
    content: HeaderContent;
    isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ content, isAdmin }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    return (
        <>
            <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 transition-all">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-xl font-bold text-slate-900">
                        <a href="#hero" onClick={(e) => scrollToSection(e, '#hero')} className={isAdmin ? 'editable-outline' : ''} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="header.name">
                            {content.name}
                        </a>
                    </div>
                    <nav className="hidden md:flex items-center space-x-6">
                        {content.navLinks.map(link => (
                            <a key={link.href} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-slate-600 hover:text-sky-600 transition font-medium">
                                {link.label}
                            </a>
                        ))}
                        <div id="google_translate_element_desktop" className="notranslate"></div>
                        <a href={content.ctaUrl} target="_blank" rel="noopener noreferrer" className="bg-sky-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-700 transition shadow-md">
                            {content.ctaButton}
                        </a>
                    </nav>
                    <div className="md:hidden">
                        {/* ========================================================== */}
                        {/* == PERBAIKAN ATS & WCAG: Menambahkan aria-expanded      == */}
                        {/* ========================================================== */}
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="text-slate-900 focus:outline-none p-2 -mr-2" 
                            aria-label="Toggle menu"
                            aria-expanded={isOpen}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
            
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-30">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>
                    <div className="relative bg-white w-full shadow-lg" style={{ paddingTop: '80px' }}>
                         <nav className="px-6 pt-2 pb-4 flex flex-col space-y-2">
                            {content.navLinks.map(link => (
                                <a key={link.href} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-slate-600 hover:text-sky-600 py-2 rounded-md text-base font-medium">
                                    {link.label}
                                </a>
                            ))}
                            <div id="google_translate_element_mobile" className="notranslate py-2"></div>
                            <a href={content.ctaUrl} target="_blank" rel="noopener noreferrer" className="bg-sky-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-700 transition shadow-md text-center mt-2">
                                {content.ctaButton}
                            </a>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;