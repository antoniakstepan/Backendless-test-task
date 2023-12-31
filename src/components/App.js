import React, { useEffect } from 'react';
import { Link, Route, Routes, useLocation, Outlet, useNavigate } from 'react-router-dom';
import data from '../data/tabs.json';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Get the navigate function
  // Set the default tab if the URL doesn't have a tab specified
  useEffect(() => {
    if (!location.pathname || location.pathname === '/' || location.pathname.includes("/B")) {
      // Redirect to the default tab using relative path
      navigate(`/tab/${data.defaultTab}`);
    }
  }, [location.pathname]);

  return (
    <div className='container'>
      <nav className='nav'>
        {data.tabs.map((tab) => (
          <Link key={tab.id} to={`/tab/${tab.id}`} className='link'>
            {tab.title}
          </Link>
        ))}
      </nav>
      <hr />
      <Routes>
        {data.tabs.map((tab) => {
          return (
            <Route key={tab.id} path={`/tab/${tab.id}`} element={<TabLoader tab={tab} />} />
          )
        })}
      </Routes>
    </div>
  );
};

const TabLoader = ({ tab }) => {
  // Dynamically import the component from the specified path
  const ComponentToLoad = React.lazy(() => import(`${tab.componentPath}`));

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Outlet />
      <ComponentToLoad />
    </React.Suspense>
  );
};

export default App;
