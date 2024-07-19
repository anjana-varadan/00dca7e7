import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../Header.jsx'
import ActivityFeed from './ActivityFeed.jsx'
import ActivityDetails from './ActivityDetails.jsx'

// AppLayout component to set up the main application layout with routing
function AppLayout() {
    return (
        // BrowserRouter to enable routing in the application
        <BrowserRouter>
        {/* Header component displayed at the top of the page */}
            <Header></Header>
            {/* Routes to define the different paths and their corresponding components */}
            <Routes>
                <Route path="/" element={<ActivityFeed />} /> {/* Route for the main activity feed */}
                <Route path="/details/:id" element={<ActivityDetails />} /> {/* Route for displaying details of a specific call */}
            </Routes>
        </BrowserRouter>
    )
}

export default AppLayout