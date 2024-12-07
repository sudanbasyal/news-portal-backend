"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.findByEmail = exports.userRepository = void 0;
const dataSource_1 = require("../dataSource");
const User_1 = require("../entity/User");
exports.userRepository = dataSource_1.AppDataSource.getRepository(User_1.User);
const findByEmail = async (email) => {
    return exports.userRepository.findOneBy({ email });
};
exports.findByEmail = findByEmail;
const getUser = async (id) => {
    return await exports.userRepository.findOne({
        where: { id },
    });
};
exports.getUser = getUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOENBQThDO0FBQzlDLHlDQUFzQztBQUV6QixRQUFBLGNBQWMsR0FBRywwQkFBYSxDQUFDLGFBQWEsQ0FBQyxXQUFJLENBQUMsQ0FBQztBQUV6RCxNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsS0FBYSxFQUFFLEVBQUU7SUFDakQsT0FBTyxzQkFBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDN0MsQ0FBQyxDQUFDO0FBRlcsUUFBQSxXQUFXLGVBRXRCO0FBRUssTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLEVBQVUsRUFBRSxFQUFFO0lBQzFDLE9BQU8sTUFBTSxzQkFBYyxDQUFDLE9BQU8sQ0FBQztRQUNsQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUU7S0FDZCxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFKVyxRQUFBLE9BQU8sV0FJbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBEYXRhU291cmNlIH0gZnJvbSBcIi4uL2RhdGFTb3VyY2VcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9lbnRpdHkvVXNlclwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZXJSZXBvc2l0b3J5ID0gQXBwRGF0YVNvdXJjZS5nZXRSZXBvc2l0b3J5KFVzZXIpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGZpbmRCeUVtYWlsID0gYXN5bmMgKGVtYWlsOiBzdHJpbmcpID0+IHtcclxuICByZXR1cm4gdXNlclJlcG9zaXRvcnkuZmluZE9uZUJ5KHsgZW1haWwgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VXNlciA9IGFzeW5jIChpZDogbnVtYmVyKSA9PiB7XHJcbiAgcmV0dXJuIGF3YWl0IHVzZXJSZXBvc2l0b3J5LmZpbmRPbmUoe1xyXG4gICAgd2hlcmU6IHsgaWQgfSxcclxuICB9KTtcclxufTtcclxuIl19