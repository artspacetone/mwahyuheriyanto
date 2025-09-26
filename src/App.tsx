// src/App.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { GraphQLClient, gql } from 'graphql-request';

// Import Types & Components
import { AppContentStructure } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Toolkit from './components/Toolkit';
import AboutMe from './components/AboutMe';
import Journey from './components/Journey';
import Pendidikan from './components/Pendidikan';
import Footer from './components/Footer';
import AnimatedSection from './components/AnimatedSection';
import AdminToolbar from './components/AdminToolbar';
import LoginModal from './components/LoginModal';
import SeoSettingsModal from './components/SeoSettingsModal';
import { content as defaultContent } from './content';

declare global {
    interface Window { tinymce: any; }
}

const PORTFOLIO_QUERY = gql`
  query PortfolioQuery {
    portfolioPage {
      seo
      header
      hero
      portfolio
      toolkit
      journey
      pendidikan
      footer
      aboutMeTitle
      aboutMeParagraph1
      aboutMeParagraph2
      profilePicture {
        url(imgixParams: { w: "400", h: "400", fit: "crop", auto: "format" })
        alt
      }
    }
  }
`;

const isObject = (item: any): boolean => (item && typeof item === 'object' && !Array.isArray(item));

const mergeDeep = (target: any, source: any): any => {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key]) && key in target) {
                output[key] = mergeDeep(target[key], source[key]);
            } else if (source[key] !== null && source[key] !== undefined) {
                output[key] = source[key];
            }
        });
    }
    return output;
};


const setNestedValue = (obj: any, path: string, value: any) => {
    const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (typeof current[key] === 'undefined' || current[key] === null) { return; }
        current = current[key];
    }
    const lastKey = keys[keys.length - 1];
    if (current && typeof current === 'object') {
        current[lastKey] = value;
    }
};

