'use client';
import { useEffect, useRef, useState } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { MapPin, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { getCollectionPoints } from '../actions'; // <--- IMPORTA A SERVER ACTION

// Interface para os dados do local (vinda da nossa action)
interface FoundPlace {
  id?: string;
  displayName?: {
    languageCode?: string;
    text?: string;
  }
  formattedAddress?: string;
  types?: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
}

// Chave PÚBLICA do environment
const MAPS_JS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_JS_API_KEY || '';

export default function MapSection() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null
  );
  const [foundPoints, setFoundPoints] = useState<FoundPlace[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de loading

  // Esta função AGORA SÓ RENDERIZA OS MARCADORES
  const renderMarkers = (
    places: FoundPlace[],
    currentMap: google.maps.Map,
    iw: google.maps.InfoWindow
  ) => {
    // Limpa marcadores antigos (se necessário no futuro)
    setFoundPoints(places); // Armazena os resultados

    places.forEach((point: FoundPlace) => {
      if (!point.location) {
        return;
      }

      // Precisamos da classe AdvancedMarkerElement
      importLibrary('marker').then((markerLibrary) => {
        const { AdvancedMarkerElement } =
          markerLibrary as google.maps.MarkerLibrary;

        const markerElement = document.createElement('div');
        markerElement.className =
          'w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform';
        markerElement.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        `;

        if (!point.location) {
          return;
        }
        const marker = new AdvancedMarkerElement({
          position: {lat:point.location.latitude, lng:point.location.longitude},
          map: currentMap,
          title: point.displayName?.text || 'Ponto de Coleta',
          content: markerElement,
        });

        const contentString = `
          <div class="p-1 w-48">
            <h3 class="font-bold text-lg mb-1 text-gray-900">${point.displayName?.text}</h3>
            <p class="text-sm text-gray-600 mb-1">${
             point.formattedAddress
            }</p>
            <p class="text-xs text-green-700 font-semibold">
              ${
                point.types
                  ? point.types.map((t) => t.replace(/_/g, ' ')).join(', ')
                  : 'Ponto de Coleta'
              }
            </p>
          </div>
        `;

        marker.addListener('click', () => {
          iw.setContent(contentString);
          iw.open({
            anchor: marker,
            map: currentMap,
          });
        });
      });
    });
  };

  // Esta função SÓ INICIALIZA O MAPA
  const initMap = async (centerCoords: google.maps.LatLngLiteral) => {
    if (!mapContainer.current || map.current) {
      return;
    }

    try {
      setOptions({
        key: MAPS_JS_API_KEY,
        v: 'weekly',
      });

      const { Map, InfoWindow } = (await importLibrary(
        'maps'
      )) as google.maps.MapsLibrary;

      const iw = new InfoWindow();
      setInfoWindow(iw);

      const currentMap = new Map(mapContainer.current, {
        center: centerCoords,
        zoom: 13,
        mapId: 'YOUR_MAP_ID_HERE',
        disableDefaultUI: true,
        zoomControl: true,
      });

      map.current = currentMap;
      return { currentMap, iw }; // Retorna o mapa e o infowindow
    } catch (e) {
      console.error('Erro ao carregar o Google Maps:', e);
      alert('Falha ao carregar o mapa. Verifique a chave de API PÚBLICA.');
      return null;
    }
  };

  // useEffect para carregar o mapa e buscar os dados
  useEffect(() => {
    if (!MAPS_JS_API_KEY) {
      alert(
        'Chave de API do Google Maps (NEXT_PUBLIC_GOOGLE_MAPS_JS_API_KEY) não encontrada.'
      );
      setIsLoading(false);
      return;
    }

    const defaultCoords = { lat: -23.5629, lng: -46.6577 };

    const loadMapAndFetchPoints = (coords: google.maps.LatLngLiteral) => {
      setIsLoading(true);
      initMap(coords)
        .then((mapInit) => {
          if (!mapInit) return; // Falha ao iniciar o mapa

          const { currentMap, iw } = mapInit;

          // AGORA CHAMAMOS A SERVER ACTION
          console.log('Buscando pontos de coleta no servidor...');
          getCollectionPoints(coords)
            .then((places) => {
              console.log('Pontos recebidos do servidor:', places);
              if (places.length > 0) {
                renderMarkers(places, currentMap, iw);
              } else {
                alert(
                  'Nenhum ponto de coleta de eletrônicos encontrado nos 5km próximos da sua localização.'
                );
              }
            })
            .catch((err) => {
              console.error('Erro ao buscar pontos na Action:', err);
              alert('Erro ao buscar pontos de coleta.');
            })
            .finally(() => {
              setIsLoading(false);
            });
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    };

    // Tenta pegar a localização do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log('Localização do usuário obtida:', userCoords);
          loadMapAndFetchPoints(userCoords);
        },
        (error) => {
          console.warn(
            `Erro ao obter geolocalização (${error.code}): ${error.message}`
          );
          alert(
            'Não foi possível obter sua localização. Mostrando pontos de coleta em São Paulo.'
          );
          loadMapAndFetchPoints(defaultCoords);
        }
      );
    } else {
      alert(
        'Seu navegador não suporta geolocalização. Mostrando pontos de coleta em São Paulo.'
      );
      loadMapAndFetchPoints(defaultCoords);
    }
  }, []); // Roda apenas uma vez

  return (
    <section id="mapa" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header (sem alteração) */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              ENCONTRE AGORA
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Pontos de Coleta Próximos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Localize o ponto de coleta mais próximo e faça sua parte pelo meio
              ambiente
            </p>
          </div>

          {/* Map Container (REMOVIDO o input de chave) */}
          <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
            {/* Search Bar (sem alteração) */}
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
            <div className="relative w-full h-[500px]">
              {isLoading && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
                  <p className="text-lg font-medium text-foreground">
                    Carregando mapa e pontos de coleta...
                  </p>
                </div>
              )}
              <div ref={mapContainer} className="w-full h-full" />
            </div>
          </div>

          {/* Collection Points List (sem alteração na lógica) */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {foundPoints.map((point) => (
              <Card
                key={point.id}
                className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">
                      {point.displayName?.text || 'Ponto de Coleta'}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      { point.formattedAddress}
                    </p>
                    {point.types && point.types[0] && (
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium capitalize">
                        {point.types[0].replace(/_/g, ' ')}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}