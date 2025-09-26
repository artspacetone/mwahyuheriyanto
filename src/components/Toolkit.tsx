// src/components/Toolkit.tsx

import React from 'react';
import { ToolkitContent } from '@/types';

interface ToolkitProps {
    content: ToolkitContent;
    isAdmin: boolean;
}

const Toolkit: React.FC<ToolkitProps> = ({ content, isAdmin }) => {
    return (
        <section id={content.id} className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <header className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className={`text-3xl md:text-4xl font-extrabold text-slate-900 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="toolkit.title">
                        {content.title}
                    </h2>
                    <p className={`mt-4 text-lg text-slate-600 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="toolkit.subtitle">
                        {content.subtitle}
                    </p>
                </header>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
                    {content.data.map((item, index) => (
                        <div key={index} className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sky-600 text-white">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className={`text-lg leading-6 font-bold text-slate-900 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key={`toolkit.data.${index}.name`}>{item.name}</h3>
                                <p className={`mt-2 text-base text-slate-600 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key={`toolkit.data.${index}.description`}>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Toolkit;