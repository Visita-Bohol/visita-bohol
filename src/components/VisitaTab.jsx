import { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function VisitaTab({ churches, prayers, visitedChurches, onVisitChurch, onChurchClick }) {
    const [visitaChurches, setVisitaChurches] = useLocalStorage('visitaChurches', []);
    const [visitaProgress, setVisitaProgress] = useLocalStorage('visitaProgress', []);
    const [isSelecting, setIsSelecting] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [tempChurches, setTempChurches] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const completedCount = useMemo(() => visitaProgress.filter(p => p >= 1 && p <= 7).length, [visitaProgress]);
    const hasOpeningDone = visitaProgress.includes(0);

    const startSelection = () => {
        setIsSelecting(true);
        setCurrentStep(0);
        setTempChurches(visitaChurches.length > 0 ? [...visitaChurches] : []);
    };

    const confirmSelection = () => {
        if (tempChurches.filter(id => id).length === 7) {
            setVisitaChurches(tempChurches);
            setIsSelecting(false);
        }
    };

    const resetVisita = () => {
        if (window.confirm('Reset your Visita Iglesia journey? This will clear all progress.')) {
            setVisitaChurches([]);
            setVisitaProgress([]);
        }
    };

    // --- SELECTION UI ---
    if (isSelecting) {
        const stepName = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"][currentStep];
        const filtered = churches.filter(c =>
            c.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.Location.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className="h-full flex flex-col bg-white">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-50">
                    <button onClick={() => setIsSelecting(false)} className="text-gray-500 w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl">
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <div className="text-center">
                        <p className="text-[10px] font-black text-blue-500 uppercase">Step {currentStep + 1} of 7</p>
                        <h2 className="font-black text-gray-900 uppercase text-xs tracking-widest">Choose {stepName} Church</h2>
                    </div>
                    <div className="w-10"></div>
                </div>

                <div className="p-4">
                    <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-2">
                        {[0, 1, 2, 3, 4, 5, 6].map(idx => (
                            <button
                                key={idx}
                                onClick={() => setCurrentStep(idx)}
                                className={`w-12 h-12 flex-shrink-0 rounded-2xl flex items-center justify-center font-bold text-sm transition-all border-2 ${currentStep === idx ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-lg shadow-blue-100' :
                                        tempChurches[idx] ? 'border-blue-500 bg-blue-600 text-white' : 'border-gray-100 bg-gray-50 text-gray-400'
                                    }`}
                            >
                                {tempChurches[idx] ? <i className="fas fa-check"></i> : idx + 1}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1 bg-gray-100 rounded-[16px] px-4 flex items-center h-12">
                            <i className="fas fa-search text-gray-400 text-sm"></i>
                            <input
                                className="bg-transparent border-none outline-none ml-3 text-[13px] font-semibold w-full"
                                placeholder="Search for a parish..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-24">
                    {filtered.map(church => {
                        const isPicked = tempChurches.includes(church.id);
                        return (
                            <div
                                key={church.id}
                                onClick={() => {
                                    const newTemp = [...tempChurches];
                                    newTemp[currentStep] = church.id;
                                    setTempChurches(newTemp);
                                    if (currentStep < 6) setCurrentStep(currentStep + 1);
                                }}
                                className={`p-4 rounded-3xl border transition-all ${isPicked ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-blue-50 shadow-sm active:scale-95'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${isPicked ? 'bg-gray-400' : 'bg-blue-600'}`}>
                                        <i className="fas fa-church text-lg"></i>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-black text-gray-900 text-sm truncate uppercase">{church.Name}</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1">
                                            <i className="fas fa-location-dot"></i> {church.Location}
                                        </p>
                                    </div>
                                    {isPicked && <span className="text-[9px] font-black text-gray-400 bg-gray-100 px-2 py-1 rounded-md">PICKED</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {tempChurches.filter(id => id).length === 7 && (
                    <div className="fixed bottom-24 inset-x-4">
                        <button
                            onClick={confirmSelection}
                            className="w-full bg-blue-600 text-white py-4 rounded-[20px] font-black shadow-2xl shadow-blue-200 animate-bounce"
                        >
                            Save Your Route
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // --- MAIN VISITA UI ---
    if (visitaChurches.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50 animate-fadeIn">
                <div className="w-24 h-24 bg-blue-600 rounded-[35px] flex items-center justify-center mb-8 shadow-2xl rotate-3">
                    <i className="fas fa-cross text-white text-4xl"></i>
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-4 italic">Visita Iglesia</h1>
                <p className="text-gray-500 text-sm mb-12 font-bold max-w-xs leading-relaxed uppercase tracking-widest px-4">
                    Select 7 churches to begin your holy week pilgrimage.
                </p>
                <button
                    onClick={startSelection}
                    className="w-full max-w-xs bg-blue-600 text-white py-5 rounded-[28px] font-black text-lg shadow-2xl active:scale-95 transition-all uppercase tracking-widest"
                >
                    Choose Churches
                </button>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto bg-gray-50 no-scrollbar pb-32">
            <div className="sticky top-0 z-50 p-5 bg-white/90 backdrop-blur-md border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <i className="fas fa-route text-blue-600"></i>
                        <span className="font-black text-[11px] text-gray-900 uppercase tracking-[0.2em]">Pilgrimage</span>
                    </div>
                    <button onClick={resetVisita} className="text-red-600 text-[10px] font-bold px-3 py-1.5 bg-red-50 rounded-xl flex items-center gap-1.5 uppercase transition-all active:scale-90">
                        <i className="fas fa-redo"></i> Reset
                    </button>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Progress</span>
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{completedCount}/7</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full transition-all duration-1000" style={{ width: `${(completedCount / 7) * 100}%` }}></div>
                </div>
            </div>

            <div className="p-5 space-y-4">
                {/* 1. Opening Prayer */}
                <div className="bg-blue-600 rounded-[32px] p-6 text-white shadow-xl shadow-blue-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><i className="fas fa-cross text-6xl"></i></div>
                    <h3 className="font-black text-xl mb-1 leading-tight">Start Your Journey</h3>
                    <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mb-6 leading-tight">Opening Prayer & Guide</p>
                    <button
                        onClick={() => {
                            const p = prayers[0];
                            onChurchClick({ Name: p.title, History: p.prayer, id: 'opening', Coords: [9.85, 124.1], Diocese: 'Instruction' }, { text: 'VISITA IGLESIA', icon: 'fas fa-cross', color: 'text-blue-600' });
                            if (!visitaProgress.includes(0)) setVisitaProgress(prev => [...prev, 0]);
                        }}
                        className="w-full bg-white text-blue-600 py-3 rounded-2xl font-black text-sm shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <i className="fas fa-book-open"></i> {visitaProgress.includes(0) ? 'Read Guide' : 'Open Guide'}
                    </button>
                </div>

                {/* 2. Churches */}
                {visitaChurches.map((id, index) => {
                    const church = churches.find(c => c.id === id);
                    if (!church) return null;
                    const prayerIdx = index + 1;
                    const isDone = visitaProgress.includes(prayerIdx);

                    return (
                        <div key={id} className={`p-5 rounded-[32px] border transition-all relative overflow-hidden ${isDone ? 'bg-white border-green-100' : 'bg-white border-blue-50 shadow-sm'}`}>
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg border-4 border-white shadow-md flex-shrink-0 ${isDone ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                                    {isDone ? <i className="fas fa-check"></i> : index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-black text-gray-900 text-sm truncate uppercase mb-1">{church.Name}</h4>
                                    <p className="text-[9px] font-bold text-gray-400 uppercase flex items-center gap-1.5 mb-4">
                                        <i className="fas fa-location-dot"></i> {church.Location}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                window.open(`https://www.google.com/maps/dir/?api=1&destination=${church.Coords[0]},${church.Coords[1]}`, '_blank');
                                            }}
                                            className="flex-1 bg-gray-50 text-gray-600 py-2.5 rounded-xl text-[10px] font-bold active:scale-95 transition-all border border-gray-100 flex items-center justify-center gap-1.5"
                                        >
                                            <i className="fas fa-paper-plane"></i> Directions
                                        </button>
                                        <button
                                            onClick={() => {
                                                const p = prayers[prayerIdx];
                                                onChurchClick({ ...church, Name: p.title, History: p.prayer }, { text: `STATION ${prayerIdx}`, icon: 'fas fa-book-open', color: 'text-blue-600' });
                                                if (!isDone) setVisitaProgress(prev => [...prev, prayerIdx]);
                                            }}
                                            className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-[10px] font-black active:scale-95 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-1.5"
                                        >
                                            <i className="fas fa-praying-hands"></i> {isDone ? 'Read Again' : 'Start Prayer'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* 3. Closing Prayer */}
                {completedCount === 7 && (
                    <div className="bg-amber-500 rounded-[32px] p-6 text-white shadow-xl shadow-amber-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10"><i className="fas fa-crown text-6xl"></i></div>
                        <h3 className="font-black text-xl mb-1 leading-tight">Final Step</h3>
                        <p className="text-amber-100 text-[10px] font-bold uppercase tracking-widest mb-6 leading-tight">Closing Prayer</p>
                        <button
                            onClick={() => {
                                const p = prayers[8];
                                onChurchClick({ Name: p.title, History: p.prayer, id: 'closing', Coords: [9.85, 124.1], Diocese: 'Final' }, { text: 'PILGRIMAGE COMPLETE', icon: 'fas fa-crown', color: 'text-amber-500' });
                                if (!visitaProgress.includes(8)) setVisitaProgress(prev => [...prev, 8]);
                            }}
                            className="w-full bg-white text-amber-600 py-3 rounded-2xl font-black text-sm shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <i className="fas fa-book-open"></i> {visitaProgress.includes(8) ? 'Read Again' : 'Confirm Completion'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
