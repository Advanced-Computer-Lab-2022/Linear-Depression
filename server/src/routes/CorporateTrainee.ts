import express from "express";
import controller from "../controllers/CorporateTrainee";

const router = express.Router();

router.get(
    "/",
    /* #swagger.tags = ['CorporateTrainee']
       #swagger.description = 'Endpoint to get list of CorporateTrainee.'
       #swagger.responses[200] = {
                description: 'List of CorporateTrainee',
                schema: { $ref: "#/components/CorporateTrainee" }
         } */
    controller.listCorporateTrainees
);
router.post(
    "/",
    /* #swagger.tags = ['CorporateTrainee']
   #swagger.description = 'Endpoint to create a CorporateTrainee.'
   #swagger.consumes = ['application/json']
    #swagger.responses[200] = {
            description: 'CorporateTrainee created',
            schema: { $ref: "#/components/CorporateTrainee" }
        }
    #swagger.responses[400] = {
            description: 'Bad request',
        }
    #swagger.responses[500] = {
            description: 'Internal server error',
        } */
    controller.createCorporateTrainee
);
router.get("/:corporateTraineeId", controller.readCorporateTrainee);
router.put("/:corporateTraineeId", controller.updateCorporateTrainee);
router.delete("/:corporateTraineeId", controller.deleteCorporateTrainee);

export default router;
