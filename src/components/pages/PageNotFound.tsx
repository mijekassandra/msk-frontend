import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

//import components
import BodyContainer from "../containers/BodyContainer";
import PrimaryButton from "../buttons/PrimaryButton";

const PageNotFound = () => {
    const navigate = useNavigate();

    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);

    const handleNavigate = () => {
        if (userDetail) {
            // If user is logged in, redirect to dashboard
            navigate("/dashboard");
        } else {
            // If not logged in, redirect to login
            navigate("/");
        }
    };

    return (
        <BodyContainer
            background=""
            flexDirection="flex"
            justifyContent="center"
            alignItems="center"
            content={
                <Stack>
                    <img src="/src/assets/void.png" alt="404-image"></img>
                    <Typography variant="h4">
                        The page you’re looking for has slipped into the void.
                    </Typography>
                    <Typography variant="body1">
                        It might have never existed, or it could be lost in the
                        digital abyss. Either way, you’re free to wander back to
                        reality.
                    </Typography>
                    <PrimaryButton size="medium" onClick={handleNavigate}>
                        Back to Dashboard
                    </PrimaryButton>
                </Stack>
            }
        ></BodyContainer>
    );
};

export default PageNotFound;
