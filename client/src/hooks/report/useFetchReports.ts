import { useState, useEffect } from "react";

import { GetUserReports } from "@internals/api";

const useFetchReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        GetUserReports()
            .then((res) => {
                setReports(res);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return { reports, error, loading };
};

export default useFetchReports;
