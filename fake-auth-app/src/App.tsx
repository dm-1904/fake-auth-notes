import "./App.css";
import { LogIn } from "./Components/LoginForm";
import { MovieList } from "./Components/MoviesList";
import { SignUp } from "./Components/SignupForm";

function App() {
  return (
    <>
      <h1>The Best Movies</h1>
      <MovieList />
      <SignUp />
      <LogIn />
    </>
  );
}

export default App;
