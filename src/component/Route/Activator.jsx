import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { load_UserProfile } from "../../actions/userAction";
function Activator() {
    const {
         loading,
        isAuthenticated, user } = useSelector(
            (state) => state.userData
        );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(load_UserProfile());
    }, [dispatch]);
}

export default Activator;