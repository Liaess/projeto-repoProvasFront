import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Professors(){
  const [allProfessorsList, setAllProfessorsList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [filterOfProfessor, setFilterOfProfessor] = useState([])

  useEffect(()=>{
    const reqProfessors = axios.get(
      `${process.env.REACT_APP_HOST}/listOfProfessorsWithDisciplines`
    );
    reqProfessors.then(({ data }) => {
      setAllProfessorsList(data);
    });
  },[])

  useEffect(()=>{
    setFilterOfProfessor(allProfessorsList.filter(p=>p.name === selectedValue));
  },[selectedValue]); //eslint-disable-line

    return(
        <Main>
          <Container>
            <Logo>RepoProvas</Logo>
            <ProfessorsList value={selectedValue} onChange={(e)=> setSelectedValue(e.currentTarget.value)}>
              <option value="">Escolhar qual professor quer olhar!</option>
              {allProfessorsList.map((p,i)=>{
                return <option key={i}>{p.name}</option>
              })};
            </ProfessorsList>
            {filterOfProfessor.length < 1
            ? ""
            :
            filterOfProfessor[0].discipline.map((e,i)=>{
              return(
              <Link to={`/disciplines/${e.id}`} key={i} >
                <div>
                  <p>{e.name}</p>
                </div>
              </Link>
              )
            })}
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