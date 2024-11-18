import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2"; // Para gráficos
import { CloudRain, Drop, Thermometer, Waveform, ArrowsCounterClockwise} from "@phosphor-icons/react"; // Ícones de clima da biblioteca Phosphor

// Importar e registrar os elementos do Chart.js necessários
    import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from "chart.js";

    // Registre as escalas e elementos necessários
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    function Home() {
        const [cruzeiroRecent, setCruzeiroRecent] = useState([]);
        const [taffarelRecent, setTaffarelRecent] = useState([]);
        const [averageCruzeiroLast7Days, setAverageCruzeiroLast7Days] = useState([]);
        const [averageTaffarelLast7Days, setAverageTaffarelLast7Days] = useState([]);
        const [selectedStation, setSelectedStation] = useState("cruzeiro");
        const [loading, setLoading] = useState(true);

        const fetchData = async () => {
            setLoading(true);
            try {
                const recentResponse = await fetch("http://localhost:3000/api/estacao-cruzeiro/recent");
                const recentData = await recentResponse.json();
                setCruzeiroRecent(recentData);
    
                const taffarelResponse = await fetch("http://localhost:3000/api/rotula-taffarel/recent");
                const taffarelData = await taffarelResponse.json();
                setTaffarelRecent(taffarelData);
    
                const averageCruzeiroResponse = await fetch("http://localhost:3000/api/estacao-cruzeiro/average-last-7-days");
                const averageCruzeiroData = await averageCruzeiroResponse.json();
                setAverageCruzeiroLast7Days(averageCruzeiroData);
    
                const averageTaffarelResponse = await fetch("http://localhost:3000/api/rotula-taffarel/average-last-7-days");
                const averageTaffarelData = await averageTaffarelResponse.json();
                setAverageTaffarelLast7Days(averageTaffarelData);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        };
    
        useEffect(() => {
            fetchData();
        }, []);
    
    const lastCruzeiroRecord = cruzeiroRecent?.[cruzeiroRecent.length - 1] || {};
    const lastTaffarelRecord = taffarelRecent?.[taffarelRecent.length - 1] || {};

    const getWindDirection = (degrees) => {
        if (degrees >= 337.5 || degrees < 22.5) return "Norte";
        if (degrees >= 22.5 && degrees < 67.5) return "Nordeste";
        if (degrees >= 67.5 && degrees < 112.5) return "Leste";
        if (degrees >= 112.5 && degrees < 157.5) return "Sudeste";
        if (degrees >= 157.5 && degrees < 202.5) return "Sul";
        if (degrees >= 202.5 && degrees < 247.5) return "Sudoeste";
        if (degrees >= 247.5 && degrees < 292.5) return "Oeste";
        if (degrees >= 292.5 && degrees < 337.5) return "Noroeste";
        return "";
    };

    if (loading) return <p>Carregando...</p>;

    const temperatureData = selectedStation === "cruzeiro" 
        ? {
            labels: averageCruzeiroLast7Days
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((record) => {
                    const date = new Date(record.date);
                    return date.toLocaleDateString("pt-BR"); // Formato 'dd/mm/aaaa'
                }),
            datasets: [
                {
                    label: "Temperatura (°C)",
                    data: averageCruzeiroLast7Days
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((record) => record.avg_temperature),
                    borderColor: "#3498db", // Cor Azul
                    backgroundColor: "rgba(52, 152, 219, 0.2)", // Azul claro
                    fill: true,
                },
            ],
        }
        : {
            labels: averageTaffarelLast7Days
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((record) => {
                    const date = new Date(record.date);
                    return date.toLocaleDateString("pt-BR"); // Formato 'dd/mm/aaaa'
                }),
            datasets: [
                {
                    label: "Temperatura (°C)",
                    data: averageTaffarelLast7Days
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((record) => record.avg_temperature),
                    borderColor: "#3498db", // Cor Azul
                    backgroundColor: "rgba(52, 152, 219, 0.2)", // Azul claro
                    fill: true,
                },
            ],
        };

    const toggleStation = () => {
        setSelectedStation((prevState) => (prevState === "cruzeiro" ? "taffarel" : "cruzeiro"));
    };

    return (
        <div className="p-4 justify-center align-middle items-center">
            <div className="flex justify-between mb-4 items-center align-middle text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Home</h1>
                <button onClick={fetchData} disabled={loading} className="px-2 text-center flex py-2 max-h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    <p>Atualizar</p>
                </button>
            </div>
            
            {/* Container Principal */}
            <div className="text-gray-600 space-y-8">
                <div className="grid grid-cols-2 gap-4">
                    {/* Rótula do Taffarel */}
                    <div className="bg-blue-50 p-4 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Rótula do Taffarel</h3>
                        {taffarelRecent.length > 0 ? (
                            <div className="space-y-2">
                                <p>
                                    <Thermometer size={24} className="inline mr-2" /> <strong>Temperatura:</strong>{" "}
                                    {lastTaffarelRecord.temperature}°C
                                </p>
                                <p>
                                    <Drop size={24} className="inline mr-2" /> <strong>Umidade:</strong> {lastTaffarelRecord.humidity}%
                                </p>
                                <p>
                                    <Waveform size={24} className="inline mr-2" /> <strong>Ruído:</strong> {lastTaffarelRecord.noise} dB
                                </p>
                                <p>
                                    <strong>Hora da Leitura:</strong> {lastTaffarelRecord.time}
                                </p>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">Sem dados disponíveis.</p>
                        )}
                    </div>
                    {/* Estacao Cruzeiro */}
                    <div className="bg-blue-50 p-4 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Estação Cruzeiro</h3>
                        {cruzeiroRecent.length > 0 ? (
                            <div className="space-y-2">
                                <p>
                                    <Thermometer size={24} className="inline mr-2" /> <strong>Temperatura:</strong>{" "}
                                    {lastCruzeiroRecord.emw_temperature}°C
                                </p>
                                <p>
                                    <Drop size={24} className="inline mr-2" /> <strong>Umidade:</strong> {lastCruzeiroRecord.emw_humidity}%
                                </p>
                                <p>
                                    <CloudRain size={24} className="inline mr-2" /> <strong>Nível de chuva:</strong> {lastCruzeiroRecord.emw_rain_lvl} mm (**acumulado)
                                </p>
                                <p>
                                    <strong>Hora da Leitura:</strong> {lastCruzeiroRecord.time}
                                </p>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">Sem dados disponíveis.</p>
                        )}
                    </div>
                </div>

                {/* Gráfico de Temperatura */}
                <div className="p-6 rounded-lg shadow-lg w-full bg-blue-50 mx-auto">
                    <div className="flex flex-row justify-between">
                        <h3 className="text-xl font-semibold mb-4">
                            Temperatura nos Últimos Dias ({selectedStation === "cruzeiro" ? "Estação Cruzeiro" : "Rótula Taffarel"})
                        </h3>
                        <button
                            onClick={toggleStation}
                            className="px-4 py-2 max-w-[200px] bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            {selectedStation === "cruzeiro" ? "Rótula Taffarel" : "Estação Cruzeiro"}
                        </button>
                    </div>
                    <div style={{ height: "300px" }}>
                        <Line
                            data={temperatureData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>

                {/* Dados do Vento */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold">Direção do Vento</h3>
                        <p>
                            Direção do vento: ({lastCruzeiroRecord.emw_wind_direction}°) {getWindDirection(lastCruzeiroRecord.emw_wind_direction)}
                        </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold">Rajada do Vento</h3>
                        <p>{lastCruzeiroRecord.emw_gust_wind_speed} m/s</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold">Velocidade Média do Vento</h3>
                        <p>{lastCruzeiroRecord.emw_avg_wind_speed} m/s</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
