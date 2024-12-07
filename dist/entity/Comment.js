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
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const Article_1 = require("./Article");
let Comment = class Comment {
};
exports.Comment = Comment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Comment.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Article_1.Article, (article) => article.comments),
    __metadata("design:type", Article_1.Article)
], Comment.prototype, "article", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Comment.prototype, "articleId", void 0);
exports.Comment = Comment = __decorate([
    (0, typeorm_1.Entity)({ name: "comments" })
], Comment);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbnRpdHkvQ29tbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FNaUI7QUFDakIsdUNBQW9DO0FBRzdCLElBQU0sT0FBTyxHQUFiLE1BQU0sT0FBTztDQXNCbkIsQ0FBQTtBQXRCWSwwQkFBTztBQUVsQjtJQURDLElBQUEsZ0NBQXNCLEdBQUU7O21DQUNkO0FBR1g7SUFEQyxJQUFBLGdCQUFNLEdBQUU7O3FDQUNJO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEdBQUU7O3dDQUNPO0FBR2hCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztzQ0FDYjtBQUlkO0lBREMsSUFBQSwwQkFBZ0IsR0FBRTs4QkFDUixJQUFJOzBDQUFDO0FBR2hCO0lBREMsSUFBQSxtQkFBUyxFQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7OEJBQy9DLGlCQUFPO3dDQUFDO0FBR2pCO0lBREMsSUFBQSxnQkFBTSxHQUFFOzswQ0FDUztrQkFyQlAsT0FBTztJQURuQixJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7R0FDaEIsT0FBTyxDQXNCbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbHVtbixcclxuICBDcmVhdGVEYXRlQ29sdW1uLFxyXG4gIEVudGl0eSxcclxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxyXG4gIE1hbnlUb09uZSxcclxufSBmcm9tIFwidHlwZW9ybVwiO1xyXG5pbXBvcnQgeyBBcnRpY2xlIH0gZnJvbSBcIi4vQXJ0aWNsZVwiO1xyXG5cclxuQEVudGl0eSh7IG5hbWU6IFwiY29tbWVudHNcIiB9KVxyXG5leHBvcnQgY2xhc3MgQ29tbWVudCB7XHJcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxyXG4gIGlkOiBudW1iZXI7XHJcblxyXG4gIEBDb2x1bW4oKVxyXG4gIG5hbWU6IHN0cmluZztcclxuXHJcbiAgQENvbHVtbigpXHJcbiAgY29udGVudDogc3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBwaG9uZTogc3RyaW5nO1xyXG4gIC8vbnVsbGFibGU6IHRydWVcclxuXHJcbiAgQENyZWF0ZURhdGVDb2x1bW4oKVxyXG4gIGNyZWF0ZWRBdDogRGF0ZTtcclxuXHJcbiAgQE1hbnlUb09uZSgoKSA9PiBBcnRpY2xlLCAoYXJ0aWNsZSkgPT4gYXJ0aWNsZS5jb21tZW50cylcclxuICBhcnRpY2xlOiBBcnRpY2xlO1xyXG5cclxuICBAQ29sdW1uKClcclxuICBhcnRpY2xlSWQ6IG51bWJlcjtcclxufVxyXG4iXX0=