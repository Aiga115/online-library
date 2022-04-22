import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Header from "../components/header";

const Main = styled(Box)(
  () => `
          
  `
);
const MainContent = styled(Box)(
  () => `
          margin: 120px 40px 0px 40px;
  `
);

const Layout = () => {
  return (
    <>
      <Main>
        <Header/>
        <MainContent>
          <Outlet />
        </MainContent>
      </Main>
    </>
  );
};
export default Layout;
