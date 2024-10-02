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
        public DbSet<AppEntity> AppEntities { get; set; }
        public DbSet<AppEntityAttribute> AppEntityAttributes { get; set; }
        public DbSet<AppModule> AppModules { get; set; }
        public DbSet<SystemConfig> SystemConfigs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AppEntity>()
                .HasOne(e => e.AppModule)
                .WithMany(e2 => e2.AppEntities)
                .HasForeignKey(e => e.AppModuleId);

            modelBuilder.Entity<AppEntityAttribute>()
                .HasOne(e => e.AppEntity)
                .WithMany(e2 => e2.AppEntityAttributes)
                .HasForeignKey(e => e.AppEntityId);

            modelBuilder.Entity<AppEntityAttribute>()
                .HasOne(e => e.AppDataType);                
        }

    }
}
