import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CorporateTrainee from "./pages/CorporateTrainee";
import IndividualTrainee from "./pages/IndividualTrainee";
import Instructor from "./pages/Instructor";
import { CountryContext } from "./context/CountryContext";
import { useState } from "react";

function App() {
    const [country, setCountry] = useState("US");
    return (
        <CountryContext.Provider value={{ country, setCountry }}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/instructor" element={<Instructor />} />
                    <Route path="/corporate-trainee" element={<CorporateTrainee />} />
                    <Route path="/individual-trainee" element={<IndividualTrainee />} />
                </Routes>
            </div>
        </CountryContext.Provider>
    );
}

export default App;
