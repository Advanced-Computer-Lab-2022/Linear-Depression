import Accordion from "./Accordion";

const Filter: React.FC<{ titles: string[]; items: string[]; children: { checkbox: React.FC<{items: string[]}>; rating: React.FC } }> = ({
    titles,
    items,
    children
}) => {
    return (
        <div>
            {titles.map((title) => {
                return (
                    <Accordion
                        title={title}
                        items={title == "Price" ? ["Free", "Paid"] : items}
                        child={title == "Rating" ? children.rating : children.checkbox}
                    />
                );
            })}
        </div>
    );
};

export default Filter;
