import { Alert, AlertTitle } from "@mui/material";

const ErrorDisplay = () => {
    return (
        <Alert severity="error">
            <AlertTitle>Something went wrong!</AlertTitle>
            Please contact the administration.
        </Alert>
    );
};

export default ErrorDisplay;
