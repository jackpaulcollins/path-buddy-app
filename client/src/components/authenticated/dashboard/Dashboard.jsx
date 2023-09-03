import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import NewPath from '../paths/NewPath';
import DashboardTimeline from './DashboardTimeline';

function Dahboard() {
  const content = (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardTimeline />} />
      </Routes>
      <Routes>
        <Route path="/new-path" element={<NewPath />} />
      </Routes>
    </div>
  );

  return content;
}
export default Dahboard;
