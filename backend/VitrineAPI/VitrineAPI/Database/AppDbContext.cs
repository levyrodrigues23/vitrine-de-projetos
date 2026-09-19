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
        public DbSet<Edital> Editais { get; set; } = null!; // Edital é a única entidade que não segue convenção em inglês por não haver uma tradução muito boa para o termo. A tradução literal seria "Public Notice", o que não sabemos se seria ideal.
        public DbSet<Graduate> Graduates { get; set; } = null!;
    }
}
