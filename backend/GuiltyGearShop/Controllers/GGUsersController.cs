using LAYER_DIO;
using LAYER_ENTITY;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GuiltyGearShop.Controllers
{
   
    public class GGUsersController : Controller
    {
        private readonly UsersDAO _dao;

        public GGUsersController(UsersDAO dao)
        {
            _dao = dao;
        }


        // GET: GGUsersController
        public IActionResult Index(string searchInput)
        {
            
            if (!string.IsNullOrWhiteSpace(searchInput))
            {
                if (searchInput.StartsWith("GGU"))
                {
                    return View(_dao.SearchUserByID(searchInput));
                } else
                {
                    return View(_dao.SearchUserByLastname(searchInput));
                }
            }

            return View(_dao.ListUsers());
        }

        // GET: GGUsersController/Details/5
        public IActionResult Details(string id)
        {
            return View(_dao.SearchUser(id));
        }

        // GET: GGUsersController/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: GGUsersController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(GuiltyGearUsers gg)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    TempData["data"] = _dao.AddUser(gg);
                    return RedirectToAction(nameof(Index));
                }
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex) 
            {
                ViewBag.ErrorMessage = ex.Message;
                return View(gg);
            }
        }

        // GET: GGUsersController/Edit/5
        public IActionResult Edit(string id)
        {
            return View(_dao.SearchUser(id));
        }

        // POST: GGUsersController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(string id, GuiltyGearUsers gg)
        {
            try
            {  
                if (ModelState.IsValid)
                {
                    TempData["data"] = _dao.UpdateUser(gg);
                }
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                ViewBag.ErrorMessage = ex.Message;
                return View(gg);
            }
        }

        // GET: GGUsersController/Delete/5
        public IActionResult Delete(string id)
        {
            return View(_dao.SearchUser(id));
        }

        // POST: GGUsersController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(string id, GuiltyGearUsers gg)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    TempData["data"] = _dao.DeleteUser(id);
                }
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                ViewBag.ErrorMessage = ex.Message;
                return View();
            }
        }
    }
}
