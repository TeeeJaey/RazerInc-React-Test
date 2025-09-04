import { Profile } from "../model";

export const defaultProfiles: Profile[] = [
    { id: 1, name: "Default", type: "no-edit", className: "default" },
    { id: 2, name: "Game", type: "no-edit", className: "game" },
    { id: 3, name: "Movie", type: "no-edit", className: "movie" },
    { id: 4, name: "Music", type: "no-edit", className: "music" },
    { id: 5, name: "Custom 1", type: "edit", className: "custom" },
    { id: 6, name: "Demo Long Text Demo Long Text Demo", type: "edit", className: "custom" },
];
