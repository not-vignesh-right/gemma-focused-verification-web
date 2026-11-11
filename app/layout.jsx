import './globals.css';
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SmoothScroll from '../motion/SmoothScroll';
import Intro from '../motion/Intro';
import PageTransition from '../motion/PageTransition';
import Reveals from '../motion/Reveals';
import { introGateScript } from '../motion/introGate';

const serif = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--f-serif',
  display: 'swap',
});
const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-sans', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--f-mono', display: 'swap' });

export const metadata = {
  title: 'Focused candidate verification for CPU-only software issue localization',
  description:
    'Testing one-candidate-at-a-time Gemma verification on 60 software issues: exact code localization, prompt costs and uncertainty. Project site with full method, source code, results and captured test evidence. Vignesh B S.',
};

export const viewport = { themeColor: '#f2efe6' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
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
