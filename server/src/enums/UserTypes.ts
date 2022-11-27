export enum UserTypes {
    GUEST,
    ADMIN,
    INSTRUCTOR,
    INDIVIDUAL_TRAINEE,
    CORPORATE_TRAINEE
}

export const UserTypesNames = new Map<String, UserTypes>([
    ["GUEST", UserTypes.GUEST],
    ["Admin", UserTypes.ADMIN],
    ["Instructor", UserTypes.INSTRUCTOR],
    ["IndividualTrainee", UserTypes.INDIVIDUAL_TRAINEE],
    ["CorporateTrainee", UserTypes.CORPORATE_TRAINEE]
]);
