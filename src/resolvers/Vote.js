const link = async (parent, args, context) => await context.prisma.vote({id: parent.id}).link();

const user = async (parent, args, context) => await context.prisma.vote({id: parent.id}).user();

module.exports = {link, user}