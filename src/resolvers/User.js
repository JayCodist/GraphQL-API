const links = (parent, args, context, info) => context.prisma.user({id: parent.id}).links();

module.exports = {links};