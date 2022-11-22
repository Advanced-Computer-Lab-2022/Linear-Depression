import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Home, CorporateTrainee, IndividualTrainee, Instructor, Course } from "@internals/pages";

import { CountryContext } from "./context/CountryContext";
import Navbar from "./components/Navbar";
import { config } from "./config/config";
import { UserContext } from "./context/UserContext";
import { User } from "./types/User";
import { StatusCodes } from "http-status-codes";
import getCurrency from "./services/getCurrency";

function App() {
    let defaultCountry = "";

    const [country, setCountry] = useState(defaultCountry);
    const [currency, setCurrency] = useState("USD");
    const [userId, setUserId] = useState("");
    const [userType, setUserType] = useState(User.GUEST);

    useEffect(() => {
        fetch(`${config.API_URL}/country`, { credentials: "include" }).then((res) => {
            if (res.status === StatusCodes.OK) {
                res.json().then((data) => {
                    setCountry(data.language);
                    setCurrency(getCurrency(data.language));
                    console.log(currency);
                });
            }
        });
    }, []);
    return (
        <UserContext.Provider value={{ userId, setUserId, userType, setUserType }}>
            <CountryContext.Provider value={{ country, setCountry, currency, setCurrency }}>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="course/:courseId" element={<Course />} />
                        <Route path="instructor/*" element={<Instructor />} />
                        <Route path="corporate-trainee" element={<CorporateTrainee />} />
                        <Route path="individual-trainee" element={<IndividualTrainee />} />
                    </Routes>
                </div>
            </CountryContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
