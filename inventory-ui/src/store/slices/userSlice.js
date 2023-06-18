import {createSlice} from "@reduxjs/toolkit";
import {addToLocalStorage, getFromLocalStorage, removeFromLocalStorage} from "../../storage/localStorage";

const initialState = {
    user: null,
    jwtToken: null
}

const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            addUser(state, {payload: user}) {
                addToLocalStorage('user', user);
                return user;
            },
            removeUser() {
                removeFromLocalStorage('user');
                return initialState;
            }
        }
    }
);

let userState = [];
const subscribeToStore = (store) => {
    store.subscribe(() => {
        const user = store.getState().user;
        if(userState !== user) {
            addToLocalStorage('user', user);
            userState = user;
        }
    });
}
const getUserFromLocalStorage = () => getFromLocalStorage('user') || initialState;

export default userSlice.reducer;
export const {addUser, removeUser} = userSlice.actions;

export {
    subscribeToStore,
    getUserFromLocalStorage
}