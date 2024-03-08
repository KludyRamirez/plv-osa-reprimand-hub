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
  BsArchive,
  BsArchiveFill,
  BsCalendarPlus,
  BsCalendarPlusFill,
  BsCalendarWeek,
  BsCalendarWeekFill,
  BsChat,
  BsChatHeartFill,
  BsFolder2Open,
  BsFolderFill,
  BsGear,
  BsGearFill,
  BsPSquare,
  BsPSquareFill,
  BsPeople,
  BsPeopleFill,
  BsSticky,
  BsStickyFill,
} from "react-icons/bs";

const AppNavBar = styled(AppBar)({
  background: "transparent",
  boxShadow: "none",
  width: { sm: "calc(100% - 40px)" },
  ml: { sm: "40px" },
  height: "36px",
});

const RouteCon = styled("div")({
  margin: "6px 0",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  color: "rgba(255, 255, 255, 1)",
  listStyle: "none",
  overflow: "hidden",
  position: "relative",
  textDecoration: "none",
  transition: "box-shadow .15s, transform .15s",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  "&:hover": {
    transform: "translateY(-1px)",
    color: "rgba(255, 255, 255, 1)",
  },
  "&:active": {
    transform: "translateY(1px)",
  },
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
          justifyContent: "space-between",
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
              alignItems: "center",
              gap: "12px",
              paddingRight: "1px",
            }}
          >
            <div style={{ padding: "28px 0 8px 0" }}></div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/timetable">
                {activeItem === "/timetable" ? (
                  <RouteCon>
                    <BsCalendarWeekFill
                      className={
                        activeItem === "/timetable" ? "icon-active" : ""
                      }
                      style={{ fontSize: "20px" }}
                    />
                  </RouteCon>
                ) : (
                  <RouteCon>
                    <BsCalendarWeek
                      style={{
                        fontSize: "20px",
                        padding: "2px 0",
                      }}
                    />
                  </RouteCon>
                )}
              </Link>
            </div>
            <div
              style={{
                display: "flex",

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/children">
                {activeItem === "/children" ? (
                  <RouteCon>
                    <BsPSquareFill
                      className={
                        activeItem === "/children" ? "icon-active" : ""
                      }
                      style={{ fontSize: "20px" }}
                    />
                  </RouteCon>
                ) : (
                  <RouteCon>
                    <BsPSquare
                      style={{
                        padding: "2px 0",
                        fontSize: "20px",
                      }}
                    />
                  </RouteCon>
                )}
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/chat">
                {activeItem === "/chat" ? (
                  <RouteCon>
                    <BsChatHeartFill
                      className={activeItem === "/chat" ? "icon-active" : ""}
                      style={{
                        fontSize: "20px",
                      }}
                    />
                  </RouteCon>
                ) : (
                  <RouteCon>
                    <BsChat
                      style={{
                        padding: "2px 0",
                        fontSize: "20px",
                      }}
                    />
                  </RouteCon>
                )}
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/logs">
                {activeItem === "/logs" ? (
                  <RouteCon>
                    <BsFolderFill
                      className={activeItem === "/logs" ? "icon-active" : ""}
                      style={{ fontSize: "20px" }}
                    />
                  </RouteCon>
                ) : (
                  <RouteCon>
                    <BsFolder2Open
                      style={{
                        padding: "2px 0",
                        fontSize: "20px",
                      }}
                    />
                  </RouteCon>
                )}
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/report">
                {activeItem === "/report" ? (
                  <RouteCon>
                    <BsStickyFill
                      className={activeItem === "/report" ? "icon-active" : ""}
                      style={{ fontSize: "20px", transform: "rotate(180deg)" }}
                    />
                  </RouteCon>
                ) : (
                  <RouteCon>
                    <BsSticky
                      style={{
                        padding: "2px 0",
                        fontSize: "20px",
                        transform: "rotate(180deg)",
                      }}
                    />
                  </RouteCon>
                )}
              </Link>
            </div>

            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "1px",
                  background: "rgba(255, 255, 255, 0.4)",
                  width: "54%",
                }}
              ></div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to="/user">
                  {activeItem === "/user" ? (
                    <RouteCon>
                      <BsPeopleFill
                        className={activeItem === "/user" ? "icon-active" : ""}
                        style={{ fontSize: "20px" }}
                      />
                    </RouteCon>
                  ) : (
                    <RouteCon>
                      <BsPeople
                        style={{
                          padding: "2px 0",
                          fontSize: "20px",
                        }}
                      />
                    </RouteCon>
                  )}
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to="/schedule">
                  {activeItem === "/schedule" ? (
                    <RouteCon>
                      <BsCalendarPlusFill
                        className={
                          activeItem === "/schedule" ? "icon-active" : ""
                        }
                        style={{ fontSize: "20px" }}
                      />
                    </RouteCon>
                  ) : (
                    <RouteCon>
                      <BsCalendarPlus
                        style={{
                          padding: "2px 0",
                          fontSize: "20px",
                        }}
                      />
                    </RouteCon>
                  )}
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to="/waitlist">
                  {activeItem === "/waitlist" ? (
                    <RouteCon>
                      <BsArchiveFill
                        className={
                          activeItem === "/waitlist" ? "icon-active" : ""
                        }
                        style={{ fontSize: "20px" }}
                      />
                    </RouteCon>
                  ) : (
                    <RouteCon>
                      <BsArchive
                        style={{
                          padding: "2px 0",
                          fontSize: "20px",
                        }}
                      />
                    </RouteCon>
                  )}
                </Link>
              </div>
            </>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "12px",
              paddingRight: "1px",
              paddingBottom: "100px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/account">
                {activeItem === "/account" ? (
                  <RouteCon>
                    <BsGearFill
                      className={activeItem === "/account" ? "icon-active" : ""}
                      style={{ fontSize: "20px" }}
                    />
                  </RouteCon>
                ) : (
                  <RouteCon>
                    <BsGear
                      style={{
                        padding: "2px 0",
                        fontSize: "20px",
                      }}
                    />
                  </RouteCon>
                )}
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RouteCon>
                <AiOutlineLogout
                  style={{
                    fontSize: "20px",
                    padding: "2px 0",
                  }}
                />
              </RouteCon>
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
          width: { sm: "80px" },
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
              width: "80px",
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
              width: "80px",
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
