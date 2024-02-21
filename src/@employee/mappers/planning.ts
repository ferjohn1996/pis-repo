import { Line, PlanningPost } from "@employee/models/planning.model";

export const APIPlanningMappers = (data: PlanningPost) => {
    return {
        id: data.id,
        description: data.description
    };
};

export const APIPlanningLine1Mappers = (data: Line) => {
    return {
        id: data.id,
        planningId: data.planningId,
        planningRequestId: data.planningRequestId,
        sku: data.sku,
        description: data.description,
        form: data.form,
        mt: data.mt,
        actualHours: data.actualHours,
        effectiveCapacity: data.effectiveCapacity,
        dieSizeThickness: data.dieSizeThickness,
        changeOver: data.changeOver,
        uncontrollable: data.uncontrollable,
        accountability: data.accountability,
        delayStatus: data.delayStatus,
        timeProduce: data.timeProduce,
        remarks: data.remarks
    };
};