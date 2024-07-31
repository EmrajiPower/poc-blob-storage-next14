import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"bg-blue-300"}>{children}</body>
    </html>
  );
}
