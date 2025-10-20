import {
     CloudUpload,
     Eraser,
     Component,
     Ban,
     AlertTriangle,
} from "lucide-react";
import { Card } from "./ui/card"; // Importando o mesmo Card component

const HowToSection = () => {
     const steps = [
        {
             icon: CloudUpload,
             title: "1. Salve Seus Dados",
             description:
                "Faça backup de fotos, documentos e contatos na nuvem (Google Drive, iCloud) ou em um HD externo.",
        },
        {
             icon: Eraser,
             title: "2. Apague Tudo",
             description:
                "Restaure seu aparelho para as 'Configurações de Fábrica'. Isso protege sua privacidade e apaga dados sensíveis.",
        },
        {
             icon: Component,
             title: "3. Junte os Acessórios",
             description:
                "Separe cabos, carregadores e fones. Se a bateria for interna (celular, notebook), mantenha-a DENTRO do aparelho.",
        },
        {
             icon: Ban,
             title: "4. Não Desmonte",
             description:
                "Nunca tente abrir os aparelhos. Baterias podem vazar ou incendiar. Deixe o manuseio para os profissionais.",
        },
     ];

     return (
        <section className="py-20 bg-background">
             <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                     {/* Header */}
                     <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                             PASSO A PASSO
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                             Como Preparar seu Descarte
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                             Siga estes 4 passos simples antes de levar seu e-lixo ao ponto de
                             coleta. Garanta sua segurança e a de todos no processo.
                        </p>
                     </div>

                     {/* Steps Cards */}
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {steps.map((step) => (
                             <Card
                                key={step.title}
                                className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-gradient-to-br from-card to-muted/20"
                             >
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                     <step.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                     {step.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                     {step.description}
                                </p>
                           </Card>
                        ))}
                     </div>

                     {/* Safety Banner */}
                     <div className="bg-destructive/10 border-l-4 border-destructive rounded-2xl p-8 md:p-12 text-destructive">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                             <AlertTriangle className="w-16 h-16 md:w-10 md:h-10 text-destructive flex-shrink-0" />
                             <div>
                                <h3 className="text-2xl font-bold mb-3 text-destructive-foreground">
                                     Cuidado Especial: Baterias Estufadas!
                                </h3>
                                <p className="text-destructive/90 text-lg leading-relaxed">
                                     Se a bateria do seu celular, notebook ou outro aparelho estiver
                                     visivelmente <strong>inchada</strong>, ela apresenta 
                                     <strong> risco de incêndio</strong>. Manuseie com cuidado,
                                     armazene em local seguro e avise o responsável no ponto de
                                     coleta.
                                </p>
                             </div>
                        </div>
                     </div>
                </div>
             </div>
        </section>
     );
};

export default HowToSection;