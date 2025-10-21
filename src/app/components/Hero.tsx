import { ArrowRight, Recycle } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  const scrollToMap = () => {
    document.getElementById("mapa")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-10 pb-20 min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary ">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary-glow/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon badge */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-8 animate-bounce">
            <Recycle className="w-10 h-10 text-white" />
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Descarte Correto,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              Futuro Sustentável
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Encontre pontos de coleta de lixo eletrônico próximos a você e contribua para um planeta mais limpo
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={scrollToMap}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Encontrar Pontos de Coleta
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-foreground hover:bg-white/10 backdrop-blur-sm"
            >
              Saiba Mais
            </Button>
          </div>

          {/* Stats preview */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">3.400+</div>
              <div className="text-white/80">Pontos de Coleta</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">1.200</div>
              <div className="text-white/80">Municípios Atendidos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">11.4kg</div>
              <div className="text-white/80">E-lixo por Habitante/Ano</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
