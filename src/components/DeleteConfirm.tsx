import React, { useCallback } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { deleteProfile } from "../store";
import { useDispatch } from "react-redux";
import { Profile } from "../model";

export const DeleteConfirm = ({
    selectedProfile,
    setShowDeleteEq,
}: {
    selectedProfile: Profile;
    setShowDeleteEq: (show: boolean) => void;
}) => {
    const dispatch = useDispatch();

    const handleDeleteConfirmed = useCallback(() => {
        setShowDeleteEq(false);
        if (!selectedProfile?.id) return;
        dispatch(deleteProfile(selectedProfile?.id));
    }, [selectedProfile?.id, setShowDeleteEq, dispatch]);

    return (
        <OutsideClickHandler onOutsideClick={() => setShowDeleteEq(false)}>
            <div id="profileDelCfm" className="profile-del alert flex">
                <div className="title">delete eq</div>
                <div className="body-text t-center" id="delName">
                    {selectedProfile?.name}
                </div>
                <div
                    className="thx-btn"
                    id="cfmDelete"
                    onClick={handleDeleteConfirmed}
                >
                    delete
                </div>
            </div>
        </OutsideClickHandler>
    );
};
