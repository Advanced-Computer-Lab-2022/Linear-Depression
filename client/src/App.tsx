import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { FilterContext } from "./context/FilterContext";
import Home from "./pages/Home";
import CorporateTrainee from "./pages/CorporateTrainee";
import IndividualTrainee from "./pages/IndividualTrainee";
import Instructor from "./pages/Instructor";

function App() {
    const [subjectFilter, setSubjectFilter] = useState<string>("");
    const [ratingFilter, setRatingFilter] = useState<number>(0);
    const [priceFilter, setPriceFilter] = useState<string>("");

    return (
        <FilterContext.Provider
            value={{ subjectFilter, setSubjectFilter, ratingFilter, setRatingFilter, priceFilter, setPriceFilter }}
        >
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/instructor" element={<Instructor />} />
                    <Route path="/corporate-trainee" element={<CorporateTrainee />} />
                    <Route path="/individual-trainee" element={<IndividualTrainee />} />
                </Routes>
            </div>
        </FilterContext.Provider>
    );
}

export default App;
