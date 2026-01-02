export default function BottomNavigation({ activeTab, onTabChange }) {
    const tabs = [
        { id: 'map', icon: 'fa-map-marked-alt', label: 'Maps' },
        { id: 'directory', icon: 'fa-church', label: 'Church' },
        { id: 'visita', icon: 'fa-cross', label: 'Visita' },
        { id: 'about', icon: 'fa-info-circle', label: 'About' },
    ];

    return (
        <nav
            className="border-t border-gray-100/50 flex justify-around items-center px-4 py-1.5 pb-4 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-[2000] flex-shrink-0 bg-white/95 backdrop-blur-md"
            style={{ background: 'linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(239, 246, 255, 0.95))' }}
        >
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex flex-col items-center gap-1 flex-1 transition-all duration-300 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
                        }`}
                >
                    <i className={`fas ${tab.icon} text-lg`}></i>
                    <span className="text-[10px] font-bold uppercase tracking-tighter">
                        {tab.label}
                    </span>
                </button>
            ))}
        </nav>
    );
}
