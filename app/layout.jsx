import './globals.css';
import Header from './components/Header';
import { spaceGrotesk } from './utils/fonts';

export const metadata = {
  title: 'TalkTonic',
  description:
    "Website that generates random questions for friends when they don't have anythig to talk about",
  keywords: 'friends, couples, questions, random questions, ama, reddit',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={spaceGrotesk.className}>
        <div className='relative'>
          <Header />
          <main className=''>{children}</main>
        </div>
      </body>
    </html>
  );
}
