import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

// Mock data de pontos de coleta
const collectionPoints = [
  {
    id: 1,
    name: "EcoPoint Centro",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    type: "Eletrônicos e Pilhas",
    coords: [-46.6577, -23.5629],
  },
  {
    id: 2,
    name: "GreenTech Vila Mariana",
    address: "Rua Domingos de Morais, 2000 - São Paulo, SP",
    type: "Computadores e Periféricos",
    coords: [-46.6358, -23.5880],
  },
  {
    id: 3,
    name: "ReciclaFácil Pinheiros",
    address: "Rua dos Pinheiros, 500 - São Paulo, SP",
    type: "Celulares e Tablets",
    coords: [-46.6854, -23.5629],
  },
];

const MapSection = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-46.6577, -23.5629], // São Paulo
      zoom: 11,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add markers for collection points
    collectionPoints.forEach((point) => {
      const el = document.createElement("div");
      el.className = "custom-marker";
      el.innerHTML = `
        <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      `;

      new mapboxgl.Marker(el)
        .setLngLat(point.coords as [number, number])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-2">
              <h3 class="font-bold text-lg mb-1">${point.name}</h3>
              <p class="text-sm text-gray-600 mb-1">${point.address}</p>
              <p class="text-xs text-primary font-semibold">${point.type}</p>
            </div>
          `)
        )
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  const handleLoadMap = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
    }
  };

  return (
    <section id="mapa" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              ENCONTRE AGORA
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Pontos de Coleta Próximos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Localize o ponto de coleta mais próximo e faça sua parte pelo meio ambiente
            </p>
          </div>

          {/* Map Container */}
          <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
            {showTokenInput ? (
              <div className="p-12 text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Configure o Mapa Interativo
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Para visualizar o mapa com os pontos de coleta, insira seu token do Mapbox.
                  Você pode obtê-lo gratuitamente em{" "}
                  <a
                    href="https://mapbox.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-semibold"
                  >
                    mapbox.com
                  </a>
                </p>
                <div className="max-w-md mx-auto flex gap-2">
                  <Input
                    type="text"
                    placeholder="Cole seu Mapbox Token aqui"
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleLoadMap} disabled={!mapboxToken.trim()}>
                    Carregar Mapa
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Search Bar */}
                <div className="p-6 bg-background border-b border-border">
                  <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Digite seu endereço ou CEP para encontrar pontos próximos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 py-6 text-lg"
                    />
                  </div>
                </div>

                {/* Map */}
                <div ref={mapContainer} className="w-full h-[500px]" />
              </>
            )}
          </div>

          {/* Collection Points List */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {collectionPoints.map((point) => (
              <Card
                key={point.id}
                className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{point.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{point.address}</p>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                      {point.type}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
