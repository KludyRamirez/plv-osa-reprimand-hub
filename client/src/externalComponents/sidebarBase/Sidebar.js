import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useLocation } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { CgMenuLeft } from "react-icons/cg";
import {
  BsBoxArrowUpRight,
  BsGear,
  BsHourglass,
  BsHourglassSplit,
  BsPeople,
  BsPeopleFill,
  BsPersonSquare,
  BsPieChart,
  BsPieChartFill,
  BsSticky,
  BsStickyFill,
} from "react-icons/bs";
import { logoutUtil } from "../../pages/auth/login/loginUtils/logoutUtil";
import plvLogo from "../../images/PLVlogo.png";

const AppNavBar = styled(AppBar)({
  background: "transparent",
  boxShadow: "none",
  width: { sm: "calc(100% - 40px)" },
  ml: { sm: "40px" },
  height: "80px",
});

const SidebarOptions = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  listStyle: "none",
  overflow: "hidden",
  textDecoration: "none",
  transition: "box-shadow .15s, transform .15s",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "transform",
  color: "white",
  padding: "10px 13px",
  fontSize: "24px",
  width: "100%",
  cursor: "pointer",

  "&:hover": {
    transform: "translateY(-1px)",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "6px",
    color: "white",
  },
  "&:active": {
    transform: "translateY(1px)",
  },
});

const RouteCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "16px",
  cursor: "pointer",
  width: "100%",
});

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");

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
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            backgroundColor: "#007bff",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "8px",
              width: "100%",
              padding: "20px",
            }}
          >
            <div className="w-full flex justify-center items-center font-semibold text-white mb-[20px] mt-[8px]">
              <img src={plvLogo} alt="" className="w-[100px] h-[100px]" />
            </div>

            <div className="w-full">
              <Link to="/statistics">
                {activeItem === "/statistics" ? (
                  <SidebarOptions
                    sx={{
                      color: "#007bff",
                      background: "white",
                      borderRadius: "6px",
                      "&:hover": {
                        transform: "translateY(0px)",
                        color: "#007bff",
                        background: "white",
                      },
                      "&:active": { transform: "translateY(0px)" },
                    }}
                  >
                    <RouteCon>
                      <BsPieChartFill
                        className={
                          activeItem === "/statistics" ? "icon-active" : ""
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
                {activeItem === "/cases" ? (
                  <SidebarOptions
                    sx={{
                      color: "#007bff",
                      background: "white",
                      borderRadius: "6px",
                      "&:hover": {
                        transform: "translateY(0px)",
                        color: "#007bff",
                        background: "white",
                      },
                      "&:active": { transform: "translateY(0px)" },
                    }}
                  >
                    <RouteCon>
                      <BsStickyFill
                        className={activeItem === "/cases" ? "icon-active" : ""}
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
                {activeItem === "/students" ? (
                  <SidebarOptions
                    sx={{
                      color: "#007bff",
                      background: "white",
                      borderRadius: "6px",
                      "&:hover": {
                        transform: "translateY(0px)",
                        color: "#007bff",
                        background: "white",
                      },
                      "&:active": { transform: "translateY(0px)" },
                    }}
                  >
                    <RouteCon>
                      <BsPeopleFill
                        className={
                          activeItem === "/student" ? "icon-active" : ""
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
            {auth?.userDetails?.role === "Administrator" ? (
              <div className="w-full">
                <Link to="/users">
                  {activeItem === "/users" ? (
                    <SidebarOptions
                      sx={{
                        color: "#007bff",
                        background: "white",
                        borderRadius: "6px",
                        "&:hover": {
                          transform: "translateY(0px)",
                          color: "#007bff",
                          background: "white",
                        },
                        "&:active": { transform: "translateY(0px)" },
                      }}
                    >
                      <RouteCon>
                        <BsPersonSquare
                          className={
                            activeItem === "/users" ? "icon-active" : ""
                          }
                        />
                        <p className="text-[18px]">Users</p>
                      </RouteCon>
                    </SidebarOptions>
                  ) : (
                    <SidebarOptions>
                      <RouteCon>
                        <BsPersonSquare />
                        <p className="text-[18px]">Users</p>
                      </RouteCon>
                    </SidebarOptions>
                  )}
                </Link>
              </div>
            ) : null}

            {auth?.userDetails?.role === "Administrator" ? (
              <div className="w-full">
                <Link to="/notification">
                  {activeItem === "/notification" ? (
                    <SidebarOptions
                      sx={{
                        color: "#007bff",
                        background: "white",
                        borderRadius: "6px",
                        "&:hover": {
                          transform: "translateY(0px)",
                          color: "#007bff",
                          background: "white",
                        },
                        "&:active": { transform: "translateY(0px)" },
                      }}
                    >
                      <RouteCon>
                        <BsHourglassSplit
                          className={
                            activeItem === "/notification" ? "icon-active" : ""
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
            ) : null}
          </div>
          <div className="flex flex-col justify-start items-start gap-[12px] w-full p-[20px]">
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {auth?.userDetails?.role === "Administrator" ? (
                <div className="w-full">
                  <Link to="/settings">
                    {activeItem === "/settings" ? (
                      <SidebarOptions
                        sx={{
                          color: "#007bff",
                          background: "white",
                          borderRadius: "6px",
                          "&:hover": {
                            transform: "translateY(0px)",
                            color: "#007bff",
                            background: "white",
                          },
                          "&:active": { transform: "translateY(0px)" },
                        }}
                      >
                        <RouteCon>
                          <BsGear
                            className={
                              activeItem === "/settings" ? "icon-active" : ""
                            }
                          />
                          <p className="text-[18px]">Settings</p>
                        </RouteCon>
                      </SidebarOptions>
                    ) : (
                      <SidebarOptions>
                        <RouteCon>
                          <BsGear />
                          <p className="text-[18px]">Settings</p>
                        </RouteCon>
                      </SidebarOptions>
                    )}
                  </Link>
                </div>
              ) : null}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div className="w-full">
                <SidebarOptions
                  onClick={logoutUtil}
                  sx={{
                    background: "rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    boxShadow: "none",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      background: "#FF4433",
                      color: "white",
                    },
                    "&:active": { transform: "translateY(1px)" },
                  }}
                >
                  <RouteCon>
                    <AiOutlineLogout />
                    <p className="text-[18px]">Sign Out</p>
                  </RouteCon>
                </SidebarOptions>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar>
        <div className="flex h-[100%] justify-between items-center px-[20px]">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              padding: "0",
            }}
          >
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
                color: "white",
              }}
            >
              <CgMenuLeft />
            </IconButton>
          </Toolbar>
          <div className="flex justify-center items-center gap-[24px] mr-3">
            <div className="w-[1px] h-[24px] bg-[lightgray]"></div>
            <div className="text-white flex justify-center items-center rounded-[6px] cursor-pointer gap-4 hover:underline">
              <div className="text-[18px]">
                {`${auth?.userDetails?.userName}`}
              </div>
              <Link to="/account">
                <div className="flex justify-center items-center">
                  <BsBoxArrowUpRight className="text-[24px]" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </AppNavBar>
      <Box
        component="nav"
        sx={{
          width: { sm: "240px" },
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "240px",
              border: "none",
              overflow: "hidden",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "240px",
              border: "none",
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
