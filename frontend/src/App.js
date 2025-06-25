import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SurveyBuilderContainer from './components/SurveyBuilder/SurveyBuilderContainer';
import ViewAllSurveys from './components/SurveyBuilder/ViewAllSurveys'; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/create" element={<SurveyBuilderContainer />} />
        <Route path="/view" element={<ViewAllSurveys />} /> {/* ✅ new view route */}
        <Route
          path="*"
          element={
            <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
              Page not found. Go to <a href="/create">/create</a> or <a href="/view">/view</a>.
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;