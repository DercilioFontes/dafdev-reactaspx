using DafDevReactAspx.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DafDevReactAspx.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            AppDbContext dbContext = new AppDbContext();
            dbContext.Database.CreateIfNotExists();
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}