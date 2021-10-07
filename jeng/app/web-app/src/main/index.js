import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MedicalPersonnelPage from '../medical-personnel-page';
import Header
    from '../header';
const App = () => {
    return (
        <Router>
        <div>
            <Header />
            <MedicalPersonnelPage />
            <Switch>
            </Switch>
        </div>
        </Router>
    );
}
 
export default App;