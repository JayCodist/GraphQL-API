const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Mutation = require("./resolvers/Mutation.js");
const Query = require("./resolvers/Query.js");
const Link = require("./resolvers/Link.js");
const User = require("./resolvers/User.js");
const Subscription = require("./resolvers/Subscription.js");
const Vote = require("./resolvers/Vote.js");

const resolvers = {Mutation, Query, Link, User, Subscription, Vote};


const server = new GraphQLServer(
	{
		typeDefs: "./src/schema.graphql", 
		resolvers, 
		context: request => { return {...request, prisma} }, 
	});

server.start(() => console.log(`server started on http://localhost:4000`));
