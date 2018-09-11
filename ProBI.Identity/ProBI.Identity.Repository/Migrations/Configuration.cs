namespace ProBI.Identity.Repository.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using ProBI.Identity.Models;
    using ProBI.Identity.Models.ApplicationModels;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Validation;
    using System.Diagnostics;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ApplicationDbContext context)
        {
            //try
            //{
                //  This method will be called after migrating to the latest version.

                var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

                var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));

                var user = new ApplicationUser()
                {
                    UserName = "SuperPowerUser",
                    Email = "umakant1a@gmail.com",
                    EmailConfirmed = true,
                    FirstName = "Umak123",
                    LastName = "xinnovationlab",
                    OrganizationName = "xinnovationlab",
                    CompanyName = "ProBI",
                    Level = 1,
                    JoinDate = DateTime.Now.AddYears(-3)
                };

                manager.Create(user, "ShreeGanesh@123");

                if (roleManager.Roles.Count() == 0)
                {
                    roleManager.Create(new IdentityRole { Name = "SuperAdmin" });
                    roleManager.Create(new IdentityRole { Name = "Admin" });
                    roleManager.Create(new IdentityRole { Name = "User" });
                }

                var adminUser = manager.FindByName("SuperPowerUser");

                manager.AddToRoles(adminUser.Id, new string[] { "SuperAdmin", "Admin" });
            //}
            //catch (DbEntityValidationException e)
            //{
            //    if (System.Diagnostics.Debugger.IsAttached == false)
            //    {
            //        System.Diagnostics.Debugger.Launch();
            //    }

            //    foreach (var eve in e.EntityValidationErrors)
            //    {
            //        Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
            //            eve.Entry.Entity.GetType().Name, eve.Entry.State);
            //        foreach (var ve in eve.ValidationErrors)
            //        {
            //            Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
            //                ve.PropertyName, ve.ErrorMessage);
            //        }
            //    }
            //    throw;
            //}
        }
    }
}
