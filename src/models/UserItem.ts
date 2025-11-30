export interface UserItem
{
    useritemid?: number; // optional for inserts
    postedbyuserid: number;
    locationid?: number | null;
    itemid: number;
    isfound?: boolean;
    dateposted?: Date;
    claimedbyuserid?: number | null; 
}
