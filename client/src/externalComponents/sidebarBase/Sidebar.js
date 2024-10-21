import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { useLocation } from 'react-router-dom';
import { CgMenuLeft } from 'react-icons/cg';
import {
  BsBuilding,
  BsGear,
  BsHourglass,
  BsHourglassSplit,
  BsPeople,
  BsPeopleFill,
  BsPersonFillLock,
  BsPersonLock,
  BsPieChart,
  BsPieChartFill,
  BsSticky,
  BsStickyFill,
} from 'react-icons/bs';
import { logoutUtil } from '../../pages/auth/login/loginUtils/logoutUtil';
import plvLogo from '../../images/PLVlogo.png';
import drac from '../../images/drac.png';

const AppNavBar = styled(AppBar)({
  background: 'transparent',
  boxShadow: 'none',
  width: { sm: 'calc(100% - 40px)' },
  ml: { sm: '40px' },
  height: '80px',
});

const SidebarOptions = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  listStyle: 'none',
  overflow: 'hidden',
  textDecoration: 'none',
  transition: 'box-shadow .15s, transform .15s',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  touchAction: 'manipulation',
  willChange: 'transform',
  color: 'white',
  padding: '10px 13px',
  fontSize: '24px',
  width: '100%',
  cursor: 'pointer',

  '&:hover': {
    transform: 'translateY(-1px)',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '6px',
    color: 'white',
  },
  '&:active': {
    transform: 'translateY(1px)',
  },
});

