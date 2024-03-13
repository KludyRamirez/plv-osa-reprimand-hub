import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  BsCaretRight,
  BsDiamondHalf,
  BsGear,
  BsGearFill,
  BsGrid1X2,
  BsGrid1X2Fill,
  BsLayoutWtf,
  BsPeople,
  BsPeopleFill,
  BsPerson,
  BsPersonBadge,
  BsPersonBadgeFill,
  BsPersonFill,
  BsPersonSquare,
  BsPieChart,
  BsPieChartFill,
  BsSticky,
  BsStickyFill,
} from "react-icons/bs";

const AppNavBar = styled(AppBar)({
  background: "#007bff",
  boxShadow: "none",
  width: { sm: "calc(100% - 40px)" },
  ml: { sm: "40px" },
  height: "60px",
});

const SidebarOptions = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  listStyle: "none",
  overflow: "hidden",
  textDecoration: "none",
  transition: "box-shadow .15s, transform .15s",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "transform",
  color: "white",
  padding: "8px 13px",
  fontSize: "18px",
  width: "100%",
  cursor: "pointer",

  "&:hover": {
    transform: "translateY(-1px)",
    background: "rgba(255, 255, 255, 0.6)",
    borderRadius: "6px",
    color: "black",
  },
  "&:active": {
    transform: "translateY(1px)",
  },
});

const RouteCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "14px",
  cursor: "pointer",
  width: "100%",
});

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");

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
            <div className="w-full">
              <Link to="/dashboard">
                {activeItem === "/dashboard" ? (
                  <SidebarOptions
                    sx={{
                      color: "black",
                      background: "rgba(255, 255, 255, 0.6)",
                      borderRadius: "6px",
                      "&:hover": { transform: "translateY(0px)" },
                      "&:active": { transform: "translateY(0px)" },
                    }}
                  >
                    <RouteCon>
                      <BsGrid1X2
                        className={
                          activeItem === "/dashboard" ? "icon-active" : ""
                        }
                      />
                      <p className="text-[16px]">Dashboard</p>
                    </RouteCon>
                  </SidebarOptions>
                ) : (
                  <SidebarOptions>
                    <RouteCon>
                      <BsGrid1X2 />
                      <p className="text-[16px]">Dashboard</p>
                    </RouteCon>
                  </SidebarOptions>
                )}
              </Link>
            </div>

            <div className="w-full">
              <Link to="/statistics">
                {activeItem === "/statistics" ? (
                  <SidebarOptions
                    sx={{
                      color: "black",
                      background: "rgba(255, 255, 255, 0.6)",
                      borderRadius: "6px",
                      "&:hover": { transform: "translateY(0px)" },
                      "&:active": { transform: "translateY(0px)" },
                    }}
                  >
                    <RouteCon>
                      <BsPieChartFill
                        className={
                          activeItem === "/statistics" ? "icon-active" : ""
                        }
                      />
                      <p className="text-[16px]">Statistics</p>
                    </RouteCon>
                  </SidebarOptions>
                ) : (
                  <SidebarOptions>
                    <RouteCon>
                      <BsPieChart />
                      <p className="text-[16px]">Statistics</p>
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
                      color: "black",
                      background: "rgba(255, 255, 255, 0.6)",
                      borderRadius: "6px",
                      "&:hover": { transform: "translateY(0px)" },
                      "&:active": { transform: "translateY(0px)" },
                    }}
                  >
                    <RouteCon>
                      <BsStickyFill
                        className={activeItem === "/cases" ? "icon-active" : ""}
                      />
                      <p className="text-[16px]">Cases</p>
                    </RouteCon>
                  </SidebarOptions>
                ) : (
                  <SidebarOptions>
                    <RouteCon>
                      <BsSticky />
                      <p className="text-[16px]">Cases</p>
                    </RouteCon>
                  </SidebarOptions>
                )}
              </Link>
            </div>
            <div className="w-full">
              <Link to="/student">
                {activeItem === "/student" ? (
                  <SidebarOptions
                    sx={{
                      color: "black",
                      background: "rgba(255, 255, 255, 0.6)",
                      borderRadius: "6px",
                      "&:hover": { transform: "translateY(0px)" },
                      "&:active": { transform: "translateY(0px)" },
                    }}
                  >
                    <RouteCon>
                      <BsPeopleFill
                        className={
                          activeItem === "/student" ? "icon-active" : ""
                        }
                      />
                      <p className="text-[16px]">Students</p>
                    </RouteCon>
                  </SidebarOptions>
                ) : (
                  <SidebarOptions>
                    <RouteCon>
                      <BsPeople />
                      <p className="text-[16px]">Students</p>
                    </RouteCon>
                  </SidebarOptions>
                )}
              </Link>
            </div>
            <div className="w-full">
              <Link to="/user">
                {activeItem === "/user" ? (
                  <SidebarOptions
                    sx={{
                      color: "black",
                      background: "rgba(255, 255, 255, 0.6)",
                      borderRadius: "6px",
                      "&:hover": { transform: "translateY(0px)" },
                      "&:active": { transform: "translateY(0px)" },
                    }}
                  >
                    <RouteCon>
                      <BsPersonSquare
                        className={activeItem === "/user" ? "icon-active" : ""}
                      />
                      <p className="text-[16px]">Users</p>
                    </RouteCon>
                  </SidebarOptions>
                ) : (
                  <SidebarOptions>
                    <RouteCon>
                      <BsPersonSquare />
                      <p className="text-[16px]">Users</p>
                    </RouteCon>
                  </SidebarOptions>
                )}
              </Link>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "12px",
              width: "100%",
              padding: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div className="w-full">
                <Link to="/settings">
                  {activeItem === "/settings" ? (
                    <SidebarOptions
                      sx={{
                        color: "black",
                        background: "rgba(255, 255, 255, 0.6)",
                        borderRadius: "6px",
                        "&:hover": { transform: "translateY(0px)" },
                        "&:active": { transform: "translateY(0px)" },
                      }}
                    >
                      <RouteCon>
                        <BsGear
                          className={
                            activeItem === "/settings" ? "icon-active" : ""
                          }
                        />
                        <p className="text-[16px]">Settings</p>
                      </RouteCon>
                    </SidebarOptions>
                  ) : (
                    <SidebarOptions>
                      <RouteCon>
                        <BsGear />
                        <p className="text-[16px]">Settings</p>
                      </RouteCon>
                    </SidebarOptions>
                  )}
                </Link>
              </div>
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
                    <p className="text-[16px]">Sign Out</p>
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
        <p>Kludycdfdsfsfsdfsdfsdfsdf</p>
        <Toolbar
          sx={{
            minHeight: "0px",
            display: "flex",
            justifyContent: "space-between",
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
