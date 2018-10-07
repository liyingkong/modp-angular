import { iId } from "./base/iid.interface"

export class Upload implements iId {

    id: number;

    mime: string;
    name: string;
    code: string;
    type: string;
    refId: number;

    uploadDate: Date | number;

    cutVideoPath: string;

    videoTrackPath: string;
    videoMaskPath: string;
    // cut_video_code: string;

    createdAt: Date | number;
    createdBy: string;
    updatedAt: Date | number;
    updatedBy: string;
}