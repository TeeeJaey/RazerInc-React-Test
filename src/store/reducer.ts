import { defaultProfiles } from "../data/defaultProfiles";
import { Profile, ProfileState } from "../model";
import { dummyApi } from "../service";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProfileState = {
    profiles: [...defaultProfiles],
    selectedProfileId: 1,
};

export const profilesSlice = createSlice({
    name: "profiles",
    initialState,
    reducers: {
        selectProfile: (state, action: PayloadAction<number>) => {
            state.selectedProfileId = action.payload;
        },
        deleteProfile: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const index = state.profiles.findIndex(
                (profile) => profile.id === id
            );
            const updatedProfiles = state.profiles.filter(
                (profile) => profile.id !== id
            );
            let newSelectedId = updatedProfiles[0]?.id;
            if (index > 0) {
                newSelectedId = updatedProfiles[index - 1].id;
            }

            dummyApi(updatedProfiles);

            state.profiles = updatedProfiles;
            state.selectedProfileId = newSelectedId;
        },
        moveProfileUp: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const index = state.profiles.findIndex(
                (profile) => profile.id === id
            );
            if (index > 0) {
                const newProfiles = [...state.profiles];

                [newProfiles[index - 1], newProfiles[index]] = [
                    newProfiles[index],
                    newProfiles[index - 1],
                ];
                dummyApi(newProfiles);
                state.profiles = newProfiles;
            }
        },
        moveProfileDown: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const index = state.profiles.findIndex(
                (profile) => profile.id === id
            );
            if (index >= 0 && index < state.profiles.length - 1) {
                const newProfiles = [...state.profiles];
                [newProfiles[index], newProfiles[index + 1]] = [
                    newProfiles[index + 1],
                    newProfiles[index],
                ];
                dummyApi(newProfiles);
                state.profiles = newProfiles;
            }
        },
        addProfile: (state) => {
            const newId =
                state.profiles.length > 0
                    ? Math.max(...state.profiles.map((p) => p.id)) + 1
                    : 1;
            const newProfile: Profile = {
                id: newId,
                name: "New Profile",
                className: "custom",
                type: "edit",
            };
            const newProfiles = [...state.profiles, newProfile];
            dummyApi(newProfiles);

            state.profiles = newProfiles;
            state.selectedProfileId = newId;
        },
        renameProfile: (
            state,
            action: PayloadAction<{ id: number; name: string }>
        ) => {
            const { id, name } = action.payload;
            const updatedProfiles = state.profiles.map((profile) =>
                profile.id === id ? { ...profile, name } : profile
            );
            dummyApi(updatedProfiles);
            state.profiles = updatedProfiles;
        },
    },
});

export const {
    selectProfile,
    addProfile,
    renameProfile,
    deleteProfile,
    moveProfileUp,
    moveProfileDown,
} = profilesSlice.actions;
export const reducer = profilesSlice.reducer;
