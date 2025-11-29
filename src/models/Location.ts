export interface Location
{
    locationid?: number; // optional for inserts
    qrcodeid?: number | null;
    buildingname: string;
    description?: string | null;
}
