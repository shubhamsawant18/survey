import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SurveyBuilderContainer from './components/SurveyBuilder/SurveyBuilderContainer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create" element={<SurveyBuilderContainer />} />
        <Route
          path="*"
          element={
            <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
              Page not found. Go to <a href="/create">/create</a> to build a survey.
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;