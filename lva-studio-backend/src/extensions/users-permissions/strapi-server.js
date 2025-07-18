module.exports = (plugin) => {
  // Override the register function to set default role and create member profile
  plugin.controllers.auth.register = async (ctx) => {
    const { email, username, password } = ctx.request.body;

    if (!email || !username || !password) {
      return ctx.badRequest('Missing email, username, or password');
    }

    try {
      // Get the default "Authenticated" role (we'll use this as default)
      const defaultRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'authenticated' }
      });

      if (!defaultRole) {
        return ctx.badRequest('Default role not found');
      }

      // Create the user with default role
      const user = await strapi.plugins['users-permissions'].services.user.add({
        username,
        email,
        password,
        confirmed: true,
        role: defaultRole.id,
      });

      // Auto-create a Member profile for this user
      try {
        await strapi.entityService.create('api::member.member', {
          data: {
            name: username,
            bio: '',
            ribbon_role: 'Member',
            user: user.id
          }
        });
      } catch (memberError) {
        console.log('Member profile creation failed:', memberError);
        // Continue even if member creation fails
      }

      // Generate JWT token
      const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
        id: user.id,
      });

      ctx.send({
        jwt,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          confirmed: user.confirmed,
          blocked: user.blocked,
          role: {
            id: defaultRole.id,
            name: defaultRole.name,
            type: defaultRole.type,
          },
        },
      });

    } catch (error) {
      console.error('Registration error:', error);
      if (error.message.includes('Email already taken')) {
        return ctx.badRequest('Email already taken');
      }
      if (error.message.includes('Username already taken')) {
        return ctx.badRequest('Username already taken');
      }
      return ctx.badRequest('Registration failed');
    }
  };

  return plugin;
}; 