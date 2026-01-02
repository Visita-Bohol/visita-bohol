import { getDioceseBadgeClasses } from '../utils/helpers';

export default function ChurchCard({ church, isVisited, onClick }) {
    const isTagbilaran = church.Diocese === 'Tagbilaran';
    const iconBg = isTagbilaran ? 'bg-blue-600' : 'bg-amber-500';

    const SundayMass = church.Mass ? church.Mass.split('|')[0].replace('Sun:', '').trim() : 'Schedule varies';

    return (
        <div
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3 active:scale-[0.98] transition-all"
            onClick={onClick}
        >
            <div className="flex items-start gap-3 mb-4">
                <div className={`w-12 h-12 ${isVisited ? 'bg-green-600' : iconBg} text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-gray-100`}>
                    <i className="fas fa-church text-xl"></i>
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-black text-gray-900 text-base leading-tight truncate mb-1">{church.Name}</h3>
                    <p className="text-[10px] font-bold text-gray-500 flex items-center gap-1.5 uppercase tracking-wide">
                        <i className={`fas fa-location-dot ${isTagbilaran ? 'text-blue-500' : 'text-amber-500'}`}></i> {church.Location}
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className={`${isTagbilaran ? 'text-blue-600' : 'text-amber-600'}`}>{church.Fiesta}</span>
                    </p>

                    <div className="mt-3 pt-3 border-t border-gray-50">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 leading-none">Sunday Mass</p>
                        <p className="text-[10px] font-bold text-gray-700 flex items-center gap-1.5">
                            <i className={`fas fa-clock ${isTagbilaran ? 'text-blue-400' : 'text-amber-400'}`}></i> {SundayMass}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-2.5">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://www.google.com/maps/dir/?api=1&destination=${church.Coords[0]},${church.Coords[1]}`, '_blank');
                    }}
                    className="flex-1 bg-white border border-gray-100 text-blue-600 py-3 rounded-xl font-bold text-xs shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                    <i className="fas fa-paper-plane"></i> Directions
                </button>
                <button
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-black text-xs shadow-lg shadow-blue-100 flex items-center justify-center gap-2 active:scale-95 transition-all"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                >
                    <i className="fas fa-map"></i> View Map
                </button>
            </div>
        </div>
    );
}
