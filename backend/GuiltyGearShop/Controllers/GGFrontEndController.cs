using Microsoft.AspNetCore.Mvc;
using LAYER_ENTITY;
using LAYER_DIO;
using LAYER_DIO.Usuario;
using LAYER_HELPERS;
using Microsoft.AspNetCore.Identity.Data;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using Microsoft.AspNetCore.Rewrite;
using static System.Net.Mime.MediaTypeNames;
using System.Drawing;
using System.Reflection;
using System.Security.Cryptography.Xml;
using Microsoft.Extensions.Logging;



namespace GuiltyGearShop.Controllers
{

    
    [ApiController]
    [Route("api/[controller]")]
    public class GGFrontEndController : Controller
    {


        private readonly UsuarioFrontEnd _usersDAO;
        private readonly UsersDAO _dao;
        private readonly ILogger<GGFrontEndController> _logger;

        public GGFrontEndController(UsuarioFrontEnd usersDAO, ILogger<GGFrontEndController> logger, UsersDAO dao)
        {
            _usersDAO = usersDAO;
            _logger = logger;
            _dao = dao;
        }

        [HttpPost("auth")]
        public IActionResult Authenticate([FromBody] LoginRequest login)
        {


            try
            {
                var user = _usersDAO.ValidarLogin(login.Email, login.Password);

                if (user == null)
                {                    
                    return Unauthorized("Invalid credentials");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Hubo un error al autenticar el usuario");
                return StatusCode(500, "Error interno: " + ex.Message); 
            }
        }


        [HttpPost("AddUser")]
        public IActionResult CreateUser(GuiltyGearUsers gg)
        {
            try
            {

                if (!ModelState.IsValid)
                {                   
                    return BadRequest("Datos inválidos");
                }

                var errors = _dao.ValidateDuplicates(gg.Email, gg.Phone);
                if (errors.Count > 0)
                {
                                  
                    return BadRequest(errors);
                }

                _dao.AddUser(gg);
                return Ok("Usuario creado correctamente");

            }catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear el usuario");
                return StatusCode(500, "Error del servidor: " + ex.Message);
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
