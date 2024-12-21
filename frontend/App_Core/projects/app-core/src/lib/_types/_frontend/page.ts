export interface Page{
    icon: string;
    route: string;
    queryParams?: { [key: string]: string };
}