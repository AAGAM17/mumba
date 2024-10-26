import './index.css';
import { Route, Routes, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
// import NotFound from './NotFound/NotFound';
import 'regenerator-runtime/runtime'
import Navbar from './Home';
import LandingPage from './Coverpage';
import CardSelectionPage from './CardPage';
import ChatInterface from './ChatBot';
import Chart from './Chart';
import DomainSelector from './Domain';
import SubscriptionManagement from './ManageSubs';
import RecommendedTextDashboard from './Recommend';
import CompanyDetailsInput from './CompanyDetails';
import CompanyDict from './CompanyDictionary';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route index element={<LandingPage />} />
//       <Route path="/dashboard" element={<Navbar/>} />
//     </>
//   )
// );

function App() {
  const token = window.localStorage.getItem('token');  // Corrected this line
  return (
    <>
      {token != null ? (
        <>
          <PrivateRoute>
            <LandingPage />
          </PrivateRoute>
        </>
      ) : (
        <Routes>
          <Route path="/dashboard" element={<Navbar/>} />
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/choice" element={<CardSelectionPage />} />
          <Route path="/bot" element={<ChatInterface 
          />} />
          <Route path="/analytics" element={<Chart />} />
          <Route path="/domainselector" element={<DomainSelector />} />
          <Route path="/managesubs" element={<SubscriptionManagement />} />
          <Route path="/recommend" element={<RecommendedTextDashboard />} />
          <Route path="/details" element={<CompanyDetailsInput />} />
          <Route path="/dict" element={<CompanyDict />} />
        </Routes>
      )}
    </>
  );
}

export default App;