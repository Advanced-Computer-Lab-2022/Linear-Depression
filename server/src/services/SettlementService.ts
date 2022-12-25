import { ISettlement } from "../models/Settlement";

export const settlementMonthMapper = (settlements: ISettlement[]) => {
    const settlementMap = new Map();
    settlements.forEach((settlement) => {
        const year = settlement.createdAt.getFullYear();
        const month = settlement.createdAt.getMonth() + 1;

        if (!settlementMap.has(year)) {
            settlementMap.set(year, new Map());
        }

        const monthMap = settlementMap.get(year);
        if (!monthMap.has(month)) {
            monthMap.set(month, { amount: 0 });
        }

        const monthData = monthMap.get(month);
        monthData.amount += settlement.amount;

        monthMap.set(month, monthData);
        settlementMap.set(year, monthMap);
    });
    const settlementJson = {} as any;
    settlementMap.forEach((monthMap, year) => {
        settlementJson[year] = {};
        monthMap.forEach((monthData: any, month: string | number) => {
            settlementJson[year][month] = monthData;
        });
    });
    return settlementJson;
};
