import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Header from "../components/header";

const Main = styled(Box)(
  () => `
          margin-top: 88px;
          flex: 1 1 auto;
          overflow: auto;
          margin:100px;
  `
);
const MainContent = styled(Box)(
  () => `
          margin-top: 80px;
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
