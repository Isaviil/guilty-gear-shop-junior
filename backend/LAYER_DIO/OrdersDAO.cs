using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LAYER_ENTITY;

namespace LAYER_DIO
{
    public class OrdersDAO
    {

        private readonly DAOLibrary _dao;

        public OrdersDAO(DAOLibrary dao)
        {
            _dao = dao;
        }

        
        public List<GuiltyGearOrders> ListOrders()
        {           
            try
            {
                DataTable dt = _dao.ExecuteQuery("DBO.DisplayDataOrders", null);
                var lista = new List<GuiltyGearOrders>();
                foreach (DataRow dr in dt.Rows)
                {
                    lista.Add(new GuiltyGearOrders
                    {
                        PurchaseID = Convert.ToInt32(dr["PurchaseID"].ToString()),
                        UserID = dr["UserID"].ToString(),
                        ProductID = Convert.ToInt32(dr["ProductID"].ToString()),
                        ProductName = dr["ProductName"].ToString(),
                        Purchase_Price = Convert.ToDecimal(dr["Purchase_Price"].ToString()),
                        ELIMINADO = dr["ELIMINADO"].ToString(),
                        Status = dr["STATUS"].ToString()
                    });
                }
                return lista;

            } catch (Exception ex)
            {
                throw new Exception("Hubo un error al listar: " + ex.Message);
            }

        }

        
        public string AddOrder(GuiltyGearOrders gg)
        {
            try
            {
                var parametros = new Dictionary<string, object>
                {
                    {"@UserID", gg.UserID},
                    {"@ProductID", gg.ProductID},
                    {"@ProductName", gg.ProductName},
                    {"@Purchase_Price", gg.Purchase_Price}
                };
                _dao.ExecuteNonquery("DBO.AddDataOrder", parametros);
                return "Order registrada correctamente";
            }
            catch (Exception ex) 
            {
                throw new Exception("Hubo un error al agregar: " + ex.Message);
            }
        }

        public string DeleteOrder(int cod)
        {
            try
            {

                var parametros = new Dictionary<string, object>
                {
                    {"@PurchaseID", cod}
                };

                _dao.ExecuteNonquery("DBO.DeleteOrder", parametros);
                return "Usuario eliminado correctamente";

            }catch (Exception ex)
            {
                throw new Exception("Hubo un error al eliminar: " + ex.Message);
            }
        }

        public GuiltyGearOrders SearchOrder(int cod) 
        {
            try
            {
                var parametros = new Dictionary<string, object>
                {
                    {"@PurchaseID", cod}
                };

                DataTable dt = _dao.ExecuteQuery("DBO.SearchOrder", parametros);
                if (dt.Rows.Count > 0)
                {
                    return new GuiltyGearOrders
                    {
                        PurchaseID = Convert.ToInt32(dt.Rows[0]["PurchaseID"].ToString()),
                        UserID = dt.Rows[0]["UserID"].ToString(),
                        ProductID = Convert.ToInt32(dt.Rows[0]["ProductID"].ToString()),
                        ProductName = dt.Rows[0]["ProductName"].ToString(),
                        Purchase_Price = Convert.ToDecimal(dt.Rows[0]["Purchase_Price"].ToString()),
                        ELIMINADO = dt.Rows[0]["ELIMINADO"].ToString(),
                        Status = dt.Rows[0]["Status"].ToString()
                    };
                }
                else
                {
                    return null;
                }

            } catch (Exception ex)
            {
                throw new Exception("Hubo un error al buscar: " + ex.Message);
            }
        }

        public string UpdateOrder(GuiltyGearOrders gg)
        {
            try
            {
                var parametros = new Dictionary<string, object>
                {
                    {"@PurchaseID", gg.PurchaseID},
                    {"@ProductName", gg.ProductName},
                    {"@Purchase_Price", gg.Purchase_Price},
                    {"@ELIMINADO", gg.ELIMINADO},
                    {"@Status", gg.Status}
                };
                _dao.ExecuteQuery("DBO.UpdateOrder", parametros);
                return "Order actualizada correctamente";

            }catch (Exception ex) { 
                throw new Exception("Hubo un error al actualizar la orden: " + ex.Message); 
            }
        }


        public List<GuiltyGearOrders> ListOrdersByUserID(string cod)
        {
            try
            {
                var lista = new List<GuiltyGearOrders>();
                var parametros = new Dictionary<string, object>
                {
                    {"@UserID", cod}
                };

                DataTable dt = _dao.ExecuteQuery("DBO.SearchOrderByUserID", parametros);
                foreach (DataRow dr in dt.Rows)
                {
                    lista.Add(new GuiltyGearOrders
                    {
                        PurchaseID = Convert.ToInt32(dr["PurchaseID"].ToString()),
                        UserID = dr["UserID"].ToString(),
                        ProductID = Convert.ToInt32(dr["ProductID"].ToString()),
                        ProductName = dr["ProductName"].ToString(),
                        Purchase_Price = Convert.ToDecimal(dr["Purchase_Price"].ToString()),
                        ELIMINADO = dr["ELIMINADO"].ToString(),
                        Status = dr["Status"].ToString(),
                    });
                }
                return lista;
            }
            catch (Exception ex)
            {
                throw new Exception("Hubo un error al listar los datos: " +ex.Message);
            }
        }


        public List<GuiltyGearOrders> ListOrdersByPurchaseID(int cod)
        {
            try
            {
                var lista = new List<GuiltyGearOrders>();
                var parametros = new Dictionary<string, object>
                {
                    {"@PurchaseID", cod}
                };
                DataTable dt = _dao.ExecuteQuery("DBO.SearchOrder", parametros);
                if (dt.Rows.Count > 0)
                {
                    lista.Add(new GuiltyGearOrders
                    {
                        PurchaseID = Convert.ToInt32(dt.Rows[0]["PurchaseID"].ToString()),
                        UserID = dt.Rows[0]["UserID"].ToString(),
                        ProductID = Convert.ToInt32(dt.Rows[0]["ProductID"].ToString()),
                        ProductName = dt.Rows[0]["ProductName"].ToString(),
                        Purchase_Price = Convert.ToDecimal(dt.Rows[0]["Purchase_Price"].ToString()),
                        ELIMINADO = dt.Rows[0]["ELIMINADO"].ToString(),
                        Status = dt.Rows[0]["Status"].ToString(),
                    });
                }
                return lista;
            }
            catch (Exception ex)
            {
                throw new Exception("Hubo un error al listar los datos: " + ex.Message);
            }
        }

    }
}
