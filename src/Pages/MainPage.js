import styled from "styled-components";
import { Link } from "react-router-dom";

export default function MainPage(){
    return(
        <Main>
          <Container>
              <Logo>RepoProvas</Logo>
              <Search>
                  <Link to={"/professors"}>
                      <button>Professos</button>
                  </Link>
                  <Link to={"/disciplines"}>
                      <button>Disciplinas</button>
                  </Link>
              </Search>
          </Container>
        </Main>
    )
}


const Main = styled.main`
  width: 100vw;
  min-height: 100vh;
  background-color: #e6e6e6;
`;

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  p {
    padding-top: 35px;
  }
`;

const Logo = styled.h1`
  font-family: "Courgette";
  font-size: 3.5rem;
`;

const Search = styled.div`
  button {
    width: 120px;
    height: 30px;
    border: none;
    background-color: #595959;
    border-radius: 5px;
    margin: 30px 20px 0px 20px;
    cursor: pointer;
    color: #fff;
  }
  button:hover {
    background-color: #383838;
  }
`;
