import swagger_ui from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const option = {
    definition: {
        openapi: '1.0.0',
        info: {
            title: "All post",
            version: "1.0.0"
        },
    },
    apis: ["../routers/postRouter.js"],
}

const swaggerSpace = swaggerJsdoc(option);

export { swaggerSpace, swagger_ui };
//module.exports = {swaggerSpace,swagger_ui}


