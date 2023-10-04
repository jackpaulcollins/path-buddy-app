import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import CurrentUserPath from '../paths/CurrentUserPath';
import DashboardTimeline from './DashboardTimeline';
import NewPathForm from '../paths/forms/NewPathForm';
import Notificaton from '../../general/Notification';
import { selectCurrentFlashMessage } from '../../../features/notifications/notificationsSlice';

function Dahboard() {
  const flash = useSelector(selectCurrentFlashMessage);

  const maybeRenderFlash = () => {
    if (flash.message) {
      return <Notificaton title={flash.title} message={flash.message} icon={flash.icon} />;
    }
    return null;
  };
  const content = (
    <div>
      { maybeRenderFlash() }
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
