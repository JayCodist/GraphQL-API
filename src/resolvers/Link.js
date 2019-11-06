const createdBy = async (parent, args, context) => await context.prisma.link({id: parent.id}).createdBy();

const votes = async (parent, args, context, info) => await context.prisma.link({id: parent.id}).votes();

const createdAt = async (parent, args, context) => await context.prisma.link({id: parent.id}).createdAt();

module.exports = {
	createdBy, 
	votes,
	createdAt,
};