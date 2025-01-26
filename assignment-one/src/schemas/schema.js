import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Employee from "../models/Employee.js";
import User from "../models/User.js";

// Employee Type
const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: () => ({
    id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    designation: { type: GraphQLString },
    salary: { type: GraphQLFloat },
    date_of_joining: { type: GraphQLString },
    department: { type: GraphQLString },
    employee_photo: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllEmployees: {
      type: new GraphQLList(EmployeeType),
      resolve: () => Employee.find(),
    },
    searchEmployeeByEid: {
      type: EmployeeType,
      args: { id: { type: GraphQLID } },
      resolve: (_, { id }) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error("Invalid ObjectId format");
        }
        return Employee.findById(id);
      },
    },
    searchEmployeeByDesignationOrDepartment: {
      type: new GraphQLList(EmployeeType),
      args: {
        designation: { type: GraphQLString },
        department: { type: GraphQLString },
      },
      resolve: (_, args) =>
        Employee.find({
          $or: [
            { designation: args.designation },
            { department: args.department },
          ],
        }),
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: GraphQLString,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(args.password, 10);
        const newUser = new User({
          username: args.username,
          email: args.email,
          password: hashedPassword,
        });
        await newUser.save();
        return "User created successfully!";
      },
    },
    signin: {
      type: GraphQLString,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        const user = await User.findOne({ email: args.email });
        if (!user) {
          throw new Error("User not found");
        }
        const isValidPassword = await bcrypt.compare(
          args.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }
        return "Sign in successful!";
      },
    },
    addNewEmployee: {
      type: EmployeeType,
      args: {
        first_name: { type: new GraphQLNonNull(GraphQLString) },
        last_name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        gender: { type: GraphQLString },
        designation: { type: new GraphQLNonNull(GraphQLString) },
        salary: { type: new GraphQLNonNull(GraphQLFloat) },
        date_of_joining: { type: new GraphQLNonNull(GraphQLString) },
        department: { type: new GraphQLNonNull(GraphQLString) },
        employee_photo: { type: GraphQLString },
      },
      resolve: (_, args) => {
        const newEmployee = new Employee(args);
        return newEmployee.save();
      },
    },
    updateEmployeeByEid: {
      type: EmployeeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        designation: { type: GraphQLString },
        salary: { type: GraphQLFloat },
        date_of_joining: { type: GraphQLString },
        department: { type: GraphQLString },
        employee_photo: { type: GraphQLString },
      },
      resolve: (_, args) =>
        Employee.findByIdAndUpdate(args.id, args, { new: true }),
    },
    deleteEmployeeByEid: {
      type: GraphQLString,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { id }) => {
        await Employee.findByIdAndDelete(id);
        return "Employee deleted successfully!";
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
