import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AppBar, Toolbar, Tabs, Tab } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Header = () => {
  const [value, setValue] = useState(0);
  return (
    <>
      <AppBar>
        <Toolbar>
          <LocalLibraryIcon />
          <>
            <Tabs
              sx={{ marginLeft: "auto" }}
              indicatorColor="secondary"
              textColor="inherit"
              value={value}
              onChange={(e, value) => setValue(value)}
            >
              <Tab
                label="Main Page"
                {...a11yProps(0)}
                component={Link}
                to={`/`}
              />
              <Tab
                label="Wish List"
                {...a11yProps(1)}
                component={Link}
                to={`/wish-list`}
              />
            </Tabs>
          </>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Header;
/*
<HeaderBox>
      <Link to="/">Main Page</Link>
      <Link to="/wish-list">Wish List</Link>
    </HeaderBox>

*/
