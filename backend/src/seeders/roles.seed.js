import { Role } from "../models/role.model.js";

export default async function rolesSeeder() {
  await Role.deleteMany();
  await Role.insertMany([
    { name: "user" },
    { name: "organizer" },
    { name: "admin" }
  ]);
}
