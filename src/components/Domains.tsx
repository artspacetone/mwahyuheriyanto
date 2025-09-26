
import React, { useState } from 'react';

interface Tab {
    id: string;
    title: string;
    content: {
        heading: string;
        text: string;
    }
}
interface DomainsProps {
    content: {
        title: string;
        subtitle: string;
        tabs: Tab[];
    };
    isAdmin: boolean;
}

const Domains: React.FC<DomainsProps> = ({ content, isAdmin }) => {
    const [activeTab, setActiveTab] = useState(content.tabs[0].id);

    return (
        <section id="domains" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl font-bold text-slate-900 inline-flex items-center ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="domains.title">
                        <span className="section-title-icon" aria-hidden="true">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 7.125A2.25 2.25 0 014.5 4.875h15A2.25 2.25 0 0121.75 7.125v1.513a.75.75 0 01-.75.75H3a.75.75 0 01-.75-.75V7.125zM3 10.375v8.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.625v-8.25M16.5 10.375v1.875m-3-1.875v1.875m-3-1.875v1.875M9 10.375v1.875" /></svg>
                        </span>
                        {content.title}
                    </h2>
                    <p className={`mt-2 text-slate-600 max-w-2xl mx-auto prose-justify ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="domains.subtitle">{content.subtitle}</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-center border-b border-slate-200 mb-8 space-x-4 md:space-x-8">
                        {content.tabs.map((tab, index) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-2 md:px-4 font-semibold transition-all duration-300 ease-in-out border-b-2 ${activeTab === tab.id ? 'border-sky-600 text-slate-900' : 'border-transparent text-slate-500 hover:border-sky-300'} ${isAdmin ? 'editable-outline' : ''}`}
                                contentEditable={isAdmin}
                                suppressContentEditableWarning
                                data-content-key={`domains.tabs.${index}.title`}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>

                    <div>
                        {content.tabs.map((tab, index) => (
                            <div key={tab.id} className={`p-6 bg-slate-50 rounded-lg transition-opacity duration-300 ${activeTab === tab.id ? 'block opacity-100' : 'hidden opacity-0'}`}>
                                <h3 className={`text-xl font-bold mb-2 text-slate-800 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key={`domains.tabs.${index}.content.heading`}>{tab.content.heading}</h3>
                                <p className={`text-slate-600 prose-justify ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key={`domains.tabs.${index}.content.text}`}>{tab.content.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Domains;