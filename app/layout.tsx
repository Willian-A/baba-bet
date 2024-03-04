import { Toast } from "./_components/Toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background-950 flex flex-col h-screen">
        <Toast />
        {children}
      </body>
    </html>
  );
}
