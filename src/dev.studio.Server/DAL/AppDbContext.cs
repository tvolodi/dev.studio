using dev.studio.Server.DAL.Models;
using Microsoft.EntityFrameworkCore;
using server_ext.DAL;

namespace dev.studio.Server.DAL
{
    public class AppDbContext : BaseAppDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<AppDataType> AppDataTypes { get; set; }
        public DbSet<AppModule> AppModules { get; set; }


    }
}
