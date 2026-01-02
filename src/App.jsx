import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import BottomNavigation from './components/BottomNavigation';
import MapTab from './components/MapTab';
import DirectoryTab from './components/DirectoryTab';
import VisitaTab from './components/VisitaTab';
import AboutTab from './components/AboutTab';
import BottomSheet from './components/BottomSheet';
import ToastContainer from './components/ToastContainer';
import { useToast } from './hooks/useToast';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('map');
    const [churches, setChurches] = useState([]);
    const [prayers, setPrayers] = useState([]);
    const [visitedChurches, setVisitedChurches] = useLocalStorage('visitedChurches', []);
    const [selectedChurch, setSelectedChurch] = useState(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [specialHeader, setSpecialHeader] = useState(null);
    const { toasts, addToast, removeToast } = useToast();

    // Load data
    useEffect(() => {
        const loadData = async () => {
            try {
                const [churchesRes, prayersRes] = await Promise.all([
                    fetch('/churches.json'),
                    fetch('/prayers.json')
                ]);

                if (!churchesRes.ok || !prayersRes.ok) {
                    throw new Error('Failed to load data');
                }

                const churchesData = await churchesRes.json();
                const prayersData = await prayersRes.json();

                setChurches(churchesData);
                setPrayers(prayersData);

                console.log(`✓ Loaded ${churchesData.length} churches and ${prayersData.length} prayers`);
            } catch (error) {
                console.error('Error loading data:', error);
                addToast('Failed to load church data', 'error');
            } finally {
                setTimeout(() => setLoading(false), 1500);
            }
        };

        loadData();
    }, []);

    const openSheet = (church, header = null) => {
        setSpecialHeader(header);
        setSelectedChurch(church);
        setIsSheetOpen(true);
    };

    const closeSheet = () => {
        setIsSheetOpen(false);
        setTimeout(() => {
            setSelectedChurch(null);
            setSpecialHeader(null);
        }, 300);
    };

    const toggleVisited = (churchId) => {
        setVisitedChurches(prev =>
            prev.includes(churchId)
                ? prev.filter(id => id !== churchId)
                : [...prev, churchId]
        );
    };

    if (loading) {
        return <SplashScreen />;
    }

    return (
        <div className="h-full flex flex-col bg-gray-50">
            {/* Main Content */}
            <main className="flex-1 relative overflow-hidden">
                {activeTab === 'map' && (
                    <MapTab
                        churches={churches}
                        visitedChurches={visitedChurches}
                        onChurchClick={openSheet}
                    />
                )}
                {activeTab === 'directory' && (
                    <DirectoryTab
                        churches={churches}
                        visitedChurches={visitedChurches}
                        onChurchClick={openSheet}
                    />
                )}
                {activeTab === 'visita' && (
                    <VisitaTab
                        churches={churches}
                        prayers={prayers}
                        visitedChurches={visitedChurches}
                        onVisitChurch={toggleVisited}
                    />
                )}
                {activeTab === 'about' && <AboutTab />}
            </main>

            {/* Bottom Navigation */}
            <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Bottom Sheet */}
            <BottomSheet
                isOpen={isSheetOpen}
                church={selectedChurch}
                isVisited={selectedChurch && visitedChurches.includes(selectedChurch.id)}
                onClose={closeSheet}
                SpecialHeader={specialHeader}
                onToggleVisited={() => selectedChurch && toggleVisited(selectedChurch.id)}
            />

            {/* Toast Notifications */}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </div>
    );
}

export default App;
