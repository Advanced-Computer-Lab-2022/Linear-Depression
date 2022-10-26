import { Routes, Route } from "react-router-dom";
import "./App.css";
import CorporateTrainee from "./pages/CorporateTrainee";
import IndividualTrainee from "./pages/IndividualTrainee";
import Instructor from "./pages/Instructor";
import CheckboxLists from "./components/CheckBoxLists";
import StarRating from "./components/StarRating";
import Filter from "./components/Filter";
import Home from "./pages/Home";

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
