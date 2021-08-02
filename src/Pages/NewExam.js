import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default function NewExam(){
  const [examName, setExamName] = useState("")
  const [examLink, setExamLink] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [allDisciplines, setAllDisciplines] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allProfessors, setAllProfessors] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [selectedProfessors, setSelectedProfessors] = useState("");
  const [hidden, setHidden] = useState(true);
  const history = useHistory();
  const month = new Date().getMonth() + 1;

  function findProfessorsFromDisciplines() {
    const found = allDisciplines.find((i) => i.name === selectedDiscipline);
    if (!found) return;
    const body = {
      id: found.id,
    };
    const requestProfessorsList = axios.post(
      `${process.env.REACT_APP_HOST}/find-professorsId`,
      body
    );
    requestProfessorsList.then(({ data }) => {
      setSelectedProfessors("");
      setAllProfessors(data.professor);
      setHidden(false);
    });
    requestProfessorsList.catch((e) => {
      alert("Alguma coisa aconteceu, por favor tente mais tarde!");
    });
  }

  function cancelCreationExam(e) {
    e.preventDefault();
    history.push("/")
  }

  function finishCreationExam(e) {
    e.preventDefault();
    if (examName === "") return alert("Digite um nome para a prova!");
    if (examLink === "") return alert("Digite o link para a prova!");
    if (selectedCategory === "") return alert("Selecione uma categoria!");
    if (selectedDiscipline === "") return alert("Selecione uma disciplina!");
    if (selectedProfessors === "") return alert("Selecione um professor!");
    const body = {
      examName: `${examName.slice(0, 4)}.${Number(
        examName.slice(5, 7) <= 6 ? "1" : "2"
      )}`,
      examLink,
      category: selectedCategory,
      professor: selectedProfessors,
      discipline: selectedDiscipline,
    };
    const req = axios.post(`${process.env.REACT_APP_HOST}/new-exam`, body);
    req.then(() => {
      setHidden(true);
      alert("Prova criada com sucesso!");
      history.push("/")
    });
    req.catch((e) => {
      setExamName("");
      setExamLink("");
      if (e.response.status === 400) return alert("Algum dado digitado inválido!");
      if (e.response.status === 406) return alert("Algum dado digitado não consta em nosso sistema!");
      if (e.response.status === 500) return alert("Um imprevisto aconteceu por favor tente novamente!");
    });

  }

  useEffect(()=>{
    const requestDisciplines = axios.get(`${process.env.REACT_APP_HOST}/get-all-disciplines`);
      requestDisciplines.then(({ data }) => {
        setAllDisciplines(data);
      });
      requestDisciplines.catch((e) => {
        alert("Alguma coisa aconteceu, por favor tente mais tarde!");
      });

      const requestCategories = axios.get(
        `${process.env.REACT_APP_HOST}/get-all-categories`
      );
      requestCategories.then(({ data }) => {
        setAllCategories(data);
      });
      requestCategories.catch((e) => {
        alert("Alguma coisa aconteceu, por favor tente mais tarde!");
      });
  },[selectedCategory]) //eslint-disable-line

  useEffect(() => {
    findProfessorsFromDisciplines();
  }, [selectedDiscipline]); //eslint-disable-line

  return(
      <Main>
          <Container>
            <Logo>RepoProvas</Logo>
            <NewField onSubmit={(e) => finishCreationExam(e)}>
              <label>Envie sua prova!</label>
              <input type="month" value={examName} max={`${new Date().getFullYear()}-${month < 10 ? "0" + month : "" + month}`} onChange={(e) => setExamName(e.currentTarget.value)}/>
              <input value={examLink} onChange={(e) => setExamLink(e.currentTarget.value)} placeholder="Link da prova"/>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.currentTarget.value)}>
                <option value="">Escolha qual categoria da prova!</option>
                {allCategories.map((d, i) => (
                  <option key={i} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              <select value={selectedDiscipline} onChange={(e) => setSelectedDiscipline(e.currentTarget.value)}>
                <option value="">Escolha sua disciplina</option>
                  {allDisciplines.map((d, i) => (
                <option key={i} value={d.name}>{d.name}</option>
                ))}
              </select>
              <select hidden={hidden} value={selectedProfessors} onChange={(e) => setSelectedProfessors(e.currentTarget.value)}>
                <option value="">Escolha o seu professor!</option>
                {allProfessors.map((t, i) => (
                  <option key={i} value={t.name}>{t.name}</option>
                ))}
              </select>
              <button type={"submit"}>Enviar</button>
              <button onClick={(e) => cancelCreationExam(e)}>Cancelar</button>
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