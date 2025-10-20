import { Award, Shield, Sparkles, Users } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Proteção Ambiental",
      description: "Evite a contaminação do solo e da água com metais pesados tóxicos",
    },
    {
      icon: Users,
      title: "Impacto Social",
      description: "Contribua para comunidades mais saudáveis e conscientes",
    },
    {
      icon: Sparkles,
      title: "Economia Circular",
      description: "Materiais reciclados voltam à cadeia produtiva de forma sustentável",
    },
    {
      icon: Award,
      title: "Responsabilidade",
      description: "Faça parte da solução e seja exemplo de cidadania ambiental",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4">
              BENEFÍCIOS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Por Que Descartar Corretamente?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              O descarte adequado de eletrônicos gera impactos positivos para o meio ambiente, 
              a sociedade e o futuro do planeta
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex gap-6 p-8 rounded-2xl bg-gradient-to-br from-card to-muted/20 border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Box */}
          <div className="mt-16 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Junte-se ao Movimento
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Cada dispositivo descartado corretamente é um passo em direção a um futuro mais sustentável
            </p>
            <div className="flex flex-wrap gap-8 justify-center text-left">
              <div>
                <div className="text-4xl font-bold mb-1">97%</div>
                <div className="text-white/80">ainda descartam incorretamente</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">5.000</div>
                <div className="text-white/80">meta de pontos até 2025</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">3.400+</div>
                <div className="text-white/80">pontos já disponíveis</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
