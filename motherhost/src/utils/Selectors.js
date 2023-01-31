
import {Store} from "../redux/store";
const state = Store.getState();
export const selectUserID = () => state.loginData?.userid;
export const selectUserName = () => state.loginData?.fullname;