const RouteCon = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '16px',
  cursor: 'pointer',
  width: '100%',
});

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const auth = useSelector(authSelector);

  const { pathname } = useLocation();

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
            backgroundColor: '#007bff',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '8px',
              width: '100%',
              padding: '16px',
            }}
          >
            <div className="w-full flex justify-center items-center font-semibold text-white mb-[20px] mt-[8px]">
              <img src={plvLogo} alt="" className="w-[100px] h-[100px]" />
            </div>

            <div className="w-full">
              <Link to="/statistics">
                {activeItem === '/statistics' ? (
                  <SidebarOptions
                    sx={{
                      color: '#007bff',
                      background: 'white',
                      borderRadius: '6px',
                      '&:hover': {
                        transform: 'translateY(0px)',
                        color: '#007bff',
                        background: 'white',
                      },
                      '&:active': { transform: 'translateY(0px)' },
                    }}
                  >
                    <RouteCon>
                      <BsPieChartFill
                        className={
                          activeItem === '/statistics' ? 'icon-active' : ''
                        }
                      />
                      <p className="text-[18px]">Statistics</p>
                    </RouteCon>
                  </SidebarOptions>
                ) : (
                  <SidebarOptions>
                    <RouteCon>
                      <BsPieChart />
                      <p className="text-[18px]">Statistics</p>
                    </RouteCon>
                  </SidebarOptions>
                )}
              </Link>
            </div>
            <div className="w-full">
              <Link to="/cases">
                {activeItem === '/cases' ? (
                  <SidebarOptions
                    sx={{
                      color: '#007bff',
                      background: 'white',
                      borderRadius: '6px',
                      '&:hover': {
                        transform: 'translateY(0px)',
                        color: '#007bff',
                        background: 'white',
                      },
                      '&:active': { transform: 'translateY(0px)' },
                    }}
                  >
                    <RouteCon>
                      <BsStickyFill
                        className={activeItem === '/cases' ? 'icon-active' : ''}
                      />
                      <p className="text-[18px]">Cases</p>
                    </RouteCon>
                  </SidebarOptions>
                ) : (
                  <SidebarOptions>
                    <RouteCon>
                      <BsSticky />
                      <p className="text-[18px]">Cases</p>
                    </RouteCon>
                  </SidebarOptions>
                )}
              </Link>
            </div>
            <div className="w-full">
              <Link to="/students">
                {activeItem === '/students' ? (
                  <SidebarOptions
                    sx={{
                      color: '#007bff',
                      background: 'white',
                      borderRadius: '6px',
                      '&:hover': {
                        transform: 'translateY(0px)',
                        color: '#007bff',
                        background: 'white',
                      },
                      '&:active': { transform: 'translateY(0px)' },
                    }}
                  >
                    <RouteCon>
                      <BsPeopleFill
                        className={
                          activeItem === '/student' ? 'icon-active' : ''
                        }
                      />
                      <p className="text-[18px]">Students</p>
                    </RouteCon>
                  </SidebarOptions>
                ) : (
                  <SidebarOptions>
                    <RouteCon>
                      <BsPeople />
                      <p className="text-[18px]">Students</p>
                    </RouteCon>
                  </SidebarOptions>
                )}
              </Link>
            </div>
            {auth?.userDetails?.role === 'Administrator' ? (
              <div className="w-full">
                <Link to="/users">
                  {activeItem === '/users' ? (
                    <SidebarOptions
                      sx={{
                        color: '#007bff',
                        background: 'white',
                        borderRadius: '6px',
                        '&:hover': {
                          transform: 'translateY(0px)',
                          color: '#007bff',
                          background: 'white',
                        },
                        '&:active': { transform: 'translateY(0px)' },
                      }}
                    >
                      <RouteCon>
                        <BsPersonFillLock
                          className={
                            activeItem === '/users' ? 'icon-active' : ''
                          }
                        />
                        <p className="text-[18px]">Users</p>
                      </RouteCon>
                    </SidebarOptions>
                  ) : (
                    <SidebarOptions>
                      <RouteCon>
                        <BsPersonLock />
                        <p className="text-[18px]">Users</p>
                      </RouteCon>
                    </SidebarOptions>
                  )}
                </Link>
              </div>
            ) : null}

            {auth?.userDetails?.role === 'Administrator' ? (
              <>
                <div className="w-full">
                  <Link to="/notification">
                    {activeItem === '/notification' ? (
                      <SidebarOptions
                        sx={{
                          color: '#007bff',
                          background: 'white',
                          borderRadius: '6px',
                          '&:hover': {
                            transform: 'translateY(0px)',
                            color: '#007bff',
                            background: 'white',
                          },
                          '&:active': { transform: 'translateY(0px)' },
                        }}
                      >
                        <RouteCon>
                          <BsHourglassSplit
                            className={
                              activeItem === '/notification'
                                ? 'icon-active'
                                : ''
                            }
                          />
                          <p className="text-[18px]">History</p>
                        </RouteCon>
                      </SidebarOptions>
                    ) : (
                      <SidebarOptions>
                        <RouteCon>
                          <BsHourglass />
                          <p className="text-[18px]">History</p>
                        </RouteCon>
                      </SidebarOptions>
                    )}
                  </Link>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  {auth?.userDetails?.role === 'Administrator' ? (
                    <div className="w-full">
                      <Link to="/settings">
                        {activeItem === '/settings' ? (
                          <SidebarOptions
                            sx={{
                              color: '#007bff',
                              background: 'white',
                              borderRadius: '6px',
                              '&:hover': {
                                transform: 'translateY(0px)',
                                color: '#007bff',
                                background: 'white',
                              },
                              '&:active': { transform: 'translateY(0px)' },
                            }}
                          >
                            <RouteCon>
                              <BsBuilding
                                className={
                                  activeItem === '/settings'
                                    ? 'icon-active'
                                    : ''
                                }
                              />
                              <p className="text-[18px]">Colleges</p>
                            </RouteCon>
                          </SidebarOptions>
                        ) : (
                          <SidebarOptions>
                            <RouteCon>
                              <BsBuilding />
                              <p className="text-[18px]">Colleges</p>
                            </RouteCon>
                          </SidebarOptions>
                        )}
                      </Link>
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>

          <div className="flex flex-col justify-center items-center w-[100%] p-4 shadow-sm">
            <div className="group flex justify-start items-center gap-4 w-[100%] bg-gray-100 p-4 rounded-tl-[14px] rounded-tr-[14px]">
              <img
                src={drac}
                alt=""
                className="w-[50px] h-[50px] transition-transform duration-300 transform group-hover:rotate-[360deg]"
              />
              <div className="flex flex-col">
                <div className="text-[#007bff] text-[18px] font-semibold hover:underline cursor-pointer">
                  {auth.userDetails.userName.slice(0, 10)}
                </div>
                <div className="text-[#606060] text-[14px]">
                  {auth.userDetails.role?.slice(0, 5)}
                </div>
              </div>
            </div>
            <div
              onClick={logoutUtil}
              className="group cursor-pointer bg-gray-100 flex justify-start gap-2 items-center w-[100%] border-gray-200 rounded-bl-[10px] rounded-br-[10px] px-4 py-3 hover:bg-[#ff3131]"
            >
              <span className="text-[16px] text-[#606060] font-bold group-hover:text-white">
                Sign out
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppNavBar
        sx={{
          padding: '0',
          margin: '-4px 0 0 10px',
          width: 'fit-content',
          right: 'auto',
        }}
      >
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            display: { sm: 'none' },
            color: 'white',
            width: 'fit-content',
            height: '100%',
            padding: '0',
            margin: '0',
          }}
        >
          <CgMenuLeft />
        </IconButton>
      </AppNavBar>
      <Box
        component="nav"
        sx={{
          width: { sm: '240px' },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '240px',
              border: 'none',
              overflow: 'hidden',
              backgroundColor: 'transparent',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '240px',
              border: 'none',
              backgroundColor: 'transparent',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  window: PropTypes.func,
};

export default Sidebar;
