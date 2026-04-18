import Providers from './providers';
import './globals.css';

export const metadata = {
  title:       'DevelopersHub — Full-Stack Agency',
  description: 'Professional web development agency delivering modern, scalable solutions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
