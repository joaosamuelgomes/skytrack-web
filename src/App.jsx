import React, { useState, useCallback } from 'react';
import { Cloud, House, Circuitry, UserCircle, Phone } from '@phosphor-icons/react';
import Home from './pages/Home';
import Sensors from './pages/Sensors';
import WhoAreWe from './pages/WhoAreWe';
import Contact from './pages/Contact';

function App() {
  const [activeSection, setActiveSection] = useState('Home');

  const renderContent = useCallback(() => {
    switch (activeSection) {
      case 'Home':
        return <Home />;
      case 'Sensores':
        return <Sensors />;
      case 'Quem somos?':
        return <WhoAreWe />;
      case 'Contato':
        return <Contact />;
      default:
        return <Home />;
    }
  }, [activeSection]);

  return (
    <div className="h-screen flex">
      {/* Menu Lateral */}
      <aside className="bg-[#10A3D9] w-1/5 h-full p-4 text-white">
        <div className="flex align-middle items-center gap-2 mb-12 justify-center">
          <Cloud size={48} />
          <h2 className="text-4xl font-bold">SkyTrack</h2>
        </div>
        <ul className="flex flex-col align-middle justify-center min-w-max items-center">
          {[
            { label: 'HOME', icon: <House color="#FFFFFF" size={24} weight="fill" />, section: 'Home' },
            { label: 'SENSORES', icon: <Circuitry color="#FFFFFF" size={24} weight="fill" />, section: 'Sensores' },
            { label: 'QUEM SOMOS?', icon: <UserCircle color="#FFFFFF" size={24} weight="fill" />, section: 'Quem somos?' },
            { label: 'CONTATO', icon: <Phone color="#FFFFFF" size={24} weight="fill" />, section: 'Contato' },
          ].map((item) => (
            <li
              key={item.section}
              className={`mb-4 w-full px-4 py-2 rounded-md ${activeSection === item.section ? 'bg-[#0F91C1]' : ''}`}
            >
              <div className="flex gap-2 align-middle items-center">
                {item.icon}
                <button onClick={() => setActiveSection(item.section)} className="text-left w-full text-lg">
                  {item.label}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Conteúdo Principal */}
      <main className="bg-white w-4/5 h-full p-8 rounded-l-[16px] shadow-2xl">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;