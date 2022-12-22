export enum UserType {
    GUEST,
    ADMIN,
    INSTRUCTOR,
    INDIVIDUAL_TRAINEE,
    CORPORATE_TRAINEE
}

export const UserTypesNames = new Map<String, UserType>([
    ["GUEST", UserType.GUEST],
    ["Admin", UserType.ADMIN],
    ["Instructor", UserType.INSTRUCTOR],
    ["IndividualTrainee", UserType.INDIVIDUAL_TRAINEE],
    ["CorporateTrainee", UserType.CORPORATE_TRAINEE]
]);
