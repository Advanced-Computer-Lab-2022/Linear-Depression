interface IPromotionProps {
    name: string;
    startDate: Date;
    endDate: Date;
    discountPercent: number;
    courses?: string[];
}

export default IPromotionProps;
