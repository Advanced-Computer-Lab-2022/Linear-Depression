export enum UserTypes {
    ADMIN,
    INSTRUCTOR,
    INDIVIDUAL_TRAINEE,
    CORPORATE_TRAINEE
}

export const UserTypesNames = new Map<String, UserTypes>([
    ["Admin", UserTypes.ADMIN],
    ["Instructor", UserTypes.INSTRUCTOR],
    ["IndividualTrainee", UserTypes.INDIVIDUAL_TRAINEE],
    ["CorporateTrainee", UserTypes.CORPORATE_TRAINEE]
]);
