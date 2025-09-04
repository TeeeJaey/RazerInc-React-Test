import React, { useCallback, useMemo, useState } from "react";
import { Profile } from "../model";
import { useAppSelector } from "../hooks";
import { useDispatch } from "react-redux";
import { selectProfile } from "../store";

type ProfileItemProps = Profile & {
    isEditing?: boolean;
    onRename?: (val: string) => void;
};

export const ProfileItem: React.FC<ProfileItemProps> = ({ id, name, className, type, isEditing, onRename }) => {
    const [value, setValue] = useState(name);
    const dispatch = useDispatch();
    const selectedProfileId = useAppSelector(state => state.selectedProfileId);

    const classNames = useMemo(
        () =>
            `profile-item ${className} ${type === "no-edit" ? "no-edit" : ""} ${
                id === selectedProfileId ? "active" : ""
            }`,
        [className, type, id, selectedProfileId],
    );

    const handleProfileClick = useCallback(() => {
        dispatch(selectProfile(id));
    }, [id, dispatch]);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length > 25) return;
            setValue(e.target.value);
        },
        [setValue],
    );

    const handleBlur = useCallback(() => {
        if (onRename) onRename(value.trim() ? value : name);
    }, [onRename, value, name]);

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
    }, []);

    return (
        <>
            {isEditing ? (
                <div className={"input-item " + className}>
                    <input
                        autoFocus
                        id="profileRename"
                        className={"profile-item"}
                        placeholder="Enter Profile Name"
                        value={value}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>
            ) : (
                <div key={id} className={classNames} onClick={handleProfileClick}>
                    {name}
                </div>
            )}
        </>
    );
};
