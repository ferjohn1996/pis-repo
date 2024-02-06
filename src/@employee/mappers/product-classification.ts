import { ProductClassification } from "@employee/models/product.model";

export const APIProductClassMappers = (data: ProductClassification) => {
    return {
        id: data.id,
        code: data.code,
        description: data.description
    };
};

