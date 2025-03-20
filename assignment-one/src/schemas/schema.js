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
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: GraphQLString, // ✅ Return a simple string
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

        // Hash the password before saving
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
      type: GraphQLString, // ✅ Return a simple string
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
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
