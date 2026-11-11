// Fonts are bundled from npm (no build-time download from Google Fonts).
import '@fontsource-variable/newsreader/opsz.css';
import '@fontsource-variable/newsreader/opsz-italic.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SmoothScroll from '../motion/SmoothScroll';
import Intro from '../motion/Intro';
import PageTransition from '../motion/PageTransition';
import Reveals from '../motion/Reveals';
import { introGateScript } from '../motion/introGate';

export const metadata = {
  title: 'Focused candidate verification for CPU-only software issue localization',
  description:
    'Testing one-candidate-at-a-time Gemma verification on 60 software issues: exact code localization, prompt costs and uncertainty. Project site with full method, source code, results and captured test evidence. Vignesh B S.',
};

export const viewport = { themeColor: '#f2efe6' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGateScript }} />
      </head>
      <body>
        <SmoothScroll />
        <Intro />
        <PageTransition />
        <a className="skip" href="#content">
          Skip to content
        </a>
        <Nav />
        <main id="content" className="page">
          {children}
        </main>
        <Footer />
        <Reveals />
      </body>
    </html>
  );
}
