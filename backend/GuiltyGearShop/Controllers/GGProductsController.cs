using LAYER_DIO;
using LAYER_ENTITY;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;


namespace GuiltyGearShop.Controllers
{

    public class GGProductsController : Controller
    {

        private readonly ProductsDAO _dao;

        public GGProductsController(ProductsDAO dao )
        {
            _dao = dao;
        }


      
        public IActionResult Index(int cod, string platform)
        {
            
            ViewBag.platform = new SelectList(_dao.DropdownPlatform(), "Platform", "Platform", platform);

            try
            {
                
                if (!string.IsNullOrEmpty(platform))
                {
                    return View(_dao.ListProductsByPlatform(platform));
                }
                
                else if (cod != 0)
                {
                    return View(_dao.SearchProductAndIndexListIt(cod));
                }
                else
                {
                    return View(_dao.ListProduct());
                }

            }
            catch (Exception ex)
            {
                ViewBag.errorMessage = "Hubo un error al listar: " + ex.Message;
                return View();
            }
        }

        // GET: GGProductsController/Details/5
        public IActionResult Details(int id)
        {
            return View(_dao.SearchProduct(id));
        }

        // GET: GGProductsController/Create
        public IActionResult Create()
        {

            ViewBag.platforms = new SelectList(_dao.DropdownPlatform(), "Platform", "Platform");
            ViewBag.edition = new SelectList(_dao.DropdownEdition(), "Edition", "Edition");

            return View();
        }

        // POST: GGProductsController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(GuiltyGearProducts pr)
        {

            ViewBag.platforms = new SelectList(_dao.DropdownPlatform(), "Platform", "Platform");
            ViewBag.edition = new SelectList(_dao.DropdownEdition(), "Edition", "Edition");

            try
            {
                if (ModelState.IsValid)
                {
                    TempData["data"] = _dao.AddProduct(pr);
                }
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                ViewBag.ErrorMessage = "Ocurrió un error al crear el producto: " + ex.Message;
                return View(pr);
            }
        }

        // GET: GGProductsController/Edit/5
        public IActionResult Edit(int id)
        {
            return View(_dao.SearchProduct(id));
        }

        // POST: GGProductsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, GuiltyGearProducts pr)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    TempData["data"] = _dao.UpdateProduct(pr);
                }
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                ViewBag.errorMessage = "Hubo un error al actualizar" + ex.Message;
                return View(pr);
            }
        }

        // GET: GGProductsController/Delete/5
        public ActionResult Delete(int id)
        {
            return View(_dao.SearchProduct(id));
        }

        // POST: GGProductsController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    TempData["data"] = _dao.DeleteProduct(id);
                }
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                ViewBag.errorMessage = "Hubo un error al eliminar" + ex.Message;
                return View();
            }
        }
    }
}
