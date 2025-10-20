import { Recycle, Github, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Recycle className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Tech Sustentável</span>
              </div>
              <p className="text-background/70 leading-relaxed">
                Facilitando o descarte correto de eletrônicos e promovendo um futuro mais sustentável para todos.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Recursos</h3>
              <ul className="space-y-2 text-background/70">
                <li>
                  <a href="#mapa" className="hover:text-primary transition-colors">
                    Encontrar Pontos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Sobre o Projeto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            {/* Referências */}
            <div>
              <h3 className="font-bold text-lg mb-4">Fontes</h3>
              <ul className="space-y-2 text-background/70 text-sm">
                <li>Ministério do Meio Ambiente (2022)</li>
                <li>Sustentare (2024)</li>
                <li>Correio Braziliense (2024)</li>
                <li>FAEX (2023)</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-background/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-background/60 text-sm">
                © 2025 Tech Sustentável. Desenvolvido com{" "}
                <Heart className="inline w-4 h-4 text-primary" /> para um mundo melhor.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
