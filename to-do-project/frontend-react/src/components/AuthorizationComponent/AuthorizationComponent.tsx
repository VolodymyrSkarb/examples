import React, { useEffect, useState } from 'react';
import '../../styles/auth.scss';
import image from '../../assets/authorization_image.svg';
import { Box, LinearProgress, Tab, Tabs } from '@mui/material';
import { loginUser, registrationUser } from '../../store/action-creator/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthForm, RegistrationForm } from '../Forms/FormsComponent';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props)=> {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
};

const AuthorizationComponent: React.FC = () => {
  const [value, setValue] = useState(0);
  const { user, loading } = useAppSelector(state => state.userReducer);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/';

  const submitForm = async (data: any): Promise<void> => {
    await dispatch(loginUser(data.emailField, data.passwordField));
  };

  const submitRegistrationForm = async (data: any): Promise<void> => {
    await dispatch(registrationUser(data.emailField, data.passwordField));
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (user) {
      navigate(fromPage, {replace: true});
    }
  }, [user, navigate, fromPage]);

  return (
    <div className="content">
      <>
        {
          loading && (
            <Box sx={{ width: '100%', position: 'absolute', top: 0 }}>
              <LinearProgress />
            </Box>
          )
        }
      </>
      <div className="container">
        <div className="row">
          <div className="wrapper">
            <img src={image} alt="desktop" className="img-fluid" />
          </div>
          <div className="wrapper contents">
            <div className="form-auth">
              <div className="form-auth_content">
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Sign In" {...a11yProps(0)} />
                  <Tab label="Sign Up" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <AuthForm submitForm={submitForm} isLoading={loading}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <RegistrationForm submitRegistrationForm={submitRegistrationForm} isLoading={loading}/>
                </TabPanel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationComponent;