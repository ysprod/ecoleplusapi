"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
const mongoose_1 = require("mongoose");
class ValidationService {
    static validateObjectId(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new Error('INVALID_OBJECT_ID');
        }
    }
}
exports.ValidationService = ValidationService;
//# sourceMappingURL=validation.service.js.map