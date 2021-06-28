export interface ICssClass {
    input: {
        list: {
            label: string;
            item: {
                group: string;
                label: string;
                input: string;
            };
        };
        non_list: {
            group: string;
            label: string;
            input: string;
        };
    };
    text_area: {
        group: string;
        label: string;
        input: string;
    };
    select: {
        group: string;
        label: string;
        select: string;
    };
    button: {
        button: string;
    };
    array: {
        button: string;
        item: string;
        item_label: string;
    };
}
