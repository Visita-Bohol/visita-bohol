import { useState, useEffect } from 'react';

export default function AddChurchModal({ isOpen, onClose, coordinates }) {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        massSchedule: '',
        fiestaDate: '',
        fbPage: '',
        history: ''
    });

    // Reset form when opening
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: '',
                location: '',
                massSchedule: '',
                fiestaDate: '',
                fbPage: '',
                history: ''
            });
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construct mailto link
        const subject = encodeURIComponent("Add Missing Church Report");
        const body = encodeURIComponent(`
Church Name: ${formData.name}
Location: ${formData.location}
Coordinates: ${coordinates ? `${coordinates.lat}, ${coordinates.lng}` : 'Not set'}
Mass Schedule: ${formData.massSchedule}
Fiesta Date: ${formData.fiestaDate}
Facebook Page: ${formData.fbPage}
History: ${formData.history}
        `);

        window.open(`mailto:?subject=${subject}&body=${body}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-[32px] p-0 w-full max-w-lg shadow-2xl overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="bg-amber-400 p-6 pt-8 pb-10 relative flex-shrink-0">
                    <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/10 text-white flex items-center justify-center hover:bg-black/20 transition-colors">
                        <i className="fas fa-times text-lg"></i>
                    </button>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4 text-amber-500 text-2xl">
                            <i className="fas fa-map-pin"></i>
                        </div>
                        <h2 className="text-2xl font-black text-white text-center">Add Missing Church</h2>
                        <p className="text-amber-100 text-xs font-bold uppercase tracking-widest mt-1">Help us improve the map</p>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Church Name</label>
                            <input
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all placeholder:font-medium placeholder:text-gray-400"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. San Isidro Labrador Parish"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Location / Town</label>
                            <input
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all placeholder:font-medium placeholder:text-gray-400"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                placeholder="e.g. Tabalong, Dauis"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Mass Schedule (Optional)</label>
                            <textarea
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all placeholder:font-medium placeholder:text-gray-400 min-h-[80px]"
                                value={formData.massSchedule}
                                onChange={e => setFormData({ ...formData, massSchedule: e.target.value })}
                                placeholder="e.g. Sun: 6am, 8am, 5pm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Fiesta Date (Optional)</label>
                            <input
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all placeholder:font-medium placeholder:text-gray-400"
                                value={formData.fiestaDate}
                                onChange={e => setFormData({ ...formData, fiestaDate: e.target.value })}
                                placeholder="e.g. May 15"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Facebook Page (Optional)</label>
                            <input
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all placeholder:font-medium placeholder:text-gray-400"
                                value={formData.fbPage}
                                onChange={e => setFormData({ ...formData, fbPage: e.target.value })}
                                type="url"
                                placeholder="https://facebook.com/..."
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">History (Optional)</label>
                            <textarea
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all placeholder:font-medium placeholder:text-gray-400 min-h-[80px]"
                                value={formData.history}
                                onChange={e => setFormData({ ...formData, history: e.target.value })}
                                placeholder="Brief history notes..."
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Coordinates</label>
                            <div className="relative">
                                <input
                                    className="w-full bg-gray-100 border border-gray-200 rounded-2xl p-4 pl-10 text-sm font-bold text-gray-600 outline-none"
                                    value={coordinates ? `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}` : ''}
                                    readOnly
                                />
                                <i className="fas fa-map-marker-alt absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-amber-500 text-white font-black text-lg py-4 rounded-2xl hover:bg-amber-600 active:scale-95 transition-all shadow-xl shadow-amber-200 mt-2">
                            Submit Details
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
