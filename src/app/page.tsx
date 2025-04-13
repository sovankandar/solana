'use client';

import { Header } from './components/landing/Header';
import { Hero } from './components/landing/Hero';
import { About } from './components/landing/About';
import { Footer } from './components/landing/Footer';

export default function App() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Footer />
    </main>
  );
}
