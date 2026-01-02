import { useState, useEffect } from 'react';

export default function SplashScreen() {
    const [visible, setVisible] = useState(true);

    return (
        <div className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`flex flex-col items-center text-center px-6 transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-2xl sm:rounded-3xl flex items-center justify-center text-white text-3xl sm:text-4xl shadow-2xl mb-6 shadow-blue-200">
                    <i className="fas fa-church"></i>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-gray-900 mb-2">
                    Visita Bohol
                </h1>
                <p className="text-gray-500 font-medium text-xs sm:text-sm tracking-wide">
                    Catholic Church Finder & Visita Iglesia App
                </p>
            </div>
        </div>
    );
}
