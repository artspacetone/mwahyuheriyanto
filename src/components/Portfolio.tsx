import React, { useRef } from 'react';

interface Result {
    value: string;
    label: string;
}

interface MilestoneData {
    title: string;
    client: string;
    visualUrl: string;
    visualAlt: string;
    situation: string;
    action: string;
    result: Result[];
    tags: string[];
}

interface PortfolioProps {
    content: {
        id: string;
        title: string;
        subtitle: string;
        data: MilestoneData[];
    };
    isAdmin: boolean;
}

const MilestoneCard: React.FC<{ milestone: MilestoneData; isAdmin: boolean; index: number }> = ({ milestone, isAdmin, index }) => {
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
                const imageElement = document.getElementById(`milestone-image-${index}`) as HTMLImageElement;
                if (imageElement) {
                    imageElement.src = base64String;
                    imageElement.dataset.newSrc = base64String;
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow hover:shadow-2xl">
            {isAdmin && (
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept="image/png, image/jpeg, image/webp"
                />
            )}
            <img 
                id={`milestone-image-${index}`}
                src={milestone.visualUrl} 
                alt={milestone.visualAlt} 
                className={`w-full h-56 object-cover ${isAdmin ? 'cursor-pointer editable-outline' : ''}`}
                onClick={handleImageEdit}
                data-content-key={`portfolio.data.${index}.visualUrl`}
                title={isAdmin ? "Klik untuk mengganti gambar" : ""}
            />
            <div className="p-6 md:p-8">
                <p className={`text-sky-600 font-semibold mb-2 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key={`portfolio.data.${index}.client`}>{milestone.client}</p>
                <h3 className={`text-2xl font-bold text-slate-900 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key={`portfolio.data.${index}.title`}>{milestone.title}</h3>

                <div className="mt-6 space-y-6">
                    <div>
                        <h4 className="font-bold text-slate-800 border-b-2 border-slate-200 pb-1 mb-2">Tantangan (Situation)</h4>
                        <p className={`text-slate-600 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key={`portfolio.data.${index}.situation`}>{milestone.situation}</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 border-b-2 border-slate-200 pb-1 mb-2">Aksi (Action)</h4>
                        <p className={`text-slate-600 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key={`portfolio.data.${index}.action`}>{milestone.action}</p>
                    </div>
                </div>

                <div className="mt-8 bg-slate-50 p-6 rounded-lg">
                    <h4 className="font-bold text-slate-900 text-lg mb-4">Hasil (Result)</h4>
                    <div className="grid sm:grid-cols-3 gap-6 text-center">
                        {milestone.result.map((res, resIndex) => (
                            <div key={resIndex}>
                                <p className={`text-3xl font-extrabold text-sky-600 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key={`portfolio.data.${index}.result.${resIndex}.value`}>{res.value}</p>
                                <p className={`text-sm text-slate-500 mt-1 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key={`portfolio.data.${index}.result.${resIndex}.label`}>{res.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                 <div className="mt-6 flex flex-wrap gap-2">
                    {milestone.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className={`text-xs font-semibold bg-sky-100 text-sky-800 px-2 py-1 rounded-full ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key={`portfolio.data.${index}.tags.${tagIndex}`}>{tag}</span>
                    ))}
                </div>
            </div>
        </article>
    );
};

const Portfolio: React.FC<PortfolioProps> = ({ content, isAdmin }) => {
    return (
        <section id={content.id} className="py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <header className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className={`text-3xl md:text-4xl font-extrabold text-slate-900 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="portfolio.title">
                        {content.title}
                    </h2>
                    <p className={`mt-4 text-lg text-slate-600 ${isAdmin ? 'editable-outline' : ''}`} contentEditable={isAdmin} suppressContentEditableWarning data-content-key="portfolio.subtitle">
                        {content.subtitle}
                    </p>
                </header>

                <div className="max-w-4xl mx-auto space-y-16">
                    {content.data.map((milestone, index) => (
                        <MilestoneCard key={index} milestone={milestone} isAdmin={isAdmin} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;