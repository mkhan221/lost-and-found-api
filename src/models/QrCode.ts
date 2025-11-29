export interface QrCode
{
    qrcodeid?: number; // optional for inserts
    locationid?: number | null;
    qrcodepath: string;
    createdon?: Date;
}

