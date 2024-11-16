import React, { useState, useMemo, useCallback } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

function Sensors() {
    const apiKey = import.meta.env.VITE_API_GOOGLE_KEY;

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: apiKey,
    });

    const [map, setMap] = useState(null);

    const sensorLocations = useMemo(
        () => [
        {
            id: 1,
            name: "Rótula do Taffarel",
            position: { lat: -27.867163090820945, lng: -54.47552397761747 },
        },
        {
            id: 2,
            name: "Estação Cruzeiro",
            position: { lat: -27.86665737404792, lng: -54.43091279859439 },
        },
        ],
        []
    );

    const mapContainerStyle = useMemo(() => ({
        width: "100%",
        height: "500px",
        }),[]
    );

    const center = useMemo(() => ({
        lat: -27.8669,
        lng: -54.453,
        }),[]
    );

    const onLoad = useCallback((mapInstance) => {
        const bounds = new window.google.maps.LatLngBounds();
        sensorLocations.forEach((sensor) => bounds.extend(sensor.position));
        mapInstance.fitBounds(bounds);
        setMap(mapInstance);
    }, [sensorLocations]);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    return isLoaded ? (
        <div className="p-4 justify-center align-middle items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Sensores</h1>
        <p className="text-lg text-gray-600 mb-12">
            Nossos sensores estão estrategicamente posicionados na Rótula do Taffarel e na Estação Cruzeiro,
            coletando dados essenciais para o monitoramento climático. Imagine o impacto que eles poderiam ter
            monitorando locais específicos que são importantes para você. Juntos, podemos levar precisão e
            segurança a qualquer ponto que necessite de atenção.
        </p>

        {/* Mapa do Google */}
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {sensorLocations.map((sensor) => (
            <MarkerF key={sensor.id} position={sensor.position} title={sensor.name} />
            ))}
        </GoogleMap>
        </div>
    ) : (
        <p>Carregando mapa...</p>
    );
}

export default React.memo(Sensors);
