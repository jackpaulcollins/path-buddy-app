import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import CurrentUserPath from '../paths/CurrentUserPath';
import DashboardTimeline from './DashboardTimeline';
import NewPathForm from '../paths/forms/NewPathForm';
import Notificaton from '../../general/Notification';

function Dahboard() {
  const content = (
    <div>
      <Notificaton />
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardTimeline />} />
        <Route path="/my-path" element={<CurrentUserPath />} />
        <Route path="/new-path" element={<NewPathForm />} />
      </Routes>
    </div>
  );

  return content;
}
export default Dahboard;
