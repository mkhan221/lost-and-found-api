export interface UserItemDetails
{
    useritemid: number;
    useritemdateposted: string; // or Date
    isfound: boolean;

    itemid: number;
    itemdescription: string;
    itemcategory: string;
    itemimagepath: string | null;
    itemstatus: string;
    itemdateposted: string;

    locationid: number | null;
    locationbuilding: string | null;
    locationdescription: string | null;

    qrcodeid: number | null;
    qrcodepath: string | null;
    qrcodecreatedon: string | null;

    postedbyuserid: number;
    postedbyfirstname: string;
    postedbylastname: string;
    postedbyusertype: string;
    postedbyemail: string;
    postedbyphonenumber: string | null;
}
