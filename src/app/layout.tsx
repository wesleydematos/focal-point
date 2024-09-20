import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "FocalPoint",
  description: "Gerencie suas tarefas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Toaster
          toastOptions={{
            success: {
              iconTheme: {
                primary: "#0796d3",
                secondary: "white",
              },
            },
          }}
          position="top-center"
        />
      </body>
    </html>
  );
}
