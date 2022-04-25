import './App.css';
import {Route} from 'react-router-dom'
// import { SearchBar } from './componets/SearchBar';
import { LandingPage } from './componets/LandingPage';
import Home from './componets/Home';
import { RecipeDetail } from './componets/RecipeDetail'
import { NavBar } from './componets/NavBar';
import Create from './componets/Create';
// import Footer from './componets/Footer';


function App() {
  return (
    <div className="App">
      
        <Route exact path='/home'>
          <NavBar/>
          <Home/>
          {/* <Footer/> */}
        </Route>

        <Route path='/recipes/:id' component={NavBar}/>
        <Route path='/recipes/:id' component={RecipeDetail}/>
        {/* <Route path='/recipes/:id' component={Footer}/> */}

        <Route path='/create' component={NavBar}/>
        <Route path='/create' component={Create}/>
        {/* <Route path='/create' component={Footer}/> */}

        <Route exact path='/'>
          <LandingPage/>
        </Route>
      
    </div>
  );
}

export default App;