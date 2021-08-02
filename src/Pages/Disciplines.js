import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default function Disciplines(){
  const [allDisciplines, setAllDisciplines] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [filterOfDiscipline, setFilterOfDiscipline] = useState([])
  const history = useHistory();

  useEffect(()=>{
    const reqProfessors = axios.get(
      `${process.env.REACT_APP_HOST}/listOfDisciplinesWithExams`
    );
    reqProfessors.then(({ data }) => {
      setAllDisciplines(data);
    });
  },[]);

  useEffect(()=>{
    setFilterOfDiscipline(allDisciplines.find(p=>p.name === selectedValue));
  },[selectedValue]); //eslint-disable-line

  function searchForDiscipline() {
    history.push(`/disciplines/${filterOfDiscipline.id}`)
  }

    return(
        <Main>
          <Container>
            <Logo>RepoProvas</Logo>
            <ProfessorsList value={selectedValue} onChange={(e)=> setSelectedValue(e.currentTarget.value)}>
              <option value="">Escolhar qual disciplina quer olhar!</option>
              {allDisciplines.map((p,i)=>{
                return <option key={i}>{p.name}</option>
              })};
            </ProfessorsList>
              <button onClick={searchForDiscipline}>Pesquisar</button>
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

const Logo = styled.h1`
  font-family: "Courgette";
  font-size: 3.5rem;
`;

const ProfessorsList = styled.select`
  width: 250px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 5px;
  outline: none;
  border: none;
  background-color: #fff;
  border-radius: 5px;
`
