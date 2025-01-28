import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

interface User {
    id: number;
    name: string;
}

interface UsersState {
    users: User[];
}

const initialState: UsersState = {
    users: [
        {id: 1, name: 'User'},
        {id: 2, name: 'XXXX'},
        {id: 3, name: 'VAsya'},
        {id: 4, name: 'Оля'},
        {id: 5, name: 'Kolya'},
        {id: 6, name: 'NICK'},
        {id: 7, name: 'Rage123'},
        {id: 8, name: 'Lev'},
        {id: 9, name: 'XCSCSDC'},
    ],
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUserName: (state, action: PayloadAction<{ id: number; name: string }>) => {
            const {id, name} = action.payload;
            const user = state.users.find((user) => user.id === id);
            if (user) {
                user.name = name;
            }
        },
    },
});

export const {updateUserName} = userSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;

export const selectUserById = (id: number) =>
    createSelector([selectUsers], (users) => users.find((user) => user.id === id));

export default userSlice.reducer;