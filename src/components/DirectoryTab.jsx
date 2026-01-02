import { useState, useMemo, useRef } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { MONTHS, calculateDistance } from '../utils/helpers';
import ChurchCard from './ChurchCard';

export default function DirectoryTab({ churches, visitedChurches, onChurchClick }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [dioceseFilter, setDioceseFilter] = useState('All');
    const { location, getLocation, loading: geoLoading } = useGeolocation();
    const fiestaContainerRef = useRef(null);

    const now = new Date();
    const currentMonth = now.getMonth();
    const today = now.getDate();

    const filteredChurches = useMemo(() => {
        return churches.filter(church => {
            const matchesSearch =
                church.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                church.Location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDiocese = dioceseFilter === 'All' || church.Diocese === dioceseFilter;
            return matchesSearch && matchesDiocese;
        });
    }, [churches, searchTerm, dioceseFilter]);

    const currentMonthChurches = useMemo(() => {
        return filteredChurches
            .filter(c => c.FiestaMonth === currentMonth)
            .sort((a, b) => {
                const getDay = (str) => {
                    const match = str.match(/\d+/);
                    return match ? parseInt(match[0]) : 0;
                };
                const dayA = getDay(a.Fiesta);
                const dayB = getDay(b.Fiesta);
                const scoreA = dayA < today ? dayA + 100 : dayA;
                const scoreB = dayB < today ? dayB + 100 : dayB;
                return scoreA - scoreB;
            });
    }, [filteredChurches, currentMonth, today]);

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
        <div className="h-full overflow-y-auto bg-slate-50 no-scrollbar">
            {/* Inline Header matching HTML */}
            <div className="sticky top-0 z-40 p-4 bg-slate-50/80 backdrop-blur-md">
                <div className="max-w-xl mx-auto space-y-3">
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
                                className={`px-4 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${dioceseFilter === d ? 'bg-blue-600 text-white' : 'bg-[#f1f5f9] text-[#475569]'
                                    }`}
                            >
                                {d === 'All' ? 'All' : `Diocese of ${d}`}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="px-4 pb-32">
                {/* Fiestas this Month Section */}
                {currentMonthChurches.length > 0 && (
                    <div className="mb-6 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h2 className="text-[11px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                                <i className="fas fa-star text-amber-500"></i> Fiestas this Month
                            </h2>
                            <span className="bg-blue-100 text-blue-700 text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-tighter ring-1 ring-blue-200">
                                {MONTHS[currentMonth]}
                            </span>
                        </div>

                        <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 snap-x no-scrollbar scroll-smooth">
                            {currentMonthChurches.map(church => {
                                const isTagbilaran = church.Diocese === 'Tagbilaran';
                                const iconBg = isTagbilaran ? 'bg-blue-600' : 'bg-amber-500';
                                return (
                                    <div
                                        key={church.id}
                                        className="fiesta-card-horizontal rounded-2xl p-4 border border-blue-100/50 shadow-md active:scale-95 transition-all w-[320px] flex-shrink-0 snap-start relative overflow-hidden"
                                        onClick={() => onChurchClick(church)}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-blue-50/50 backdrop-blur-sm -z-10"></div>
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 ${iconBg} text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                                <i className="fas fa-church text-xl"></i>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-black text-gray-900 text-base leading-tight truncate mb-1">{church.Name}</h3>
                                                <p className="text-[10px] font-semibold text-gray-500 truncate flex items-center gap-1.5 uppercase tracking-wide mb-3">
                                                    <i className={`fas fa-location-dot ${isTagbilaran ? 'text-blue-500' : 'text-amber-500'}`}></i> {church.Location}
                                                    <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                                                    <span className={`${isTagbilaran ? 'text-blue-600' : 'text-amber-600'}`}>{church.Fiesta}</span>
                                                </p>

                                                <div className="pt-2 border-t border-gray-100/50">
                                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Sunday Mass</p>
                                                    <p className="text-[10px] font-semibold text-gray-800 flex items-center gap-2">
                                                        <i className={`fas fa-clock ${isTagbilaran ? 'text-blue-400' : 'text-amber-400'}`}></i>
                                                        <span className="truncate">{church.Mass ? church.Mass.split('|')[0].replace('Sun:', '').trim() : 'Schedule varies'}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Discovery Section */}
                <div className="mb-4 px-1">
                    <h2 className="text-[11px] font-black uppercase tracking-widest text-gray-400">Discover All Churches</h2>
                </div>
                <div className="space-y-3 pb-8">
                    {filteredChurches.map(church => (
                        <ChurchCard
                            key={church.id}
                            church={church}
                            isVisited={visitedChurches.includes(church.id)}
                            onClick={() => onChurchClick(church)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
