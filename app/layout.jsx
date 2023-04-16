import { Lato } from 'next/font/google';
import './globals.css';
import Header from './components/Header';

const mont = Lato({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'TalkTonic',
  description:
    "Website that generates random questions for friends when they don't have anythig to talk about",
  keywords: 'friends, couples, questions, random questions, ama, reddit',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={mont.className}>
        <Header />
        <main className=''>{children}</main>
      </body>
    </html>
  );
}
