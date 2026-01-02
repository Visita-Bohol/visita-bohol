import { MapContainer, TileLayer, Marker, useMap, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useMemo } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { calculateDistance } from '../utils/helpers';

function MapRefresher({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) map.flyTo(center, zoom || 13);
    }, [center, zoom, map]);
    return null;
}

export default function MapTab({ churches, visitedChurches, onChurchClick }) {
    const { location, getLocation, loading: geoLoading } = useGeolocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [dioceseFilter, setDioceseFilter] = useState('All');
    const [mapCenter] = useState([9.85, 124.15]);

    const filteredChurches = useMemo(() => {
        return churches.filter(church => {
            const matchesSearch = church.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                church.Location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDiocese = dioceseFilter === 'All' || church.Diocese === dioceseFilter;
            return matchesSearch && matchesDiocese;
        });
    }, [churches, searchTerm, dioceseFilter]);

    const createChurchIcon = (church) => {
        const isVisited = visitedChurches.includes(church.id);
        const markerColor = church.Diocese === 'Tagbilaran' ? '#2563eb' : '#f59e0b';

        return L.divIcon({
            className: 'custom-div-icon',
            html: `
                <div class="flex items-center justify-center w-8 h-8 rounded-full ${isVisited ? 'bg-green-500' : ''}" 
                     style="background-color: ${isVisited ? '#22c55e' : markerColor}; border: 2px solid white; color: white; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);">
                    <i class="fas fa-church text-[12px]"></i>
                </div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });
    };

    const findNearest = () => {
        if (!location) {
            getLocation();
            return;
        }

        const churchesWithDistance = churches.map(church => ({
            ...church,
            distance: calculateDistance(location.latitude, location.longitude, church.Coords[0], church.Coords[1])
        }));

        const nearest = churchesWithDistance.sort((a, b) => a.distance - b.distance).slice(0, 3);
        const nearestChurch = nearest[0];

        onChurchClick(nearestChurch, {
            text: `Nearest Church · ${nearestChurch.distance.toFixed(1)} km away`,
            icon: 'fas fa-compass',
            color: 'text-green-600'
        });
    };

    return (
        <div className="h-full w-full relative">
            {/* Floating Top Header matching HTML exactly */}
            <div className="absolute top-0 left-0 right-0 z-[1000] p-4 pointer-events-none">
                <div className="max-w-xl mx-auto space-y-3 pointer-events-auto">
                    <div className="flex gap-2">
                        <div className="search-input-wrapper flex-1 !h-[52px] !rounded-[16px] !shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white border border-gray-100 flex items-center px-4">
                            <i className="fas fa-search text-gray-400 text-sm"></i>
                            <input
                                type="text"
                                placeholder="Search churches..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none font-semibold text-[14px] text-gray-800 ml-3"
                            />
                        </div>
                        <button onClick={getLocation} className="w-[52px] h-[52px] rounded-[16px] bg-white text-blue-600 flex items-center justify-center active:scale-95 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100">
                            <i className={`fas ${geoLoading ? 'fa-spinner fa-spin' : 'fa-location-arrow'} text-lg`}></i>
                        </button>
                        <button onClick={findNearest} className="w-[52px] h-[52px] rounded-[16px] bg-white text-blue-600 flex items-center justify-center active:scale-95 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100">
                            <i className="fas fa-compass text-lg"></i>
                        </button>
                    </div>

                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        {['All', 'Tagbilaran', 'Talibon'].map(d => (
                            <button
                                key={d}
                                onClick={() => setDioceseFilter(d)}
                                className={`px-4 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${dioceseFilter === d ? 'bg-blue-600 text-white shadow-md' : 'bg-white/90 backdrop-blur-md text-[#475569] border border-gray-100 shadow-sm'
                                    }`}
                            >
                                {d === 'All' ? 'All' : `Diocese of ${d}`}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <MapContainer
                center={mapCenter}
                zoom={10}
                className="h-full w-full"
                zoomControl={false}
                attributionControl={false}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {filteredChurches.map((church) => (
                    <Marker
                        key={church.id}
                        position={church.Coords}
                        icon={createChurchIcon(church)}
                        eventHandlers={{ click: () => onChurchClick(church) }}
                    />
                ))}
                {location && (
                    <CircleMarker
                        center={[location.latitude, location.longitude]}
                        radius={7}
                        pathOptions={{ color: 'white', fillColor: '#2563eb', fillOpacity: 0.8, weight: 2 }}
                    />
                )}
                <MapRefresher />
            </MapContainer>

            {/* Map Legend - Match HTML */}
            <div className="absolute bottom-6 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-100 z-[400] text-[10px] font-bold space-y-2">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-white shadow-sm"></span>
                    <span className="text-blue-700">Diocese of Tagbilaran</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white shadow-sm"></span>
                    <span className="text-amber-700">Diocese of Talibon</span>
                </div>
            </div>
        </div>
    );
}
