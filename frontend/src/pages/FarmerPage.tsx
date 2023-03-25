import { GiFarmTractor, GiFarmer, GiWheat } from 'react-icons/gi';

function FarmerPage() {
  return (
    <div className="FarmerPage">
      <nav className="NavBar">
        <GiFarmTractor />
        <h1>The Bestest Farm Management System&#8482;</h1>
      </nav>

      <main>
        {/* CONTROL PANEL */}
        <div className="ControlPanel">
          <h2><GiFarmer /> Control Panel</h2>
        </div>

        {/* DISPLAY PANEL */}
        <div className="DisplayPanel">
          <h2><GiWheat /> Display Panel</h2>

        </div>
      </main>
    </div>
  );
}

export default FarmerPage;
