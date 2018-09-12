using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IdentityServerTestApp.Controllers
{
    public class HomeController : Controller
    {
        //[Authorize]
        //public ActionResult Index()
        //{
        //    ViewBag.Title = "Home Page";

        //    return View();
        //}

        //[Authorize(Roles = "IncidentResolvers")]
        //public ActionResult Index()
        //{
        //    ViewBag.Title = "Home Page";

        //    return View();
        //}

        [ClaimsAuthorization(ClaimType = "FTE", ClaimValue = "0")]
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
