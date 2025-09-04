import React from "react";
import { useAppSelector } from "../hooks";
import { selectSelectedProfile } from "../store";

export const Window: React.FC = () => {
    let selectedProfile = useAppSelector(selectSelectedProfile);

    return (
        <div className="thx-window">
            <div className="sub-title flex">
                <h1 id="eqTitle" className="eq-title">
                    {selectedProfile?.name ? selectedProfile.name : ""}
                </h1>
            </div>
        </div>
    );
};
