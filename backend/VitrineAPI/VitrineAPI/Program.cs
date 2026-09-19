using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using VitrineAPI.Database;
using VitrineAPI.Features.MiniCourses.Endpoints;
using VitrineAPI.Features.Projects.Endpoints;
using VitrineAPI.Features.Teachers.Endpoints;
using VitrineAPI.Features.WorksDone.Endpoints;
using VitrineAPI.Features.Startups.Endpoints;
using VitrineAPI.Features.Congresses.Endpoints;
using VitrineAPI.Features.Papers.Endpoints;
using VitrineAPI.Features.JrCompanyProjects.Endpoints;
using VitrineAPI.Features.Editais.Endpoints;
using VitrineAPI.Features.Graduates.Endpoints;

namespace VitrineAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            const string FrontendCorsPolicy = "FrontendCorsPolicy";

            builder.Services
                .AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(FrontendCorsPolicy, policy =>
                {
                    policy
                        .WithOrigins(
                            "http://localhost:5173",
                            "http://127.0.0.1:5173",
                            "http://localhost:5174",
                            "http://127.0.0.1:5174"
                        )
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            builder.Services.AddOpenApi();
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
            
            // Projects handlers
            builder.Services.AddScoped<CreateProjectHandler>();
            builder.Services.AddScoped<GetProjectByIdHandler>();
            builder.Services.AddScoped<GetProjectsHandler>();
            builder.Services.AddScoped<UpdateProjectHandler>();
            builder.Services.AddScoped<DeleteProjectHandler>();

            // WorksDone handlers
            builder.Services.AddScoped<CreateWorkDoneHandler>();
            builder.Services.AddScoped<GetWorkDoneByIdHandler>();
            builder.Services.AddScoped<GetWorksDoneByProjectIdHandler>();
            builder.Services.AddScoped<UpdateWorkDoneHandler>();
            builder.Services.AddScoped<DeleteWorkDoneHandler>();
            
            // Teachers handlers
            builder.Services.AddScoped<CreateTeacherHandler>();
            builder.Services.AddScoped<GetTeacherByIdHandler>();
            builder.Services.AddScoped<GetTeachersHandler>();
            builder.Services.AddScoped<UpdateTeacherHandler>();
            builder.Services.AddScoped<DeleteTeacherHandler>();

            // MiniCourses handlers
            builder.Services.AddScoped<CreateMiniCourseHandler>();
            builder.Services.AddScoped<GetMiniCourseByIdHandler>();
            builder.Services.AddScoped<GetMiniCoursesHandler>();
            builder.Services.AddScoped<UpdateMiniCourseHandler>();
            builder.Services.AddScoped<DeleteMiniCourseHandler>();

            // Startups handlers
            builder.Services.AddScoped<CreateStartupHandler>();
            builder.Services.AddScoped<GetStartupByIdHandler>();
            builder.Services.AddScoped<GetStartupsHandler>();
            builder.Services.AddScoped<UpdateStartupHandler>();
            builder.Services.AddScoped<DeleteStartupHandler>();

            // Congresses handlers
            builder.Services.AddScoped<CreateCongressHandler>();
            builder.Services.AddScoped<GetCongressByIdHandler>();
            builder.Services.AddScoped<GetCongressesHandler>();
            builder.Services.AddScoped<UpdateCongressHandler>();
            builder.Services.AddScoped<DeleteCongressHandler>();

            // Papers handlers
            builder.Services.AddScoped<CreatePaperHandler>();
            builder.Services.AddScoped<GetPaperByIdHandler>();
            builder.Services.AddScoped<GetPapersHandler>();
            builder.Services.AddScoped<UpdatePaperHandler>();
            builder.Services.AddScoped<DeletePaperHandler>();

            // JrCompanyProjects handlers
            builder.Services.AddScoped<CreateJrCompanyProjectHandler>();
            builder.Services.AddScoped<GetJrCompanyProjectByIdHandler>();
            builder.Services.AddScoped<GetJrCompanyProjectsHandler>();
            builder.Services.AddScoped<UpdateJrCompanyProjectHandler>();
            builder.Services.AddScoped<DeleteJrCompanyProjectHandler>();

            // Editais handlers
            builder.Services.AddScoped<CreateEditalHandler>();
            builder.Services.AddScoped<GetEditalByIdHandler>();
            builder.Services.AddScoped<GetEditaisHandler>();
            builder.Services.AddScoped<UpdateEditalHandler>();
            builder.Services.AddScoped<DeleteEditalHandler>();

            // Graduates handlers
            builder.Services.AddScoped<CreateGraduateHandler>();
            builder.Services.AddScoped<GetGraduateByIdHandler>();
            builder.Services.AddScoped<GetGraduatesHandler>();
            builder.Services.AddScoped<UpdateGraduateHandler>();
            builder.Services.AddScoped<DeleteGraduateHandler>();

            builder.Services.AddValidatorsFromAssemblyContaining<Program>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("FrontEnd", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseStaticFiles();

            if (!app.Environment.IsDevelopment())
            {
                app.UseHttpsRedirection();
            }

            app.UseCors(FrontendCorsPolicy);

            app.UseStaticFiles();

            app.UseAuthorization();

            app.UseCors("FrontEnd");

            app.MapControllers();

            app.Run();
        }
    }
}
