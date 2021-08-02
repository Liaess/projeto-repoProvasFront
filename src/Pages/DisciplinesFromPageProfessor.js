import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function DisciplinesFromPageProfessor() {
  const { id } = useParams();
  const [allInfos, setAllInfos] = useState([]);

  useEffect(()=>{
    const req =axios.get(`${process.env.REACT_APP_HOST}/disciplines/${id}`);
    req.then(({data})=>{
      setAllInfos(data);
    });
  },[id]);

    return(
        <Main>
            <Container>
                <Logo>RepoProvas</Logo>
                {allInfos.map((e,i)=>{
                return(
                  <EachDiscipline key={i}>
                    <a href={e.examLink} target={"_blank"} rel="noreferrer">
                        {e.name} - {e.category.name} - {e.discipline.name} - {e.professors.name}
                    </a>
                  </EachDiscipline>
                )})}
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

const EachDiscipline = styled.div`
  height: 30px;
  margin-top: 10px;
`