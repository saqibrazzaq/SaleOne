using api.ActionFilters;
using api.Services;
using data;
using data.Repository;
using logger;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder
                    //.AllowAnyOrigin()
                    .WithOrigins(
                        "https://localhost:3000",
                        "http://localhost:3000",
                        "http://192.168.18.100:3000",
                        "http://192.168.18.100",
                        "https://saleone-web.saqibrazzaq.com")
                    .AllowCredentials()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });
        }

        public static void ConfigureLoggerService(this IServiceCollection services)
        {
            services.AddSingleton<ILoggerManager, LoggerManager>();
        }

        public static void ConfigureAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MappingProfile));
        }

        public static void ConfigureSqlContext(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(x => x.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection")));
        }

        public static void ConfigureRepositoryManager(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryManager, RepositoryManager>();
        }

        public static void ConfigureValidationFilter(this IServiceCollection services)
        {
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            services.AddScoped<ValidationFilterAttribute>();
        }

        public static void ConfigureServices(this IServiceCollection services)
        {
            services.AddScoped<ICategoryService, CategoryService>();
        }

        public static void MigrateDatabase(this IServiceCollection services)
        {
            var dbContext = services.BuildServiceProvider().GetRequiredService<AppDbContext>();
            dbContext.Database.Migrate();

        }
    }
}
