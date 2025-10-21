import { AlertTriangle, Droplets, Heart, Leaf } from "lucide-react";
import { Card } from "./ui/card";

const ProblemSection = () => {
  const impacts = [
    {
      icon: Droplets,
      title: "Contaminação da Água",
      description: "Metais pesados infiltram no solo e atingem lençóis freáticos",
    },
    {
      icon: Leaf,
      title: "Degradação do Solo",
      description: "Resíduos tóxicos destroem a fertilidade natural do solo",
    },
    {
      icon: Heart,
      title: "Riscos à Saúde",
      description: "Chumbo, mercúrio e cádmio causam danos graves ao organismo",
    },
    {
      icon: AlertTriangle,
      title: "Problema Crescente",
      description: "Apenas 3% do e-lixo brasileiro é descartado corretamente",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              O DESAFIO
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Um Problema Ambiental Urgente
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              O Brasil é o quinto maior gerador de lixo eletrônico do mundo, 
              produzindo cerca de <span className="text-accent font-semibold">11.4kg por habitante ao ano</span>. 
              O descarte inadequado representa uma ameaça real ao meio ambiente e à saúde pública.
            </p>
          </div>

          {/* Impact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {impacts.map((impact, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-gradient-to-br from-card to-muted/20"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <impact.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {impact.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {impact.description}
                </p>
              </Card>
            ))}
          </div>

          {/* Stats Banner */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  A Meta para 2025
                </h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  O governo brasileiro estabeleceu a meta de alcançar <strong>5.000 pontos de coleta</strong> até 2025, 
                  demonstrando a importância de ferramentas que conectem cidadãos a soluções sustentáveis.
                </p>
              </div>
              <div className="text-center md:text-right">
                <div className="text-6xl md:text-7xl font-bold mb-2">5.000</div>
                <div className="text-xl text-white/80">Pontos de Coleta</div>
                <div className="text-white/60 mt-2">Meta Governamental 2025</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
