import { ProfileState } from "../model";

export const selectSelectedProfile = (state: ProfileState) => {
    return state.profiles.find(profile => profile.id === state.selectedProfileId) || null;
};
