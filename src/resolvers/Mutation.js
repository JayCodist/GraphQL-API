const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {APP_SECRET, getUserId} = require("../utils.js");


const upVote = async (parent, args, context, info) =>
{
	const userId = getUserId(context);
	//	A user votes only once for a link
	const previousVote = await context.prisma.link({id: args.id}).votes({
		where: {user: {id: userId} }
	});

	//if (previousVote)
		//return previousVote;


	return await context.prisma.createVote({
		link: { connect: {id: args.id} },
		user: { connect: {id: userId} }
	});
}

const addLink = async (parent, args, context, info) => 
{
	const userId = getUserId(context);
	return await context.prisma.createLink
	({
		url: args.url,
		description: args.description,
		createdBy: { connect: {id: userId} }
	});
}

const removeLink = async (parent, {id}, context, info) => 
{
	getUserId(context);
	return await context.prisma.deleteLink({id});
}

const signUp = async (parent, args, context, info) =>
{
	const password = await bcrypt.hash(args.password, 10);

	const user = await context.prisma.createUser({...args, password});

	const token = jwt.sign({userId: user.id}, APP_SECRET)

	return {user, token};
};

const login = async (parent, args, context, info) =>
{
	const user = await context.prisma.user({email: args.email});
	if (!user) throw new Error("Email is not signed up!");

	const valid = await bcrypt.compare(args.password, user.password);
	if (!valid) throw new Error("Wrong password!");

	const token = jwt.sign({userId: user.id}, APP_SECRET);

	return {user, token};
}

module.exports = {
	addLink,
	removeLink,
	signUp,
	login,
	upVote,
};