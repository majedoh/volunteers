// src/app/page.tsx
'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedOpportunities from '@/components/sections/FeaturedOpportunities';
import AboutSection from '@/components/sections/AboutSection';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <FeaturedOpportunities />
      <AboutSection />
    </Layout>
  );
}