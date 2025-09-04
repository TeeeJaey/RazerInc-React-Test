import React from "react";
import { Drawer } from "./Drawer";
import { Window } from "./Window";

export const App: React.FC = () => {
    return (
        <div className="main-container">
            <div className="thx-wrapper flex">
                <Drawer />
                <Window />
            </div>
        </div>
    );
};
