import GlobalStyles from "./Styles/GlobalStyles";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import Professors from "./Pages/Professors";
import Disciplines from "./Pages/Disciplines";
import Header from "./Components/Header";
import NewProfessor from "./Pages/NewProfessor";
import NewExam from "./Pages/NewExam";
import DisciplinesFromPageProfessor from "./Pages/DisciplinesFromPageProfessor";

function App() {

  return (
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/new-exam" exact component={NewExam} />
          <Route path="/new-professor" exact component={NewProfessor} />
          <Route path="/professors" exact component={Professors} />
          <Route path="/disciplines/:id" exact component={DisciplinesFromPageProfessor} />
          <Route path="/disciplines" exact component={Disciplines} />
        </Switch>
      </BrowserRouter>
  )
}

export default App;