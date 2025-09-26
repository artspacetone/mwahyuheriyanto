import React from 'react';

interface PhotoPostcardProps {
    content: {
        imageUrl: string;
        altText: string;
        title: string;
        paragraph1: string;
        paragraph2:string;
        signature: string;
    };
    isAdmin: boolean;
}

const PhotoPostcard: React.FC<PhotoPostcardProps> = ({ content, isAdmin }) => {
    
    const handleImageEdit = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!isAdmin) return;

        const newImageUrl = prompt("Enter the new image URL:", content.imageUrl);
        if (newImageUrl) {
            const newAltText = prompt("Enter the new alt text:", content.altText);
            const imageElement = e.currentTarget;
            imageElement.src = newImageUrl;
            // Simpan data baru di atribut data untuk diambil saat saving
            imageElement.dataset.newSrc = newImageUrl;
            imageElement.dataset.newAlt = newAltText || content.altText;
        }
    };

    return (
        <section id="postcard" className="py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="bg-white p-8 rounded-lg shadow-lg md:grid md:grid-cols-5 md:gap-12 items-center">
                    <div className="md:col-span-2 mb-8 md:mb-0">
                        <img 
                            id="photopostcard-image"
                            src={content.imageUrl}
                            alt={content.altText}
                            className={`rounded-lg shadow-md object-cover w-full h-auto aspect-[4/5] ${isAdmin ? 'cursor-pointer editable-outline' : ''}`}
                            onClick={handleImageEdit}
                            title={isAdmin ? "Click to edit image" : ""}
                        />
                    </div>
                    <div className="md:col-span-3">
                        <h2 className={`text-3xl font-bold text-slate-900 mb-4 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="photoPostcard.title">
                            {content.title}
                        </h2>
                        <p className={`text-slate-600 mb-4 text-lg leading-relaxed prose-justify ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="photoPostcard.paragraph1">
                            {content.paragraph1}
                        </p>
                        <p className={`text-slate-600 mb-6 text-lg leading-relaxed prose-justify ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="photoPostcard.paragraph2">
                            {content.paragraph2}
                        </p>
                        <p className={`text-slate-800 font-semibold text-xl italic ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="photoPostcard.signature">
                            {content.signature}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PhotoPostcard;