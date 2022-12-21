var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, CreatedAt, UpdatedAt } from 'sequelize-typescript';
let FeedItem = class FeedItem extends Model {
    constructor() {
        super(...arguments);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    Column,
    __metadata("design:type", String)
], FeedItem.prototype, "caption", void 0);
__decorate([
    Column,
    __metadata("design:type", String)
], FeedItem.prototype, "url", void 0);
__decorate([
    Column,
    CreatedAt,
    __metadata("design:type", Date)
], FeedItem.prototype, "createdAt", void 0);
__decorate([
    Column,
    UpdatedAt,
    __metadata("design:type", Date)
], FeedItem.prototype, "updatedAt", void 0);
FeedItem = __decorate([
    Table
], FeedItem);
export { FeedItem };
//# sourceMappingURL=FeedItem.js.map