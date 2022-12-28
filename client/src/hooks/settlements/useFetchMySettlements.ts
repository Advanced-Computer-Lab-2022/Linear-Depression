import { useEffect, useState } from "react";

import { fetchMySettlements } from "@internals/services";

const useFetchMySettlements = () => {
    const [settlements, setSettlements] = useState({
        data: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        fetchMySettlements()
            .then((data) => {
                setSettlements({
                    data: data,
                    loading: false,
                    error: null
                });
            })
            .catch((error) => {
                setSettlements({
                    data: null,
                    loading: false,
                    error: error
                });
            });
    }, []);

    return { settlements };
};

export default useFetchMySettlements;
