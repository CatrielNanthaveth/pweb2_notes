import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotesProvider } from "@/contexts/NotesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Notes by carti",
  description: "Notes app from a challenge of Ensolvers, resolved by carti.",
};

export default function RootLayout({ children }) {

  return (
    <AuthProvider>
      <NotesProvider >
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </NotesProvider>
    </AuthProvider>
  );
}
