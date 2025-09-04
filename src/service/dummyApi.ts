import { Profile } from "../model";

let timer: NodeJS.Timeout;

export async function callApi(profiles: Profile[]): Promise<string> {
    return new Promise(resolve => {
        // axios.post("/api/saveProfiles", { profiles });
        setTimeout(() => {
            resolve("Dummy API response");
            console.log("Profiles saved:", profiles);
        }, 1000);
    });
}

export const dummyApi = (profile: Profile[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callApi(profile), 3000);
};
