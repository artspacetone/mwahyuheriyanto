// src/components/Hero.tsx

import React, { useRef } from 'react';

interface HeroProps {
    content: {
        greeting: string;
        title: string;
        subtitle: string;
        ctaPrimary: string;
        ctaSecondary: string;
        heroImageUrl: string;
        heroImageAlt: string;
    };
    isAdmin: boolean;
}

const Hero: React.FC<HeroProps> = ({ content, isAdmin }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fungsi ini akan dipanggil saat admin mengklik gambar
    const handleImageEdit = () => {
        if (!isAdmin) return;
        // Memicu klik pada input file yang tersembunyi
        fileInputRef.current?.click();
    };

    // Fungsi ini akan berjalan setelah file dipilih
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const imageElement = document.getElementById('hero-image') as HTMLImageElement;
                if (imageElement) {
                    // Tampilkan pratinjau langsung
                    imageElement.src = base64String;
                    // Simpan data Base64 di atribut 'data-new-src' untuk disimpan nanti
                    imageElement.dataset.newSrc = base64String;
                }
            };
            // Baca file sebagai Data URL (Base64)
            reader.readAsDataURL(file);
        }
    };

    return (
        <section id="hero" className="bg-white">
            {/* Input file yang disembunyikan */}
            {isAdmin && (
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept="image/png, image/jpeg, image/webp"
                />
            )}
            <div className="container mx-auto px-6 py-16 md:py-24">
                <div className="grid md:grid-cols-5 gap-12 items-center">
                    <div className="md:col-span-3 text-center md:text-left">
                        <p 
                            className={`text-sky-600 font-semibold text-lg mb-2 ${isAdmin ? 'editable-outline' : ''}`}
                            contentEditable={isAdmin}
                            suppressContentEditableWarning
                            data-content-key="hero.greeting"
                        >
                            {content.greeting}
                        </p>
                        <h1 
                            className={`text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight ${isAdmin ? 'editable-outline' : ''}`} 
                            contentEditable={isAdmin} 
                            suppressContentEditableWarning
                            data-content-key="hero.title"
                        >
                            {content.title}
                        </h1>
                        <p 
                            className={`mt-4 text-lg text-slate-600 max-w-2xl mx-auto md:mx-0 ${isAdmin ? 'editable-outline' : ''}`}
                            contentEditable={isAdmin}
                            suppressContentEditableWarning
                            data-content-key="hero.subtitle"
                        >
                            {content.subtitle}
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                            {/* ====================================================================== */}
                            {/* == PERBAIKAN 1: Mengarahkan ke #projects dan menghapus onClick        == */}
                            {/* == Scrolling akan ditangani oleh CSS 'scroll-behavior: smooth'        == */}
                            {/* ====================================================================== */}
                            <a 
                                href="#projects" 
                                className="bg-sky-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-sky-700 transition shadow-lg text-center"
                            >
                                {content.ctaPrimary}
                            </a>
                            
                            {/* ====================================================================== */}
                            {/* == PERBAIKAN 2: Mengarahkan ke #toolkit dan menghapus onClick         == */}
                            {/* ====================================================================== */}
                            <a 
                                href="#toolkit" 
                                className="bg-slate-200 text-slate-800 font-bold py-3 px-8 rounded-lg hover:bg-slate-300 transition shadow-lg text-center"
                            >
                                {content.ctaSecondary}
                            </a>
                        </div>
                    </div>
                     <div className="md:col-span-2 flex justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                           <div className="absolute inset-0 bg-slate-200 rounded-full transform rotate-6"></div>
                           <img 
                                id="hero-image" // ID untuk targeting
                                src={content.heroImageUrl}
                                alt={content.heroImageAlt}
                                className={`relative w-full h-full object-cover rounded-full shadow-2xl ${isAdmin ? 'cursor-pointer editable-outline' : ''}`}
                                onClick={handleImageEdit}
                                data-content-key="hero.heroImageUrl" // Kunci untuk penyimpanan
                                title={isAdmin ? "Klik untuk mengganti foto" : ""}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;