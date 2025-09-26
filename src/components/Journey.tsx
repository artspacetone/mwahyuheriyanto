// src/components/Journey.tsx

import React from 'react';
import { JourneyContent, JourneyStep as JourneyStepData } from '@/types'; // Menggunakan tipe yang benar

interface JourneyProps {
    content: JourneyContent;
    isAdmin: boolean;
}

// PERBAIKAN: Komponen ini sekarang menerima 'company' dan tidak lagi menggunakan 'step'
const JourneyStep: React.FC<{ item: JourneyStepData; isAdmin: boolean; index: number }> = ({ item, isAdmin, index }) => (
    <div className="relative pb-8">
        {/* Garis timeline */}
        <div className="absolute top-5 left-5 -ml-px mt-0.5 h-full w-0.5 bg-slate-200" aria-hidden="true"></div>
        <div className="relative flex items-start group">
            <div className="h-10 w-10 flex items-center justify-center rounded-full border-2 border-white bg-slate-700">
                <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="ml-4 min-w-0">
                <span className={`text-xs font-semibold uppercase tracking-wider text-slate-500 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key={`journey.data.${index}.period`}>{item.period}</span>
                <h3 className={`text-lg font-bold text-slate-800 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key={`journey.data.${index}.title`}>{item.title}</h3>
                <p className={`text-md font-semibold text-slate-600 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key={`journey.data.${index}.company`}>{item.company}</p>
                <p className={`mt-2 text-slate-600 prose-justify ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key={`journey.data.${index}.description`}>{item.description}</p>
            </div>
        </div>
    </div>
);

const Journey: React.FC<JourneyProps> = ({ content, isAdmin }) => {
    return (
        <section id={content.id} className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <header className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className={`text-3xl md:text-4xl font-extrabold text-slate-900 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="journey.title">
                        {content.title}
                    </h2>
                    <p className={`mt-4 text-lg text-slate-600 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="journey.subtitle">{content.subtitle}</p>
                </header>

                <div className="max-w-3xl mx-auto">
                    {/* PERBAIKAN: Me-looping data dengan benar */}
                    {content.data.map((item, index) => <JourneyStep key={index} item={item} isAdmin={isAdmin} index={index} />)}
                </div>
            </div>
        </section>
    );
};

export default Journey;