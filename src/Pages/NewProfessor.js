import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function NewProfessor(){
    const [professorName, setProfessorName] = useState("");
    const [selectedDiscipline, setSelectedDiscipline] = useState("");
    const [allDisciplines, setAllDisciplines] = useState([]);
    const history = useHistory();

    function finishCreationProfessors(e){
        e.preventDefault();
        if (professorName === "") return alert("Campo do nome do professor não pode estar vázio!");
        if (selectedDiscipline === "") return alert("Selecione uma disciplina!");
        const body = {
          name: professorName,
          discipline: selectedDiscipline,
        };
        const req = axios.post(`${process.env.REACT_APP_HOST}/new-professor`, body);
        req.then(() => {
          alert("Professor criado com sucesso!");
          history.push("/")
        });
        req.catch((e) => {
          setProfessorName("");
          setSelectedDiscipline("");
          if (e.response.status === 400) return alert("Algum dado digitado inválido!");
          if (e.response.status === 409) return alert("Professor digitado já está cadastrado em nosso sitema nessa disciplina");
          if (e.response.status === 500) return alert("Um imprevisto aconteceu por favor tente novamente!");
        });
    }

    function cancelCreationProfessors(e) {
        e.preventDefault();
        history.push("/")
    }

    useEffect(()=>{
        const requestDisciplines = axios.get(`${process.env.REACT_APP_HOST}/get-all-disciplines`);
          requestDisciplines.then(({ data }) => {
            setAllDisciplines(data);
          });
          requestDisciplines.catch((e) => {
            alert("Alguma coisa aconteceu, por favor tente mais tarde!");
          });
    },[]) //eslint-disable-line


    return(
        <Main>
            <Container>
            <Logo>RepoProvas</Logo>
                <NewField onSubmit={(e) => finishCreationProfessors(e)}>
                    <label>Adicione um professor novo</label>
                    <input value={professorName} placeholder="Nome do professor" onChange={(e) => setProfessorName(e.currentTarget.value)}/>
                    <select value={selectedDiscipline} onChange={(e) => setSelectedDiscipline(e.currentTarget.value)}>
                        <option value="">Escolha a disciplina</option>
                        {allDisciplines.map((d, i) => (
                        <option key={i} value={d.name}>
                            {d.name}
                        </option>
                        ))}
                    </select>
                    <button type={"submit"}>Enviar</button>
                    <button onClick={(e) => cancelCreationProfessors(e)}>Cancelar</button>
                </NewField>
            </Container>
        </Main>
    )
}

const Main = styled.main`
  width: 100vw;
  min-height: 100vh;
  background-color: #e6e6e6;
`;

const Logo = styled.h1`
  font-family: "Courgette";
  font-size: 3.5rem;
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

const NewField = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  label {
    text-align: center;
    margin-bottom: 10px;
  }
  input {
    width: 250px;
    height: 30px;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    outline: none;
  }
  button {
    margin-top: 10px;
    height: 30px;
    background-color: #595959;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #383838;
  }
  select{
    width: 250px;
    height: 30px;
    margin-top: 10px;
    margin-bottom: 5px;
    outline: none;
    border: none;
    background-color: #fff;
    border-radius: 5px;
  }
`
