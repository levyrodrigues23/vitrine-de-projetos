using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database.Models;

namespace VitrineAPI.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; } = null!;
        public DbSet<WorkDone> WorksDone { get; set; } = null!;
        public DbSet<Teacher> Teachers { get; set; } = null!;
        public DbSet<MiniCourse> MiniCourses { get; set; } = null!;
        public DbSet<Startup> Startups { get; set; } = null!;
        public DbSet<Congress> Congresses { get; set; } = null!;
        public DbSet<Paper> Papers { get; set; } = null!;
        public DbSet<JrCompanyProject> JrCompanyProjects { get; set; } = null!;
    }
}
