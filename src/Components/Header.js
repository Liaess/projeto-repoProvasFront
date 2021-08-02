import {BsFillHouseFill,BsFillPlusCircleFill} from "react-icons/bs";
import styled from "styled-components";
import { Link } from "react-router-dom"

function Header() {
  return (
    <Main>
        <Link to={"/"}>
            <p>
            <BsFillHouseFill size={"14px"} /> Início
            </p>
        </Link>
        <Link to={"/new-exam"}>
            <p>
            <BsFillPlusCircleFill size={"12px"} /> Enviar prova
            </p>
        </Link>
        <Link to={"/new-professor"}>
            <p>
            <BsFillPlusCircleFill size={"12px"} /> Adicionar professor
            </p>
        </Link>
    </Main>
  );
}

export const Main = styled.div`
  width: 100vw;
  height: 35px;
  background-image: linear-gradient(#000, #595959);
  color: #fff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.1rem;
  p {
    cursor: pointer;
  }
  p:hover {
    color: #d3d3d3;
  }
`;


export default Header;
