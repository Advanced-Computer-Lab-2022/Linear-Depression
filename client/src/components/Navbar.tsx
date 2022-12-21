import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Flag from "react-world-flags";

import countries from "../media/country-currency.json";
import Avatar from "./Avatar";
import OptionsButton from "./OptionsButton";
import CountrySelect from "./navbar/CountrySelect";
import "./navbar/Navbar.css";
import { config } from "@internals/config";
import { CountryContext } from "@internals/contexts";
import { useAuth, useFetchProfile } from "@internals/hooks";
import { useAppSelector } from "@internals/redux";
import { logout } from "@internals/services";
import { User } from "@internals/types";

const getUserName = (userType: User, data: any) => {
    if (userType === User.INSTRUCTOR) {
        return `${data.instructor.firstName} ${data.instructor.lastName}`;
    } else if (userType === User.INDIVIDUAL_TRAINEE) {
        return `${data.individualTrainee.firstName} ${data.individualTrainee.lastName}`;
    } else if (userType === User.CORPORATE_TRAINEE) {
        return `${data.corporateTrainee.firstName} ${data.corporateTrainee.lastName}`;
    } else {
        return "";
    }
};

const Navbar = () => {
    const { auth, logout: authLogout } = useAuth();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const { country, setCountry } = useContext(CountryContext);

    useFetchProfile();

    const { data } = useAppSelector((state) => state.profile);

    const options = [
        {
            label: "Profile",
            onClick: () => navigate("/me/profile"),
            icon: <AccountCircleIcon />
        },
        {
            label: "Change Password",
            onClick: () => navigate("/auth/change"),
            icon: <ChangeCircleIcon />
        },
        {
            label: "Logout",
            onClick: () => {
                logout().then(() => {
                    authLogout();
                    navigate("/", { replace: true });
                });
            },
            icon: <LogoutIcon />
        }
    ];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async (value: string) => {
        setOpen(false);
        setCountry(value);
        fetch(`${config.API_URL}/country/${value}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Linear Depression
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                Categories
                            </a>
                        </li>
                        {/* TODO: make search field fill the navbar */}
                        <li className="search-container container-fluid flex-fill">
                            <button className="search-button" type="button">
                                <img
                                    className="search-button-img"
                                    src="https://img.icons8.com/ios-glyphs/344/search--v1.png"
                                    alt="search icon"
                                    onClick={() => {
                                        searchParams.delete("searchTerm");
                                        if (searchTerm.length !== 0) {
                                            searchParams.append("searchTerm", searchTerm);
                                        }
                                        setSearchParams(searchParams);
                                    }}
                                />
                            </button>
                            <input
                                id="search-box"
                                className="search-box"
                                type="text"
                                placeholder="Search for anything"
                                aria-label="Search"
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                }}
                            />
                        </li>
                    </ul>
                    <ul className="navbar-nav buttons-list">
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                LD Business
                            </a>
                        </li>
                        {auth.userType !== User.GUEST && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/me/courses">
                                    My Courses
                                </Link>
                            </li>
                        )}
                        {auth.userType === User.GUEST && (
                            <>
                                <button
                                    className="navbar-item login-button"
                                    onClick={() => navigate("/auth/login", { replace: true })}
                                >
                                    Log In
                                </button>
                                <button className="navbar-item signup-button">Sign Up</button>
                            </>
                        )}

                        <button className="navbar-item language-button" onClick={handleClickOpen}>
                            <Flag
                                code={country}
                                fallback={
                                    <img
                                        className="language-img"
                                        src="https://img.icons8.com/material-outlined/344/globe--v2.png"
                                        alt="language icon"
                                    />
                                }
                            />
                        </button>
                        {auth.userType !== User.GUEST && data !== null && (
                            <div className="navbar-item">
                                <OptionsButton
                                    options={options}
                                    icon={<Avatar name={getUserName(auth.userType, data)} />}
                                />
                            </div>
                        )}
                    </ul>
                </div>
            </div>
            <CountrySelect selectedValue={country} open={open} onClose={handleClose} countries={countries} />
        </nav>
    );
};

export default Navbar;
