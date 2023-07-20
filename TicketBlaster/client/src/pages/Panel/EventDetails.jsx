import React from "react";
import { PanelLayout } from "../../components/Layout/PanelLayout/PanelLayout";
import { CreateEvent } from "../../components/Content/EventPanel/CreateEvent";

export const EventDetails = () => {
    return (
        <div>
            <PanelLayout header={"Events"}>
                <CreateEvent />
            </PanelLayout>
        </div>
    );
};
