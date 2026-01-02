import { useState, useMemo, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function VisitaTab({ churches, prayers }) {
    const [visitaChurches, setVisitaChurches] = useLocalStorage('visitaChurches', []);
    const [visitaProgress, setVisitaProgress] = useLocalStorage('visitaProgress', []);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectionStep, setSelectionStep] = useState(0);
    const [tempSelection, setTempSelection] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    const itineraryRef = useRef(null);

    const stepTitles = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"];

    useEffect(() => {
        if (isSelecting && itineraryRef.current && selectionStep === 7) {
            new Sortable(itineraryRef.current, {
                animation: 200,
                handle: '.drag-handle',
                onEnd: (evt) => {
                    const newArr = [...tempSelection];
                    const [removed] = newArr.splice(evt.oldIndex, 1);
                    newArr.splice(evt.newIndex, 0, removed);
                    setTempSelection(newArr);
                }
            });
        }
    }, [selectionStep, isSelecting]);

    const startSelection = () => {
        setIsSelecting(true);
        setSelectionStep(0);
        setTempSelection(Array(7).fill(null));
    };

    const selectChurchForStep = (churchId, step) => {
        const newSelection = [...tempSelection];
        newSelection[step] = churchId;
        setTempSelection(newSelection);

        const isComplete = newSelection.filter(id => id !== null).length === 7;
        if (isComplete) {
            setSelectionStep(7); // Review
        } else if (step < 6) {
            setSelectionStep(step + 1);
        }
    };

    const confirmSelection = () => {
        setVisitaChurches(tempSelection);
        setVisitaProgress([]);
        setIsSelecting(false);
    };

    const markStationComplete = (index) => {
        if (!visitaProgress.includes(index)) {
            const newProgress = [...visitaProgress, index].sort((a, b) => a - b);
            setVisitaProgress(newProgress);
            if (newProgress.length === 7) {
                setShowCompletionModal(true);
            }
        }
    };

    if (isSelecting) {
        if (selectionStep === 7) {
            // ... Review code ...
            return (
                <div className="h-full flex flex-col bg-white">
                    <div className="sticky top-0 z-40 bg-white border-b border-gray-100 p-4">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <button onClick={() => setSelectionStep(6)} className="text-gray-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-1">
                                <i className="fas fa-arrow-left"></i> Back
                            </button>
                            <div className="text-center">
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Review Selection</p>
                                <h2 className="text-lg font-black italic -mt-1">Your Itinerary</h2>
                            </div>
                            <span className="text-[10px] font-black text-gray-400">7/7</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 pt-4" ref={itineraryRef}>
                        {tempSelection.map((id, idx) => {
                            const church = churches.find(c => c.id === id);
                            return (
                                <div key={id} className="p-5 bg-white border-[0.5px] border-blue-600 rounded-2xl flex items-center gap-4 shadow-sm relative overflow-hidden">
                                    <div className="drag-handle text-gray-200 cursor-grab flex items-center justify-center -ml-1">
                                        <i className="fas fa-grip-vertical text-xl"></i>
                                    </div>
                                    <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-black text-base shadow-md shadow-amber-100 ring-2 ring-white">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-gray-900 text-sm truncate">{church?.Name}</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight flex items-center gap-1">
                                            <i className="fas fa-location-dot"></i> {church?.Location}
                                        </p>
                                    </div>
                                    <button onClick={() => setSelectionStep(idx)} className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-tighter self-start">
                                        <i className="fas fa-edit mr-1"></i> Edit
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="p-4 border-t border-gray-100 bg-white">
                        <button
                            onClick={confirmSelection}
                            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-200 active:scale-95 transition-all text-base flex items-center justify-center gap-2"
                        >
                            Start Journey <i className="fas fa-chevron-right text-sm"></i>
                        </button>
                        <button onClick={() => setSelectionStep(6)} className="w-full text-gray-400 font-black text-[10px] uppercase tracking-widest mt-4">Back to Selection</button>
                    </div>
                </div>
            );
        }

        return (
            <div className="h-full flex flex-col bg-gray-50">
                <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={() => setIsSelecting(false)} className="text-gray-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-1">
                            <i className="fas fa-arrow-left"></i> Back
                        </button>
                        <div className="text-center">
                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Step {selectionStep + 1} of 7</p>
                            <h2 className="text-lg font-black italic -mt-1">Choose {stepTitles[selectionStep]}</h2>
                        </div>
                        <span className="text-[10px] font-black text-gray-400">{tempSelection.filter(id => id !== null).length}/7</span>
                    </div>

                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                        {tempSelection.map((id, idx) => (
                            <div key={idx} onClick={() => setSelectionStep(idx)}
                                className={`px-4 py-2.5 rounded-xl border-2 text-[10px] font-black whitespace-nowrap transition-all flex items-center gap-2 ${selectionStep === idx ? 'bg-blue-50 text-blue-600 border-blue-600 shadow-sm' :
                                        id ? 'bg-white text-blue-600 border-blue-100' : 'bg-gray-50 text-gray-300 border-dashed border-gray-200'
                                    }`}>
                                <span className={`w-4 h-4 rounded-full flex items-center justify-center ${selectionStep === idx ? 'bg-blue-600 text-white' : id ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-400'}`}>{idx + 1}</span>
                                {id ? churches.find(c => c.id === id)?.Name.split(' ')[0] : 'Select'}
                                {id && <i className="fas fa-pencil text-[8px]"></i>}
                            </div>
                        ))}
                    </div>

                    <div className="search-input-wrapper mt-3">
                        <i className="fas fa-search text-gray-400"></i>
                        <input type="text" placeholder="Search churches..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="flex-1 ml-2 outline-none text-sm font-bold bg-transparent" />
                        <i className="fas fa-map-marked-alt text-blue-600 ml-2"></i>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {churches.filter(c => !tempSelection.includes(c.id) && c.Name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(church => (
                            <div key={church.id} onClick={() => selectChurchForStep(church.id, selectionStep)} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-all flex items-center gap-4 group">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 font-black shadow-sm ${church.Diocese === 'Tagbilaran' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-500'}`}>
                                    <i className="fas fa-church"></i>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 text-[13px] leading-tight">{church.Name}</h4>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5"><i className="fas fa-location-dot"></i> {church.Location}</p>
                                </div>
                                <div className="hidden group-active:flex w-8 h-8 rounded-full bg-blue-600 items-center justify-center text-white">
                                    <i className="fas fa-check text-xs"></i>
                                </div>
                            </div>
                        ))}
                </div>

                <div className="p-4 bg-white border-t border-gray-50">
                    <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-gray-200">
                        <i className="fas fa-info-circle text-teal-400"></i> Choose {stepTitles[selectionStep]} Church
                    </button>
                </div>
            </div>
        );
    }

    if (visitaChurches.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center px-8 bg-white">
                <div className="w-24 h-24 bg-blue-600 rounded-[35px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-100 rotate-3 transition-transform hover:rotate-0">
                    <i className="fas fa-cross text-white text-4xl"></i>
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-4 italic tracking-tight">Visita Iglesia</h1>
                <p className="text-sm font-bold text-gray-400 mb-10 max-w-xs mx-auto leading-relaxed">Select 7 sacred churches for your pilgrimage journey. Pray, reflect, and track your progress across Bohol.</p>
                <button onClick={startSelection} className="w-full max-w-xs bg-blue-600 text-white py-5 rounded-3xl font-black shadow-2xl shadow-blue-200 active:scale-95 transition-all text-lg flex items-center justify-center gap-3">
                    <i className="fas fa-plus-circle"></i> Select 7 Churches
                </button>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-slate-50">
            <div className="sticky top-0 z-40 bg-white border-b border-gray-100 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <i className="fas fa-shoe-prints text-blue-600 -rotate-90"></i>
                        <span className="font-black text-[11px] uppercase tracking-widest text-gray-800">Pilgrimage Progress</span>
                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100/50">{visitaProgress.length}/7</span>
                    </div>
                    <button onClick={() => setVisitaChurches([])} className="text-red-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 px-3 py-1 bg-red-50 rounded-lg">
                        <i className="fas fa-redo-alt"></i> Reset
                    </button>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden p-[1px]">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out" style={{ width: `${(visitaProgress.length / 7) * 100}%` }} />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 pb-32 space-y-5 no-scrollbar">
                {/* Blue Hero Card matching Image 4 */}
                <div className="bg-blue-600 rounded-[32px] p-6 shadow-2xl shadow-blue-200 relative overflow-hidden group">
                    <i className="fas fa-cross absolute -top-8 -right-8 text-blue-500/30 text-[180px] -rotate-12 transition-transform group-hover:rotate-0 duration-700"></i>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-black text-white mb-2 italic">Begin Your Pilgrimage</h2>
                        <p className="text-blue-100/80 text-[11px] font-bold mb-6 max-w-[200px] leading-relaxed">Follow these tips and guides for a meaningful visiting experience.</p>
                        <button className="bg-white text-blue-600 px-10 py-3 rounded-2xl font-black text-xs shadow-xl active:scale-95 transition-all">View</button>
                    </div>
                </div>

                {visitaChurches.map((id, index) => {
                    const church = churches.find(c => c.id === id);
                    const isDone = visitaProgress.includes(index);
                    const isNext = !isDone && (index === 0 || visitaProgress.includes(index - 1));

                    return (
                        <div key={id} className={`p-6 rounded-[28px] border-2 transition-all ${isDone ? 'border-blue-600 bg-white opacity-60' : isNext ? 'bg-white border-blue-600 shadow-2xl shadow-blue-100' : 'bg-white border-gray-100 opacity-90'}`}>
                            <div className="flex items-start gap-4">
                                <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-black text-lg shadow-sm border-4 border-slate-50 ${isDone ? 'bg-blue-600 text-white' : isNext ? 'bg-slate-100 text-blue-600' : 'bg-slate-50 text-slate-300'}`}>
                                    {isDone ? <i className="fas fa-check"></i> : index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-black text-gray-900 text-lg leading-tight truncate">{church?.Name}</h3>
                                    </div>
                                    <p className="text-xs text-gray-400 font-bold mt-1 flex items-center gap-1.5 uppercase tracking-tighter">
                                        <i className="fas fa-location-dot text-blue-600"></i> {church?.Location}
                                    </p>

                                    <div className="mt-5 flex gap-2.5">
                                        <button onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${church?.Coords[0]},${church?.Coords[1]}`, '_blank')} className="flex-1 bg-white border border-gray-100 text-blue-600 py-3 rounded-2xl font-black text-[11px] shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2">
                                            <i className="fas fa-paper-plane"></i> Directions
                                        </button>
                                        <button onClick={() => markStationComplete(index)} className="flex-1 bg-blue-600 text-white py-3 rounded-2xl font-black text-[11px] shadow-xl shadow-blue-100 active:scale-95 transition-all flex items-center justify-center gap-2">
                                            <i className="fas fa-cross"></i> Start
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {showCompletionModal && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-xl">
                    <div className="bg-white rounded-[45px] p-2 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-sm animate-scale-in relative border border-white/20">
                        <button onClick={() => setShowCompletionModal(false)} className="absolute top-8 right-8 w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 active:scale-90 transition-transform">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                        <div className="bg-white rounded-[43px] p-10 text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-200 ring-8 ring-blue-50">
                                <i className="fas fa-check text-white text-4xl"></i>
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 mb-2 leading-[0.9] italic">Complete!</h2>
                            <p className="text-gray-400 font-bold mb-10 text-[13px] px-6 leading-relaxed">You have successfully visited the 7 churches of your pilgrimage.</p>

                            <div className="bg-slate-50/80 rounded-[32px] p-8 border border-slate-100 text-left mb-10">
                                <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-5 flex items-center gap-2">
                                    <i className="fas fa-list-check text-blue-600"></i> Pilgrimage Stations
                                </p>
                                <div className="space-y-3">
                                    {visitaChurches.map(id => (
                                        <div key={id} className="flex items-center gap-3 py-1.5 border-b border-slate-100/50 last:border-0">
                                            <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <i className="fas fa-check text-blue-600 text-[8px]"></i>
                                            </div>
                                            <span className="font-bold text-gray-800 text-[11px] truncate">{churches.find(c => c.id === id)?.Name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button onClick={() => setShowCompletionModal(false)} className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-black text-xl active:scale-95 transition-all shadow-2xl shadow-blue-200">Done</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
