export default function AboutTab() {
    return (
        <div className="h-full overflow-y-auto bg-slate-50 no-scrollbar">
            <div className="max-w-md mx-auto px-6 pt-12 pb-32 space-y-8">
                {/* App Header */}
                <div className="text-center">
                    <div className="relative inline-block">
                        <div className="w-24 h-24 bg-blue-600 rounded-[35px] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-200 rotate-3">
                            <i className="fas fa-church text-white text-4xl"></i>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-amber-500 rounded-full border-4 border-white flex items-center justify-center text-white text-[10px]">
                            <i className="fas fa-check"></i>
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-1 italic tracking-tight">Visita Bohol</h2>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">Premium Edition • v1.0.0</p>
                </div>

                {/* Main Feature Cards */}
                <div className="grid gap-5">
                    <div className="bg-white rounded-[32px] p-6 shadow-2xl shadow-blue-900/5 border border-white relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                                <i className="fas fa-envelope-open-text"></i>
                            </div>
                            <div>
                                <h3 className="font-black text-gray-900 text-lg mb-1">Send Feedback</h3>
                                <p className="text-xs font-bold text-gray-400 leading-relaxed mb-6">Inaccurate details? Help us keep the directory updated for the community.</p>
                                <a href="mailto:feedback.visitabohol@gmail.com" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black text-xs shadow-xl shadow-blue-100 active:scale-95 transition-all w-full">
                                    <i className="fas fa-paper-plane"></i> REPORT INACCURACY
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] p-8 shadow-2xl shadow-blue-900/5 border border-white">
                        <h3 className="font-black text-gray-900 text-lg mb-4 flex items-center gap-2">
                            <i className="fas fa-info-circle text-blue-600"></i> About Project
                        </h3>
                        <p className="text-sm font-bold text-gray-500 leading-relaxed mb-6">
                            Visita Bohol is a community-driven initiative to list and verify all Catholic Parishes across the beautiful island of Bohol.
                        </p>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-[10px]">
                                    <i className="fas fa-map"></i>
                                </div>
                                <span className="text-[11px] font-black text-gray-700">Digital Church Directory</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center text-[10px]">
                                    <i className="fas fa-calendar-check"></i>
                                </div>
                                <span className="text-[11px] font-black text-gray-700">Verified Mass Schedules</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-500 flex items-center justify-center text-[10px]">
                                    <i className="fas fa-location-crosshairs"></i>
                                </div>
                                <span className="text-[11px] font-black text-gray-700">Interactive Pilgrimage Guide</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="text-center pt-8 opacity-40">
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Proudly made for</p>
                    <p className="text-[10px] font-black text-gray-800 mt-1 uppercase">Diocese of Tagbilaran • Diocese of Talibon</p>
                </div>
            </div>
        </div>
    );
}
