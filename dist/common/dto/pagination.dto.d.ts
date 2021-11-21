import { CoreOutput } from './output.dto';
export declare class PaginationInput {
    page: number;
}
export declare class PaginationOutput extends CoreOutput {
    totalPage?: number;
}
