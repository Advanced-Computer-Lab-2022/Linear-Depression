import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CorporateTrainee from "./pages/CorporateTrainee";
import IndividualTrainee from "./pages/IndividualTrainee";
import Instructor from "./pages/Instructor";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/instructor" element={<Instructor />} />
                <Route path="/corporate-trainee" element={<CorporateTrainee />} />
                <Route path="/individual-trainee" element={<IndividualTrainee />} />
            </Routes>
        </div>
    );
}

export default App;
