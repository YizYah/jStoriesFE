import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

// page & layout importe
import Homepage from './pages/Homepage';
import StoryDetails from './pages/StoryDetails';
import Subject from './pages/Subject';
import SiteHeader from './components/Siteheader';

// apollo client
const url = 'http://localhost:1337/'
const client = new ApolloClient({
  uri: url + 'graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <Router>
      <ApolloProvider client = {client}>
        <div className="App">
          <SiteHeader />
          <Routes>
            <Route exact path="/" element={<Homepage />}>
            </Route>

            <Route path="/stories/:id" element={<StoryDetails />}>
            </Route>


            <Route path="/subject/:id" element={<Subject />}>
            </Route>
          </Routes>
        </div>

      </ApolloProvider>
    </Router>
  );
}

export default App;
