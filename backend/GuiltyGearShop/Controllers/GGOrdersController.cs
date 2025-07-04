using LAYER_DIO;
using LAYER_ENTITY;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GuiltyGearShop.Controllers
{
    public class GGOrdersController : Controller
    {     

        private readonly OrdersDAO _dao;
        public GGOrdersController(OrdersDAO dao)
        {
            _dao = dao;
        }

        public IActionResult Index(string searchInput)
        {
            if (!string.IsNullOrEmpty(searchInput))
            {
                if (searchInput.StartsWith("GGU"))
                {
                    return View(_dao.ListOrdersByUserID(searchInput));
                }
                if (int.TryParse(searchInput, out int purchaseID))
                {
                    return View(_dao.ListOrdersByPurchaseID(purchaseID));
                }
            }
            return View(_dao.ListOrders());
        }

        //Controller para los checkbox.
        [HttpPost]        


        public IActionResult MarkAsFinished(List<int> selectedOrders)
        {
            
            if (selectedOrders == null || !selectedOrders.Any())
            {
                return RedirectToAction(nameof(Index));
            }

            foreach (var id in selectedOrders)
            {
                var order = _dao.SearchOrder(id);
                if (order !=null && order.Status != "Finished")
                {
                    order.Status = "Finished";
                    order.ProductName = ""; 
                    order.Purchase_Price = 9999; //SQL nullIF + Coalesce
                    order.ELIMINADO = "";

                    _dao.UpdateOrder(order);
                }
            }
            return RedirectToAction(nameof(Index));
        }

        // GET: GGOrdersController/Details/5
        public IActionResult Details(int id)
        {
            return View(_dao.SearchOrder(id));
        }

        // GET: GGOrdersController/Create
        public IActionResult Create(int id)
        {
            return View();
        }

        // POST: GGOrdersController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(GuiltyGearOrders gg)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    TempData["data"] = _dao.AddOrder(gg);
                }
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                ViewBag.errorMessage = ex.Message;
                return View();
            }
        }

        // GET: GGOrdersController/Edit/5
        public IActionResult Edit(int id)
        {
            return View(_dao.SearchOrder(id));
        }

        // POST: GGOrdersController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, GuiltyGearOrders gg)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    TempData["data"] = _dao.UpdateOrder(gg);
                }
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                ViewBag.errorMessage = ex.Message;
                return View(gg);
            }
        }

        // GET: GGOrdersController/Delete/5
        public IActionResult Delete(int id)
        {
            return View(_dao.SearchOrder(id));
        }

        // POST: GGOrdersController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    TempData["data"] = _dao.DeleteOrder(id);
                }
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                ViewBag.errorMessage = ex.Message;
                return View();
            }
        }
    }
}
