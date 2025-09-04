import {
    SELECT_PROFILE,
    DELETE_PROFILE,
    MOVE_PROFILE_UP,
    MOVE_PROFILE_DOWN,
    ADD_PROFILE,
    RENAME_PROFILE,
} from "./actionTypes";

export function selectProfile(id: number) {
    return {
        type: SELECT_PROFILE,
        payload: { id },
    };
}

export function addProfile() {
    return {
        type: ADD_PROFILE,
    };
}

export function deleteProfile(id: number) {
    return {
        type: DELETE_PROFILE,
        payload: { id },
    };
}

export function renameProfile(id: number, newName: string) {
    return {
        type: RENAME_PROFILE,
        payload: { id, newName },
    };
}

export function moveProfileUp(id: number) {
    return {
        type: MOVE_PROFILE_UP,
        payload: { id },
    };
}
export function moveProfileDown(id: number) {
    return {
        type: MOVE_PROFILE_DOWN,
        payload: { id },
    };
}
