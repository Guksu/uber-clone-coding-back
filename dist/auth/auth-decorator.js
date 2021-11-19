"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../users/entities/user.entity");
const Role = (role) => (0, common_1.SetMetadata)('role', role);
exports.Role = Role;
//# sourceMappingURL=auth-decorator.js.map