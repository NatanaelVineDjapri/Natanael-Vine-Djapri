import Container from "./Container";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-line/60 border-t">
      <Container className="py-10">
        <div className="text-mute flex flex-col gap-5 font-mono text-[0.625rem] tracking-[0.18em] uppercase md:flex-row md:items-center md:justify-between">
          <span>
            &copy; {new Date().getFullYear()} {profile.name}
          </span>

          <span className="hidden md:inline">
            Dirancang &amp; dibangun sendiri
          </span>

          <a
            href="#beranda"
            className="hover:text-paper link-wipe self-start transition-colors duration-500 md:self-auto"
          >
            Kembali ke atas
          </a>
        </div>
      </Container>
    </footer>
  );
}
