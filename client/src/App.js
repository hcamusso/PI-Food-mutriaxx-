import './App.css';
import {Route} from 'react-router-dom'
// import { SearchBar } from './componets/SearchBar';
import { LandingPage } from './componets/LandingPage';
import Home from './componets/Home';
import { RecipeDetail } from './componets/RecipeDetail'
import { NavBar } from './componets/NavBar';
import Create from './componets/Create';
import { Switch } from 'react-router-dom';
import PageNotFound from './componets/PageNotFound';
// import Footer from './componets/Footer';


function App() {
  return (
    <div className="App">
      <Route path={['/recipes/:id', '/home', '/create']} component={NavBar}/>
      <Switch>

        <Route path='/recipes/:id' component={RecipeDetail}/>

        <Route exact path='/' component={LandingPage}/>

        <Route exact path='/home' component={Home}/>

        <Route exact path='/create' component={Create}/>

        <Route path='*'>
          <NavBar/>
          <PageNotFound/>
        </Route> 

        </Switch>
      
    </div>
  );
}

export default App;