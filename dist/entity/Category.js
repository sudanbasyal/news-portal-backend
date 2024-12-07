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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const Article_1 = require("./Article");
let Category = class Category {
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Article_1.Article, (article) => article.category),
    __metadata("design:type", Array)
], Category.prototype, "articles", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)({ name: "categories" })
], Category);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW50aXR5L0NhdGVnb3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUE0RTtBQUM1RSx1Q0FBb0M7QUFHN0IsSUFBTSxRQUFRLEdBQWQsTUFBTSxRQUFRO0NBU3BCLENBQUE7QUFUWSw0QkFBUTtBQUVuQjtJQURDLElBQUEsZ0NBQXNCLEdBQUU7O29DQUNkO0FBR1g7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7O3NDQUNaO0FBR2I7SUFEQyxJQUFBLG1CQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsaUJBQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzs7MENBQ3BDO21CQVJULFFBQVE7SUFEcEIsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDO0dBQ2xCLFFBQVEsQ0FTcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHksIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sIENvbHVtbiwgT25lVG9NYW55IH0gZnJvbSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IHsgQXJ0aWNsZSB9IGZyb20gXCIuL0FydGljbGVcIjtcclxuXHJcbkBFbnRpdHkoeyBuYW1lOiBcImNhdGVnb3JpZXNcIiB9KVxyXG5leHBvcnQgY2xhc3MgQ2F0ZWdvcnkge1xyXG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcclxuICBpZDogbnVtYmVyO1xyXG5cclxuICBAQ29sdW1uKHsgdW5pcXVlOiB0cnVlIH0pXHJcbiAgbmFtZTogc3RyaW5nO1xyXG5cclxuICBAT25lVG9NYW55KCgpID0+IEFydGljbGUsIChhcnRpY2xlKSA9PiBhcnRpY2xlLmNhdGVnb3J5KVxyXG4gIGFydGljbGVzOiBBcnRpY2xlW107XHJcbn1cclxuIl19