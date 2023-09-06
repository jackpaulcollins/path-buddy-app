import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import MyPaths from '../paths/MyPaths';
import DashboardTimeline from './DashboardTimeline';
import NewPathForm from '../paths/forms/NewPathForm';

function Dahboard() {
  const content = (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardTimeline />} />
        <Route path="/my-paths" element={<MyPaths />} />
        <Route path="/new-path" element={<NewPathForm />} />
      </Routes>
    </div>
  );

  return content;
}
export default Dahboard;
