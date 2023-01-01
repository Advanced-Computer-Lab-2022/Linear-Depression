interface IPromotionProps {
    name: string;
    startDate: Date;
    endDate: Date;
    discountPercent: number;
    courses?: string[];
    source?: string;
}

export default IPromotionProps;
