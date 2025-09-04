import React, { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks";
import { Profile } from "../model";
import { ProfileItem } from "./ProfileItem";
import { addProfile, moveProfileDown, moveProfileUp, renameProfile, selectSelectedProfile } from "../store";
import { DeleteConfirm } from "./DeleteConfirm";

const isFirstOrder = (profileList: Profile[], selectedProfile: Profile | null) => {
    if (!selectedProfile) return false;

    return profileList[0].id === selectedProfile.id;
};

const isLastOrder = (profileList: Profile[], selectedProfile: Profile | null) => {
    if (!selectedProfile) return false;
    return profileList[profileList.length - 1].id === selectedProfile.id;
};

export const Drawer: React.FC = () => {
    const dispatch = useDispatch();
    const [showDeletEq, setShowDeleteEq] = useState(false);
    const [editId, setEditId] = useState(-1);
    const endRef = React.useRef<HTMLDivElement>(null);

    let profileList = useAppSelector(state => state.profiles);
    let selectedProfile = useAppSelector(selectSelectedProfile);
    const isFirstOrderProfile = useMemo(
        () => isFirstOrder(profileList, selectedProfile),
        [profileList, selectedProfile],
    );
    const isLastOrderProfile = useMemo(() => isLastOrder(profileList, selectedProfile), [profileList, selectedProfile]);

    const handleAddClick = useCallback(() => {
        dispatch(addProfile());
        setTimeout(() => endRef.current?.scrollIntoView());
    }, [dispatch]);

    const handleDeleteClick = useCallback(() => {
        setShowDeleteEq(true);
    }, [setShowDeleteEq]);

    const handleEditClick = useCallback(() => {
        if (!selectedProfile?.id) return;
        setEditId(selectedProfile?.id);
    }, [selectedProfile?.id, setEditId]);

    const handleUp = useCallback(() => {
        if (isFirstOrderProfile) return;
        if (!selectedProfile?.id) return;
        dispatch(moveProfileUp(selectedProfile?.id));
    }, [isFirstOrderProfile, dispatch, selectedProfile]);

    const handleDown = useCallback(() => {
        if (isLastOrderProfile) return;
        if (!selectedProfile?.id) return;
        dispatch(moveProfileDown(selectedProfile?.id));
    }, [isLastOrderProfile, dispatch, selectedProfile]);

    const handleRename = useCallback(
        (newName: string) => {
            if (!selectedProfile?.id) return;
            dispatch(renameProfile(selectedProfile?.id, newName));
            setEditId(-1);
        },
        [setEditId, selectedProfile, dispatch],
    );

    return (
        <div className="thx-drawer flex">
            <div className="main-title">Profile List</div>

            <div id="profileWrapper" className="drawer-select flex">
                <div id="profileList" className="scrollable">
                    {profileList.map(profile => (
                        <ProfileItem
                            key={profile.id}
                            {...profile}
                            isEditing={profile.id === editId}
                            onRename={handleRename}
                        />
                    ))}
                    <div ref={endRef} />
                </div>
                <div className="toolbar flex">
                    <div className="icon add" id="profileAdd" onClick={handleAddClick}></div>
                    {selectedProfile?.type === "edit" && (
                        <div className="icon edit show" id="profileEdit" onClick={handleEditClick}></div>
                    )}
                    {selectedProfile?.type === "edit" && (
                        <div className="icon delete show" id="profileDelete" onClick={handleDeleteClick}></div>
                    )}

                    <div
                        className={`icon down ${isLastOrderProfile ? "disabled" : ""}`}
                        id="profileDown"
                        onClick={handleDown}
                    ></div>
                    <div
                        className={`icon up ${isFirstOrderProfile ? "disabled" : ""}`}
                        id="profileUp"
                        onClick={handleUp}
                    ></div>
                </div>
                {showDeletEq && <DeleteConfirm setShowDeleteEq={setShowDeleteEq} selectedProfile={selectedProfile!} />}
            </div>
        </div>
    );
};
