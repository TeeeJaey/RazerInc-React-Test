export type Profile = {
    id: number;
    name: string;
    type: "no-edit" | "edit";
    className: "default" | "game" | "movie" | "music" | "custom";
};
