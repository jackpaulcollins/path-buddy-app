import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import MyPaths from '../paths/MyPaths';
import DashboardTimeline from './DashboardTimeline';
import NewPathWizard from '../paths/NewPathWizard';

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
      <Routes>
        <Route path="/new-path" element={<NewPathWizard />} />
      </Routes>
    </div>
  );

  return content;
}
export default Dahboard;
