import './App.css';
import './styles/style.scss';
import MainFeedComponent from './components/ProjectComponent/MainFeedComponent/MainFeedComponent';
import { useEffect, useState } from 'react';
import { checkAuth } from './store/action-creator/user';
import { getAllUserProjects } from './store/action-creator/projects';
import { useAppDispatch, useAppSelector } from './hooks/redux';

function App() {
  const [load, setLoad] = useState(false);
  const { user } = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadPage = async () => {
      if (localStorage.getItem('token')) {
        await dispatch(checkAuth());
      }
      setLoad(true);
    };

    loadPage();
  }, [dispatch]);

  useEffect(() => {
      if (user) {
        dispatch(getAllUserProjects(user.id));
      }
  },[user, dispatch]);

  return (
    <>
      {load && (
        <MainFeedComponent />
      )}
    </>

  );
}

export default App;
