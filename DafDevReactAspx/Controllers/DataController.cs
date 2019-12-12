using DafDevReactAspx.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DafDevReactAspx.Controllers
{
    public class DataController : Controller
    {
        public IList<FoodItem> menuItems;
        // GET: Data
        [HttpGet]
        public ActionResult GetMenuList()
        {
            menuItems = new List<FoodItem>();
            using (var db = new AppDbContext())
            {
                foreach (var f in db.FoodItems)
                {
                    menuItems.Add(f);
                }
            }
            return Json(menuItems, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public string GetUserId()
        {
            int uid = -1;
            if (Session["UserId"] != null)
            {
                uid = Convert.ToInt32(Session["UserId"].ToString());
            }
            return uid.ToString();
        }

        [HttpPost]
        public ActionResult PlaceOrder(List<FoodItem> foodItems, int id)
        {
            bool dbSuccess = false;

            try
            {
                using (var db = new AppDbContext())
                {
                    Order order = new Order
                    {
                        CustomerId = id,
                        OrderDate = DateTime.Now
                    };
                    db.Orders.Add(order);
                    db.SaveChanges();

                    int orderId = order.Id;
                    decimal grandTotal = 0;

                    foreach (var foodItem in foodItems)
                    {
                        OrderDetail orderDetail = new OrderDetail
                        {
                            OrderId = orderId,
                            FoodItemId = foodItem.Id,
                            Quantity = foodItem.Quantity,
                            TotalPrice = foodItem.Price * foodItem.Quantity
                        };
                        db.OrderDetails.Add(orderDetail);
                        grandTotal += orderDetail.TotalPrice;
                    }

                    order.TotalPaid = grandTotal;
                    order.Status = 1;
                    db.SaveChanges();
                    dbSuccess = true;
                }
            }
            catch
            {
                dbSuccess = false;
            }

            if (dbSuccess)
            {
                return Json("success: true", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("success: false", JsonRequestBehavior.AllowGet);
            }
        }
    }
}