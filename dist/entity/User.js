"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "admin" }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: "users" })
], User);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbnRpdHkvVXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FNaUI7QUFFVixJQUFNLElBQUksR0FBVixNQUFNLElBQUk7Q0FxQmhCLENBQUE7QUFyQlksb0JBQUk7QUFFZjtJQURDLElBQUEsZ0NBQXNCLEdBQUU7O2dDQUNkO0FBR1g7SUFEQyxJQUFBLGdCQUFNLEdBQUU7O2tDQUNJO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7O21DQUNYO0FBR2Q7SUFEQyxJQUFBLGdCQUFNLEdBQUU7O3NDQUNRO0FBR2pCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDOztrQ0FDaEI7QUFHYjtJQURDLElBQUEsMEJBQWdCLEdBQUU7OEJBQ1IsSUFBSTt1Q0FBQztBQUdoQjtJQURDLElBQUEsMEJBQWdCLEdBQUU7OEJBQ1IsSUFBSTt1Q0FBQztlQXBCTCxJQUFJO0lBRGhCLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztHQUNiLElBQUksQ0FxQmhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgQ3JlYXRlRGF0ZUNvbHVtbixcclxuICBFbnRpdHksXHJcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcclxuICBVcGRhdGVEYXRlQ29sdW1uLFxyXG59IGZyb20gXCJ0eXBlb3JtXCI7XHJcbkBFbnRpdHkoeyBuYW1lOiBcInVzZXJzXCIgfSlcclxuZXhwb3J0IGNsYXNzIFVzZXIge1xyXG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcclxuICBpZDogbnVtYmVyO1xyXG5cclxuICBAQ29sdW1uKClcclxuICBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIEBDb2x1bW4oeyB1bmlxdWU6IHRydWUgfSlcclxuICBlbWFpbDogc3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKClcclxuICBwYXNzd29yZDogc3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKHsgZGVmYXVsdDogXCJhZG1pblwiIH0pXHJcbiAgcm9sZTogc3RyaW5nO1xyXG5cclxuICBAQ3JlYXRlRGF0ZUNvbHVtbigpXHJcbiAgY3JlYXRlZEF0OiBEYXRlO1xyXG5cclxuICBAVXBkYXRlRGF0ZUNvbHVtbigpXHJcbiAgdXBkYXRlZEF0OiBEYXRlO1xyXG59XHJcbiJdfQ==