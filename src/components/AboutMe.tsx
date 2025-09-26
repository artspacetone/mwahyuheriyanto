// src/components/AboutMe.tsx

import React, { useRef } from 'react';
import { AboutMeContent } from '@/types';

interface AboutMeProps {
    content: AboutMeContent;
    isAdmin: boolean;
}

const AboutMe: React.FC<AboutMeProps> = ({ content, isAdmin }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageEdit = () => {
        if (!isAdmin) return;
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const imageElement = document.getElementById('about-me-image');
                if (imageElement) {
                    imageElement.setAttribute('src', base64String);
                    imageElement.setAttribute('data-new-src', base64String);
                }
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <section id={content.id} className="py-20 bg-slate-100">
            {isAdmin && (
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept="image/png, image/jpeg, image/webp"
                />
            )}
             <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-12 items-center">
                    <div className="md:col-span-2">
                         <img 
                            id="about-me-image"
                            src={content.profilePicture.url} 
                            alt={content.profilePicture.alt}
                            className={`rounded-lg shadow-xl w-full ${isAdmin ? 'cursor-pointer editable-outline' : ''}`}
                            width="400"
                            height="400"
                            loading="lazy"
                            onClick={handleImageEdit}
                            data-content-key="aboutMe.profilePicture.url"
                            title={isAdmin ? "Klik untuk mengganti gambar" : ""}
                        />
                    </div>
                    <div className="md:col-span-3">
                        {/* ========================================================== */}
                        {/* == PERBAIKAN KUNCI: data-content-key yang benar         == */}
                        {/* ========================================================== */}
                        <h2 className={`text-3xl font-extrabold mb-4 text-slate-900 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="aboutMe.title">
                            {content.title}
                        </h2>
                        <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                            <p className={`prose-justify ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="aboutMe.paragraph1">
                                {content.paragraph1}
                            </p>
                            <p className={`prose-justify ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="aboutMe.paragraph2">
                                {content.paragraph2}
                            </p>
                        </div>
                    </div>
                </div>
             </div>
        </section>
    );
};

export default AboutMe;