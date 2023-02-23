export interface ILinksData {
    id:       number;
    linkDesc: string;
    linkImg:  string;
    name:     string;
    parent:   null;
    path:     string;
    sub:      ILinksSub[];
    urls:     string;
}

export interface ILinksSub {
    id:       number;
    linkDesc: string;
    linkImg:  string;
    name:     string;
    parent:   number;
    path:     string;
    sub:      SubSub[];
    urls:     string;
}

export interface SubSub {
    id:       number;
    linkDesc: string;
    linkImg:  string;
    name:     string;
    parent:   number;
    path:     null | string;
    sub:      any[];
    urls:     string;
}