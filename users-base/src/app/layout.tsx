import { AuthProvider } from "../context/AuthContext";
import "./index.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Users base</title>
      </head>

      <body><AuthProvider>{children}</AuthProvider></body>
    </html>
  );
}
