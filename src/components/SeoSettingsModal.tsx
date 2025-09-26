import React, { useState, useEffect } from 'react';

interface SeoSettings {
    title: string;
    description: string;
    keywords: string;
    socialImageUrl: string;
}

interface SeoSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newSeo: SeoSettings) => void;
    currentSeo: SeoSettings;
}

const SeoSettingsModal: React.FC<SeoSettingsModalProps> = ({ isOpen, onClose, onSave, currentSeo }) => {
    const [seoData, setSeoData] = useState<SeoSettings>(currentSeo);
    const [imagePreview, setImagePreview] = useState<string>(currentSeo.socialImageUrl);

    useEffect(() => {
        // Reset form when modal is opened or currentSeo changes
        setSeoData(currentSeo);
        setImagePreview(currentSeo.socialImageUrl);
    }, [isOpen, currentSeo]);

    if (!isOpen) {
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSeoData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
                setSeoData(prev => ({...prev, socialImageUrl: base64String}));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(seoData);
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl transform transition-all max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">SEO & Social Sharing Settings</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800" aria-label="Close SEO settings modal">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Site Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={seoData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Meta Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={seoData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="keywords" className="block text-sm font-medium text-slate-700 mb-1">Meta Keywords (comma-separated)</label>
                        <input
                            type="text"
                            id="keywords"
                            name="keywords"
                            value={seoData.keywords}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Social Media Share Image</label>
                        <div className="flex items-center gap-4">
                            <img src={imagePreview} alt="Social share preview" className="w-48 h-auto rounded-md border border-slate-200 object-cover"/>
                            <input
                                type="file"
                                accept="image/jpeg, image/png, image/webp"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                            />
                        </div>
                         <p className="text-xs text-slate-500 mt-2">Recommended size: 1200x630 pixels.</p>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button type="button" onClick={onClose} className="bg-slate-200 text-slate-800 font-bold py-2 px-6 rounded-lg hover:bg-slate-300 transition mr-4">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-sky-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-700 transition shadow-lg focus:outline-none focus:ring-4 focus:ring-sky-300"
                        >
                            Save SEO Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SeoSettingsModal;
