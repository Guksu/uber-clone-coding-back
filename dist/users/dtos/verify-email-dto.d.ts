import { CoreOutput } from 'src/common/dto/output.dto';
import { Verification } from '../entities/verification.entity';
declare const VerifyEmailInput_base: import("@nestjs/common").Type<Pick<Verification, "code">>;
export declare class VerifyEmailInput extends VerifyEmailInput_base {
}
export declare class VerifyEmailOutput extends CoreOutput {
}
export {};
