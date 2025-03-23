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
    getEmployeeById: {
      type: EmployeeType,
      args: { id: { type: GraphQLID } },
      resolve: async (_, { id }) => {
        return await Employee.findById(id);
      },
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
        const existingUser = await User.findOne({ email: args.email });
        if (existingUser) {
          throw new Error("Email already in use");
        }

        const hashedPassword = await bcrypt.hash(args.password, 10);
        const newUser = new User({
          username: args.username,
          email: args.email,
          password: hashedPassword,
        });
        await newUser.save();

        return "User signed up successfully!";
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

        return "Signed In";
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
      resolve: async (_, args) => {
        const newEmp = new Employee(args);
        return await newEmp.save();
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
      resolve: async (_, args) => {
        const { id, ...updateFields } = args;

        Object.keys(updateFields).forEach(
          (key) => updateFields[key] === undefined && delete updateFields[key]
        );

        updateFields.updated_at = new Date();

        const updatedEmp = await Employee.findByIdAndUpdate(id, updateFields, {
          new: true,
        });

        if (!updatedEmp) throw new Error("Employee not found");
        return updatedEmp;
      },
    },
    deleteEmployeeByEid: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, { id }) => {
        const emp = await Employee.findByIdAndDelete(id);
        if (!emp) throw new Error("Employee not found");
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
