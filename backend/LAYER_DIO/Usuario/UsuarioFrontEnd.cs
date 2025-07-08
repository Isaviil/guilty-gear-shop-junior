using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;  // For IConfiguration
using System.Data;                       // For CommandType, DataTable, etc.
using Microsoft.Data.SqlClient;             // For SqlConnection, SqlCommand
using System.Collections.Generic;
using LAYER_ENTITY;
using LAYER_HELPERS;
using Microsoft.IdentityModel.Abstractions;         // For Dictionary<>


namespace LAYER_DIO.Usuario
{
    public class UsuarioFrontEnd
    {
        private readonly DAOLibrary _dao;

        public UsuarioFrontEnd(DAOLibrary dao)
        {
            _dao = dao;
        }


        public string AgregarOrden(GuiltyGearOrders o)
        {
            try
            {
                var parametros = new Dictionary<string, object>
                {
                    {"@UserID", o.UserID},
                    {"@ProductID", o.ProductID},
                    {"@ProductName", o.ProductName},
                    {"@Purchase_Price", o.Purchase_Price}
                };
                _dao.ExecuteNonquery("DBO.AddDataOrder", parametros);
                return "Pedido agregado correctamente";

            } catch (Exception ex)
            {
                throw new Exception("Hubo un error al agregar " + ex.Message);
            }
        }


        public List<GuiltyGearOrders> ListarOrdenesUsuario(string IDusu)
        {
            try
            {
                var list = new List<GuiltyGearOrders>();

                var parametros = new Dictionary<string, object>
                {
                    {"@UserID", IDusu}
                };

                DataTable dt = _dao.ExecuteQuery("DBO.SearchOrderByUserID", parametros);
                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        list.Add(new GuiltyGearOrders
                        {
                            PurchaseID = Convert.ToInt32(dr["PurchaseID"].ToString()),
                            UserID = dr["UserID"].ToString(),
                            ProductID = Convert.ToInt32(dr["ProductID"].ToString()),
                            ProductName = dr["ProductName"].ToString(),
                            Purchase_Price = Convert.ToDecimal(dr["Purchase_Price"].ToString()),
                            ELIMINADO = dr["ELIMINADO"].ToString(),
                            Status = dr["Status"].ToString(),
                            DateTime = Convert.ToDateTime(dr["Purchase_Date"].ToString()) 
                        });
                    }
                }
                return list;
            }
            catch (Exception ex)
            {
                throw new Exception("Hubo un error al listar " + ex.Message);
            }
        }


        public string EliminarProducto(int id)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    {"@PurchaseID", id}
                };
                _dao.ExecuteNonquery("DBO.DeleteOrderCompletely", parameters);
                return "Producto eliminado de la lista correctamente";

            }catch (Exception ex)
            {
                throw new Exception("Hubo un error al eliminar " + ex.Message);
            }

        }

        public GuiltyGearUsers ValidarLogin(string email, string password)
        {
            try
            {

                string hashedPassword = SecurityHelper.HashPassword(password);

                string cadena = "SELECT * FROM GuiltyGear_User WHERE Email=@email AND Password=@password AND ELIMINADO = 'NO'";

                var parametros = new Dictionary<string, object>
                {
                    {"@email", email},
                    {"@password", hashedPassword}
                };

                DataTable dt = _dao.ExecuteQueryRaw(cadena, parametros);

                if (dt.Rows.Count == 0)
                {
                    return null;
                } 

                DataRow dr = dt.Rows[0];

                return new GuiltyGearUsers
                {
                    UserID = dr["UserID"].ToString(),
                    Name = dr["Name"].ToString(),
                    LastName = dr["LastName"].ToString(),
                    Email = dr["Email"].ToString(),
                    ELIMINADO = dr["ELIMINADO"].ToString()
                };
            }
            catch (Exception ex)
            {
                var fullMessage = ex.Message;
                if (ex.InnerException != null)
                    fullMessage += " | Inner Exception: " + ex.InnerException.Message;

                throw new Exception("Hubo un error al ingresar: " + fullMessage);
            }
        }



    }
}
