import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventList } from './pages/EventList';
import { EventDetail } from './pages/EventDetail';
import { CreateEvent } from './pages/CreateEvent';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/events/new" element={<CreateEvent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

