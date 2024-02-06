import { DowntimeGuideList } from "@employee/models/downtime.model";

export const APIDowntimeGuideClassMappers = (data: DowntimeGuideList) => {
    return {
        id: data.id,
        classification: data.classification,
        description: data.description,
        accountability: data.accountability
    };
};

