import { corsHeaders } from '../_shared/cors.ts';

const OPENWEATHER_API_KEY = Deno.env.get('OPENWEATHER_API_KEY') || '56c7ac9091a96119c11a3c2d99debb17';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

interface WeatherRequest {
  type: 'current' | 'forecast' | 'coords';
  city?: string;
  lat?: number;
  lon?: number;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { type, city, lat, lon }: WeatherRequest = await req.json();

    let url: string;
    
    switch (type) {
      case 'current':
        if (!city) {
          throw new Error('City is required for current weather');
        }
        url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
        break;
        
      case 'coords':
        if (lat === undefined || lon === undefined) {
          throw new Error('Latitude and longitude are required for coordinate weather');
        }
        url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
        break;
        
      case 'forecast':
        if (!city) {
          throw new Error('City is required for forecast');
        }
        url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
        break;
        
      default:
        throw new Error('Invalid request type');
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      let errorMessage = `API request failed with status ${response.status}`;
      
      if (response.status === 404) {
        errorMessage = city ? `City "${city}" not found` : 'Location not found';
      } else if (response.status === 401) {
        errorMessage = 'Invalid API key';
      }
      
      return new Response(
        JSON.stringify({ error: errorMessage }),
        {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Weather API Error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});