// app/actions.ts
'use server';

// Interface (sem alteração)
interface Place {
  id?: string;
  displayName?: {
    languageCode?: string;
    text?: string;
  };
  formattedAddress?: string;
  types?: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
}

interface ApiResponse {
  places: Place[];
}

// A Server Action que será chamada pelo cliente
export async function getCollectionPoints(
  coords: google.maps.LatLngLiteral
): Promise<Place[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    throw new Error('Google Places API key is not configured');
  }

  const url = 'https://places.googleapis.com/v1/places:searchText';

  const fieldMask = [
    'places.id',
    'places.displayName',
    'places.formattedAddress',
    'places.types',
    'places.location',
  ].join(',');

  // ==========================================================
  // CÁLCULO DO RETÂNGULO
  // ==========================================================

  // Raio de 2.5km (metade do "diâmetro" de 5km)
  const distanceInKm = 5; 
  
  // Constantes para conversão (aproximado)
  const latPerKm = 1 / 110.574; // Graus de latitude por km
  const lonPerKm = 1 / (111.320 * Math.cos(coords.lat * (Math.PI / 180))); // Graus de longitude por km

  const latOffset = distanceInKm * latPerKm;
  const lonOffset = distanceInKm * lonPerKm;

  const lowLat = coords.lat - latOffset;
  const lowLng = coords.lng - lonOffset;
  const highLat = coords.lat + latOffset;
  const highLng = coords.lng + lonOffset;

  // ==========================================================
  // CORREÇÃO: Usando 'locationRestriction' com 'rectangle'
  // ==========================================================
  const requestBody = {
    textQuery: 'ponto de coleta de eletrônicos reciclagem',

    locationRestriction: {
      rectangle: {
        low: {
          latitude: lowLat,
          longitude: lowLng,
        },
        high: {
          latitude: highLat,
          longitude: highLng,
        },
      },
    },
    pageSize: 20,
    rankPreference: "DISTANCE"
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fieldMask,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Google Places API Error:', error);
      throw new Error(`Places API request failed: ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();
    return data.places || []; // Retorna apenas o array de 'places'
  } catch (error) {
    console.error('Error fetching collection points:', error);
    return []; // Retorna um array vazio em caso de erro
  }
}