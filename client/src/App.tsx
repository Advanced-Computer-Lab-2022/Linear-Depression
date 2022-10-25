import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CorporateTrainee from "./pages/CorporateTrainee";
import IndividualTrainee from "./pages/IndividualTrainee";
import Instructor from "./pages/Instructor";
import Accordion from "./components/Accordion";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/instructor" element={<Instructor />} />
                <Route path="/corporate-trainee" element={<CorporateTrainee />} />
                <Route path="/individual-trainee" element={<IndividualTrainee />} />
            </Routes>
            <div>
                <Accordion title="Subject" />
                <Accordion title="Price" />
                <Accordion />
            </div>
        </div>
    );
}

export default App;
