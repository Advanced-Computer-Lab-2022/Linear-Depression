import { AddThreadReply } from "@internals/api";

const execute = async (
    reportId: string,
    message: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setLoading(true);

    try {
        await AddThreadReply(reportId, message);
        window.location.reload();
    } catch (err) {
        setLoading(false);
        alert(err);
    }
};

export default execute;
