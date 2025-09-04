import { Profile } from "./Profile";

export type ProfileState = {
    profiles: Profile[];
    selectedProfileId: number | null;
};
