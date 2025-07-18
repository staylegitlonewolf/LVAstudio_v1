module.exports = {
  async afterCreate(event) {
    const { result } = event;
    if (result && result.id) {
      // Check if a Member already exists for this user
      const existing = await strapi.entityService.findMany('api::member.member', {
        filters: { user: result.id }
      });
      if (!existing.length) {
        await strapi.entityService.create('api::member.member', {
          data: {
            name: result.username || result.email,
            user: result.id,
            ribbon_role: 'Member'
          }
        });
      }
    }
  }
}; 