import { defaultProfiles } from "../data/defaultProfiles";
import { Profile, ProfileState } from "../model";
import { dummyApi } from "../service";
import {
    SELECT_PROFILE,
    DELETE_PROFILE,
    MOVE_PROFILE_UP,
    MOVE_PROFILE_DOWN,
    ADD_PROFILE,
    RENAME_PROFILE,
} from "./actionTypes";

// Default state for our redux store
const defaultState: ProfileState = {
    profiles: [...defaultProfiles],
    selectedProfileId: 1,
};

// Reducer function for our redux store
export function reducer(
    state = defaultState,
    action: {
        type: string;
        payload: any;
    },
) {
    switch (action.type) {
        case SELECT_PROFILE: {
            const { id } = action.payload;
            return {
                ...state,
                selectedProfileId: id,
            };
        }
        case DELETE_PROFILE: {
            const { id } = action.payload;
            const index = state.profiles.findIndex(profile => profile.id === id);
            const updatedProfiles = state.profiles.filter(profile => profile.id !== id);
            let newSelectedId = updatedProfiles[0]?.id;
            if (index > 0) {
                newSelectedId = updatedProfiles[index - 1].id;
            }

            dummyApi(updatedProfiles);

            return {
                ...state,
                profiles: updatedProfiles,
                selectedProfileId: newSelectedId,
            };
        }

        case MOVE_PROFILE_UP: {
            const { id } = action.payload;
            const index = state.profiles.findIndex(profile => profile.id === id);
            if (index > 0) {
                const newProfiles = [...state.profiles];

                [newProfiles[index - 1], newProfiles[index]] = [newProfiles[index], newProfiles[index - 1]];
                dummyApi(newProfiles);
                return {
                    ...state,
                    profiles: newProfiles,
                };
            }

            return state;
        }
        case MOVE_PROFILE_DOWN: {
            const { id } = action.payload;
            const index = state.profiles.findIndex(profile => profile.id === id);
            if (index >= 0 && index < state.profiles.length - 1) {
                const newProfiles = [...state.profiles];
                [newProfiles[index], newProfiles[index + 1]] = [newProfiles[index + 1], newProfiles[index]];
                dummyApi(newProfiles);
                return {
                    ...state,
                    profiles: newProfiles,
                };
            }
            return state;
        }

        case ADD_PROFILE: {
            const newId = state.profiles.length > 0 ? Math.max(...state.profiles.map(p => p.id)) + 1 : 1;
            const newProfile: Profile = {
                id: newId,
                name: "New Profile",
                className: "custom",
                type: "edit",
            };
            const newProfiles = [...state.profiles, newProfile];
            dummyApi(newProfiles);

            return {
                ...state,
                profiles: newProfiles,
                selectedProfileId: newId,
            };
        }

        case RENAME_PROFILE: {
            const { id, newName } = action.payload;
            const updatedProfiles = state.profiles.map(profile =>
                profile.id === id ? { ...profile, name: newName } : profile,
            );
            dummyApi(updatedProfiles);
            return {
                ...state,
                profiles: updatedProfiles,
            };
        }

        default: {
            return state;
        }
    }
}
