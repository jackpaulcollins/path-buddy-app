import { useLocation } from 'react-router-dom';

function CurrentUserPath() {
  const location = useLocation();
  const data = location.state?.data;

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}

export default CurrentUserPath;