const App: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [appContent, setAppContent] = useState<AppContentStructure | null>(null);
    // ==========================================================
    // == PERBAIKAN 1: Hapus variabel 'error' yang tidak dipakai ==
    // ==========================================================
    const [, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadContent = async () => {
            // ==========================================================
            // == PERBAIKAN 2: Beri nilai awal pada finalContent       ==
            // ==========================================================
            let finalContent: AppContentStructure = defaultContent;

            try {
                setError(null);
                const endpoint = 'https://graphql.datocms.com/';
                const client = new GraphQLClient(endpoint, {
                    headers: {
                        authorization: `Bearer ${import.meta.env.VITE_DATOCMS_API_TOKEN}`,
                    },
                });
                const data = await client.request<{ portfolioPage: any }>(PORTFOLIO_QUERY);
                
                if (!data.portfolioPage) {
                    throw new Error("Data from DatoCMS is empty.");
                }

                let fetchedContent = data.portfolioPage;
                
                Object.keys(fetchedContent).forEach(key => {
                    const value = fetchedContent[key];
                    if (typeof value === 'string' && value.trim().startsWith('{')) {
                        try { fetchedContent[key] = JSON.parse(value); } catch (e) { /* Biarkan */ }
                    }
                });

                const transformedFetchedContent = {
                    ...fetchedContent,
                    aboutMe: {
                        id: 'about',
                        title: fetchedContent.aboutMeTitle,
                        paragraph1: fetchedContent.aboutMeParagraph1,
                        paragraph2: fetchedContent.aboutMeParagraph2,
                        profilePicture: fetchedContent.profilePicture
                    }
                };
                delete transformedFetchedContent.aboutMeTitle;
                delete transformedFetchedContent.aboutMeParagraph1;
                delete transformedFetchedContent.aboutMeParagraph2;
                delete transformedFetchedContent.profilePicture;


                finalContent = mergeDeep(defaultContent, transformedFetchedContent);

            } catch (err: any) {
                console.error("Failed to fetch from DatoCMS, using local content.", err);
                setError("Could not load latest content. Displaying cached version.");
                finalContent = defaultContent; // Jika error, pastikan kembali ke default
            } finally {
                if (localStorage.getItem('isAdmin') === 'true') {
                    const savedContent = localStorage.getItem('savedContent');
                    if (savedContent) {
                        const parsedSavedContent = JSON.parse(savedContent);
                        finalContent = mergeDeep(finalContent, parsedSavedContent);
                    }
                }
                setAppContent(finalContent);
            }
        };
        loadContent();
        if (localStorage.getItem('isAdmin') === 'true') { setIsAdmin(true); }
    }, []);
    
    const login = () => { setLoginError(''); setIsLoginModalOpen(true); };

    const handleLoginAttempt = (username: string, pass: string) => {
        const adminUser = import.meta.env.VITE_ADMIN_USERNAME;
        const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;
        if (username === adminUser && pass === adminPass) {
            localStorage.setItem('isAdmin', 'true');
            setIsAdmin(true);
            setIsLoginModalOpen(false);
        } else {
            setLoginError('Incorrect username or password');
        }
    };

    const logout = () => {
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('savedContent');
        setIsAdmin(false);
        window.location.reload();
    };

    const handleSaveChanges = useCallback(() => {
        if (!appContent) return;
        const updatedContent: AppContentStructure = JSON.parse(JSON.stringify(appContent));
        document.querySelectorAll('[data-content-key]').forEach(element => {
            const key = (element as HTMLElement).dataset.contentKey;
            if (key) {
                const value = (element as HTMLElement).innerText;
                setNestedValue(updatedContent, key, value);
            }
        });
        document.querySelectorAll('img[data-new-src]').forEach(imgElement => {
            const key = imgElement.getAttribute('data-content-key');
            const newSrc = imgElement.getAttribute('data-new-src');
            if (key && newSrc) {
                setNestedValue(updatedContent, key, newSrc);
            }
        });
        try {
            localStorage.setItem('savedContent', JSON.stringify(updatedContent));
            setAppContent(updatedContent);
            alert('Changes saved locally! They will be visible until you log out or clear your browser cache.');
        } catch (error) {
            console.error("Failed to save content", error);
            alert('An error occurred while saving.');
        }
    }, [appContent]);

    const handleCancelChanges = () => {
        if (window.confirm('Are you sure you want to cancel? All local edits will be lost.')) {
            localStorage.removeItem('savedContent');
            window.location.reload();
        }
    };
    
    const handleSaveSeoSettings = (newSeo: AppContentStructure['seo']) => {
        if (!appContent) return;
        const updatedContent = { ...appContent, seo: newSeo };
        try {
            localStorage.setItem('savedContent', JSON.stringify(updatedContent));
            setAppContent(updatedContent);
            setIsSeoModalOpen(false);
            alert('SEO settings saved locally!');
        } catch (error) {
            console.error("Failed to save SEO settings", error);
            alert('An error occurred while saving SEO settings.');
        }
    };

    if (!appContent) {
        return <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading Portfolio...</div>;
    }

    const websiteUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    const schemas = [
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Moch. Wahyu Heriyanto",
            "url": websiteUrl,
            "image": appContent.aboutMe.profilePicture.url,
            "jobTitle": "Accounting Supervisor | Financial Data & Automation Specialist",
            "worksFor": { "@type": "Organization", "name": "PT Televisi Transformasi Indonesia (Trans TV)" },
            "alumniOf": { "@type": "CollegeOrUniversity", "name": "Universitas Muhamadiyah Prof. Dr. Hamka" },
            "knowsAbout": ["Financial Analysis", "Accounting Automation", "Python", "Pandas", "SQL", "JavaScript", "SAP", "Oracle"]
        },
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": websiteUrl,
            "name": "Portfolio Moch. Wahyu Heriyanto",
            "author": {
                "@type": "Person",
                "name": "Moch. Wahyu Heriyanto"
            },
            "description": appContent.seo.description,
            "potentialAction": {
                "@type": "SearchAction",
                "target": `${websiteUrl}#projects`,
                "query-input": "required name=search_term_string"
            }
        }
    ];

    return (
        <>
            <Helmet>
                <html lang="id" />
                <title>{appContent.seo.title}</title>
                <meta name="description" content={appContent.seo.description} />
                <meta name="keywords" content={appContent.seo.keywords} />
                <link rel="canonical" href={websiteUrl} />
                <meta name="robots" content="index, follow" />
                
                <meta property="og:title" content={appContent.seo.title} />
                <meta property="og:description" content={appContent.seo.description} />
                <meta property="og:image" content={appContent.seo.socialImageUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={websiteUrl} />
                
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={appContent.seo.title} />
                <meta name="twitter:description" content={appContent.seo.description} />
                <meta name="twitter:image" content={appContent.seo.socialImageUrl} />

                <script type="application/ld+json">{JSON.stringify(schemas)}</script>
            </Helmet>
            
            <AdminToolbar isAdmin={isAdmin} onLogout={logout} onSave={handleSaveChanges} onCancel={handleCancelChanges} onOpenSeoSettings={() => setIsSeoModalOpen(true)} />
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLoginAttempt} error={loginError} />
            <SeoSettingsModal isOpen={isSeoModalOpen} onClose={() => setIsSeoModalOpen(false)} onSave={handleSaveSeoSettings} currentSeo={appContent.seo} />

            <Header content={appContent.header} isAdmin={isAdmin} />
            <main style={{ paddingTop: isAdmin ? '50px' : '0' }}>
                {/* Pesan error sengaja dinonaktifkan dari tampilan publik */}
                
                <AnimatedSection><Hero content={appContent.hero} isAdmin={isAdmin} /></AnimatedSection>
                <AnimatedSection><Portfolio content={appContent.portfolio} isAdmin={isAdmin}/></AnimatedSection>
                <AnimatedSection><Toolkit content={appContent.toolkit} isAdmin={isAdmin} /></AnimatedSection>
                <AnimatedSection><Journey content={appContent.journey} isAdmin={isAdmin}/></AnimatedSection>
                <AnimatedSection><Pendidikan content={appContent.pendidikan} isAdmin={isAdmin} /></AnimatedSection>
                <AnimatedSection><AboutMe content={appContent.aboutMe} isAdmin={isAdmin} /></AnimatedSection>

            </main>
            <AnimatedSection><Footer content={appContent.footer} onLogin={login} isAdmin={isAdmin} /></AnimatedSection>
        </>
    );
};

export default App;