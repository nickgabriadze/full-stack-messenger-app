import { Providers } from "./(store)/provider";
import "./globals.css";

export const metadata = {
  title: "Messenger App",
  description: "chat with your pals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
