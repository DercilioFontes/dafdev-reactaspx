using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DafDevReactAspx.Startup))]
namespace DafDevReactAspx
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
