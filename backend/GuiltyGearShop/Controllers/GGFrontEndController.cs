using Microsoft.AspNetCore.Mvc;
using LAYER_ENTITY;
using LAYER_DIO;
using LAYER_DIO.Usuario;
using LAYER_HELPERS;
using Microsoft.AspNetCore.Identity.Data;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;



namespace GuiltyGearShop.Controllers
{

    
    [ApiController]
    [Route("api/[controller]")]
    public class GGFrontEndController : Controller
    {


        private readonly UsuarioFrontEnd _usersDAO;
        private readonly ILogger<GGFrontEndController> _logger;

        public GGFrontEndController(UsuarioFrontEnd usersDAO, ILogger<GGFrontEndController> logger)
        {
            _usersDAO = usersDAO;
            _logger = logger;
        }

        [HttpPost("auth")]
        public IActionResult Authenticate([FromBody] LoginRequest login)
        {
            try
            {
                var user = _usersDAO.ValidarLogin(login.Email, login.Password);

                if (user == null)
                    return Unauthorized("Invalid credentials");
                
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno: " + ex.Message); 
            }
        }

        
        [HttpPost("addOrder")]
        public IActionResult addOrder([FromBody] List<GuiltyGearOrders> orders)
        {
            try
            {
                foreach (var order in orders)
                {
                    _usersDAO.AgregarOrden(order);
                }
                return Ok(new { message = "Orden registrada correctamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }


        [HttpGet("getOrders/{userID}")]
        public IActionResult GetOrders(string UserID)
        {
            try
            {
                return Ok(_usersDAO.ListarOrdenesUsuario(UserID));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al obtener las órdenes" + ex.Message);
            }
        }

   

        [HttpGet("getPDF/{userID}")]
        public IActionResult PDFDownload(string UserID)
        {
            try
            {
                var orders = _usersDAO.ListarOrdenesUsuario(UserID);
                var pdfBytes = PdfHelper.GeneratePdfBytes(orders);
                return File(pdfBytes, "application/pdf", "GuiltyGear_Orders.pdf");
            }
            catch (Exception ex)
            {
                 _logger.LogError(ex, "Error generating PDF for user {UserID}", UserID);
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Error al obtener las órdenes" + ex.Message);
            }
        }

    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; } 
    };
 
}
