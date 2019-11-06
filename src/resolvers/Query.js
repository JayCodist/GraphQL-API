const info = () => "This is the API of a Hackernews clone";

const feed = async (parent, args, context, info) => 
{
	const where = args.filter ? {
		OR: [
		{url_contains: args.filter},
		{description_contains: args.filter},
		{createdBy: {name_contains: args.filter}}
		]
	} : {};
	const links = await context.prisma.links({
		where,
		skip: args.skip,
		first: args.first,
		orderBy: args.orderby ? args.orderby : "createdAt_DESC",
	});

	const count = await context.prisma.linksConnection({where,}).aggregate().count();

	return {links, count};
}

const link = async (parent, {id}, context, info) => await context.prisma.link({id});

module.exports = {feed, link};