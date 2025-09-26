// src/components/Pendidikan.tsx

import React from 'react';
import { PendidikanContent } from '@/types';

interface PendidikanProps {
    content: PendidikanContent;
    isAdmin: boolean;
}

const Pendidikan: React.FC<PendidikanProps> = ({ content, isAdmin }) => {
    // Memastikan data ada sebelum mencoba merender untuk menghindari error
    if (!content || !content.data) {
        return null; // Atau tampilkan pesan loading/error
    }

    return (
        <section id={content.id} className="py-20 bg-slate-800 text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="pendidikan.title">
                    {content.title}
                </h2>
                <div className="max-w-2xl mx-auto bg-slate-700 p-8 rounded-lg shadow-xl">
                    {/* PERBAIKAN: Mengubah h3 menjadi tautan <a> dan mengakses URL dengan benar */}
                    <a 
                        href={content.data.degreeUrl}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xl font-bold text-sky-300 hover:text-sky-200 transition-colors underline decoration-dotted"
                    >
                        <span 
                            className={`${isAdmin ? 'editable-outline' : ''}`} 
                            contentEditable={isAdmin} 
                            suppressContentEditableWarning 
                            data-content-key="pendidikan.data.degree"
                        >
                            {content.data.degree}
                        </span>
                    </a>
                    <p className={`mt-2 text-lg text-slate-200 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="pendidikan.data.university">
                        {content.data.university}
                    </p>
                    <p className={`mt-1 text-slate-400 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="pendidikan.data.details">
                        {content.data.details}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Pendidikan;