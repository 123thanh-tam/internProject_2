import { DropDownItem } from "../models";

export enum eUserKind {
    Admin,
    TravelGuide,
    Customer
}
export const UserKindOptionss = [
    new DropDownItem("Admin", eUserKind.Admin),
    new DropDownItem("Travel Guide", eUserKind.TravelGuide),
    new DropDownItem("Customer", eUserKind.Customer)
]



