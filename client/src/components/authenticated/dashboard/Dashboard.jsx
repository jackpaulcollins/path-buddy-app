import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import MyPaths from '../paths/MyPaths';
import DashboardTimeline from './DashboardTimeline';

function Dahboard() {
  const content = (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardTimeline />} />
      </Routes>
      <Routes>
        <Route path="/my-paths" element={<MyPaths />} />
      </Routes>
    </div>
  );

  return content;
}
export default Dahboard;
