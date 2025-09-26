// src/types.ts

export interface SeoContent {
  title: string;
  description: string;
  keywords: string;
  socialImageUrl: string;
}

export interface HeaderContent {
  name: string;
  navLinks: { href: string; label: string }[];
  ctaUrl: string;
  ctaButton: string;
}

export interface HeroContent {
  greeting: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  heroImageUrl: string;
  heroImageAlt: string;
}

export interface PortfolioItem {
  title: string;
  client: string;
  visualUrl:string;
  visualAlt: string;
  situation: string;
  action: string;
  result: { value: string; label: string }[];
  tags: string[];
}

export interface PortfolioContent {
  id: string;
  title: string;
  subtitle: string;
  data: PortfolioItem[];
}

export interface SkillItem {
  name: string;
  description: string;
  icon: string;
}

export interface ToolkitContent {
  id: string;
  title: string;
  subtitle: string;
  data: SkillItem[];
}

// ==========================================================
// == PERBAIKAN: Membuat interface khusus untuk AboutMe    ==
// == agar konsisten dengan struktur lainnya.              ==
// ==========================================================
export interface AboutMeContent {
  id: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  profilePicture: {
    url: string;
    alt: string;
  };
}

export interface JourneyStep {
  period: string;
  title: string;
  company: string;
  description: string;
}

export interface JourneyContent {
  id: string;
  title: string;
  subtitle: string;
  data: JourneyStep[];
}

export interface PendidikanItem {
  degree: string;
  degreeUrl: string;
  university: string;
  details: string;
}

export interface PendidikanContent {
  id: string;
  title: string;
  data: PendidikanItem;
}

export interface FooterContent {
  title: string;
  subtitle: string;
  copyright: string;
}

export interface AppContentStructure {
  header: HeaderContent;
  hero: HeroContent;
  portfolio: PortfolioContent;
  toolkit: ToolkitContent;
  journey: JourneyContent;
  pendidikan: PendidikanContent;
  footer: FooterContent;
  seo: SeoContent;
  // ==========================================================
  // == PERBAIKAN: Menggunakan struktur objek AboutMeContent ==
  // ==========================================================
  aboutMe: AboutMeContent;
}