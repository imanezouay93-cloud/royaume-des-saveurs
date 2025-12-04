// ...existing code...
import "./globals.css";

export const metadata = {
  title: "Royaume des Saveurs",
  description: "Système de gestion d'école de cuisine marocaine",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
// ...existing code...