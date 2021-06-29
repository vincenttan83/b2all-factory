import { EDivConfigType } from '../enums/div-config-type.enum';

// a page can have multiple section
// a section is fix with one design but with top bottom left right divided area
// section header, can be the H1, and breadcrumb
// section body, is the content
// section footer, is the important notes, some audit trail information
// section right, is only needed if the content required alot of hints input


export interface IDivConfigForHeadings {
    text: string;
    class: string;
}

export interface IDivConfigForBreadcrumb {
    items: { text: string; link: string }[];
    class: string;
}

export interface IDivConfigForButton {
    text: string;
    onclick_fn: () => Promise<void>;
    class: string;
    disabled: boolean;
}

export interface IDivConfigForAlert {
    text: string;
    class: string;
    dismissible: boolean;
}

export interface IDivConfigForCard {
    header_text: string;
    header_image: string;
    body_texxt: string;
    footer_test: string;
}

export interface IDivConfigForPagination {
    items: string[];
}

export interface IDivConfigForProgress {
    is_running: boolean;
    max: number;
    current: number;
    class: string;
}

export interface IDivConfigForSpinners {
    is_running: boolean;
    class: string;
}

export interface IDivConfigToast {
    text: string;
    actions: {
        text: string;
        onclick_fn?: () => void;
        onclick_fn_promise?: () => Promise<void>;
    }[];
}

export interface IDivConfigTableForTextColumn {
    header_text: string;
    field_name: string;
    render_type: string;
    class: string;
}

export interface IDivConfigTableForButtonColumn {
    text: string;
    onclick_fn?: () => void;
    onclick_fn_promise?: () => Promise<void>;
}

export interface IDivConfigForTable {
    columns: IDivConfigTableForTextColumn[] | IDivConfigTableForButtonColumn[];
}

export interface IDivConfig<T> {
    content: T;
    type: EDivConfigType;
}

export interface ISection<T> {
    configs: IDivConfig<T>[];
}

export interface IBody {
    sections: ISection<
        IDivConfigForHeadings |
        IDivConfigForBreadcrumb
    >;
}




export const enum EEntityName {
    UserProfile = 'user_profile',
}

export const enum EColletionName {
    Master = 'master_datas',
    Transaction = 'transaction_datas',
    Reference = 'reference_datas',
}

export interface IWidgetBased {
    collection_name: EColletionName;
    doc_id?: string;
    [key: string]: any;
}


// INFORMATION ARCHITECT VS DATA ARCHITECT
// ref from https://www.bmc.com/blogs/data-architecture-vs-information-architecture/


// Intro:       Information architecture refers to the development of programs designed to input, store and analyze meaningful information;
// Distinction: information architecture interprets the individual data points into meaningful, useable information;
// Life cycle:  information lifecycle management looks at questions like whether or not a piece of data is useful, and if yes, how?
//              In a nutshell, information lifecycle management seeks to take raw data
//              and implement it in a relevant way to form information assets.

// Intro:       Data architecture is the development of programs that interpret and store data;
// Distinction: Data architecture defines the collection, storage and movement of data across an organization;
// Life cycle:  Automated processes that push data from one stage to the next throughout its useful life until
//              it ultimately becomes obsolete and is deleted from a database;

/**
 * They work with different assets: data assets vs information assets
 * They yield different results
 * They have distinctly unique life cycles
 * They require different things from an architecture perspective
 * They require roles with different specialties to be part of an enterprise organization
 */

/**
 * Data -> Workflow -> Information -> Information asset
 *
 * Why we need workflow?
 * Improves overall speed to market
 * Greatly reduces the complexity between all cloud environments
 * Readily scalable
 * Helps mitigate risk
 * Improves integration
 * To achieve this, we need to know how to integrate, automate and orchestrate these workflows.
 * We have b2all scheduler
 */

// The Operation CRUD activities theory
// who has the rights to perform the activity? Related to security area.
// what do store?
// when to maintain the data? The maintainability
// where
// how


// status == how are you? [good/bad]
// state == what are you doing? [resting/working]



// export interface IData {
//     system_tag?: string[]; // for internal analytic use
//     user_tag?: string[]; // for user self search easier

//     in_related_to_entity_of?: {
//         doc_id: string;
//         entity: string;
//     }[]; // for relationship bonding

//     data: EEntityName;

//     data_state: string;
//     data_status: string;
//     modalable: boolean;
// }

// export interface IWidgetCreate<TypeOfEntity> extends IWidgetBased, IWidgetForm<TypeOfEntity> {
//     added_on: Date;
//     added_by: string;
// }

// export interface IWidgetRead extends IWidgetBased {
//     render_in_template: 'read_summary' | 'read_all' | 'delete_confirmation' | 'edit_form' | 'new_form';
// }

// export interface IWidgetUpdate extends IWidgetBased {

// }

// export interface IWidgetDelete extends IWidgetBased {
//     purge: boolean; // true means move the data to somewhere else; false means just delete only.
// }

// export interface IWidgetList extends IWidgetBased {
//     filters: any[];
//     orders: any[];
//     pagination: any;
//     render_in_template: 'table' | 'card';
// }
