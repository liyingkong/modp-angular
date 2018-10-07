import { iId } from "./base/iid.interface"
import { Upload } from "./upload"

export class CutVideoParam implements iId {
    id: number;
    box:number[];
    upload:Upload;
    // cutVideoPath:string;
}