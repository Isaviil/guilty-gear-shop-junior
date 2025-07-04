using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LAYER_ENTITY;


namespace LAYER_DIO
{
    public class ProductsDAO
    {

        private readonly DAOLibrary _dao;
        public ProductsDAO(DAOLibrary dao)
        {
            _dao = dao;
        }

        public string AddProduct(GuiltyGearProducts gg)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    {"@Platform", gg.Platform},
                    {"@Price", gg.Price},
                    {"@Type", gg.Type},
                    {"@Edition", gg.Edition},
                    {"@ProductName", gg.ProductName},
                    {"@Stock", gg.Stock},
                };
                _dao.ExecuteNonquery("DBO.AddDataProductos", parameters);

                return "Se agregó correctamente";
            } 
            catch (Exception ex)
            {
                throw new Exception("Hubo un error" + ex.Message);
            }
        }

        public string DeleteProduct(int cod)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    {"@ProductID", cod}
                };

                _dao.ExecuteNonquery("DBO.DeleteDataProductos", parameters);
                return "Producto eliminado correctamente";
            }
            catch (Exception ex)
            {
                throw new Exception("Hubo un error al borrar" + ex.Message);
            }
        }

        public List<GuiltyGearProducts> ListProduct()
        {
            try
            {
                
                DataTable dt = _dao.ExecuteQuery("DBO.DisplayDataProductos", null);
                Console.WriteLine("Rows found: " + dt.Rows.Count);
                var list = new List<GuiltyGearProducts>();

                foreach (DataRow row in dt.Rows)
                {
                    list.Add(new GuiltyGearProducts
                    {
                        ProductID = Convert.ToInt32(row["ProductID"].ToString()),
                        OrderID = row["OrderID"].ToString(),
                        Platform = row["Platform"].ToString(),
                        Price = Convert.ToDecimal(row["Price"].ToString()),
                        Type = row["Type"].ToString(),
                        Edition = row["Edition"].ToString(),
                        ProductName = row["ProductName"].ToString(),
                        Stock = Convert.ToInt32(row["Stock"].ToString()),
                        ELIMINADO = row["ELIMINADO"].ToString()
                    });
                }
                return list;
            }
            catch(Exception ex)
            {
                throw new Exception("Hubo un error al listar" + ex.Message);
            }

        }

        public string UpdateProduct(GuiltyGearProducts gg)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    {"@OrderID", gg.OrderID},
                    {"@Platform", gg.Platform},
                    {"@Price", gg.Price},
                    {"@Type", gg.Type},
                    {"@Edition", gg.Edition},
                    {"@ProductName", gg.ProductName},
                    {"@Stock", gg.Stock},
                };
                _dao.ExecuteNonquery("DBO.UpdateDataProductos", parameters);
                return "Producto actualizado correctamente";
            }
            catch (Exception ex)
            {
                throw new Exception("Hubo un error al actualizar" + ex.Message);
            }
        }

        public GuiltyGearProducts SearchProduct(int cod)
        {            
            try
            {
                var GG = new GuiltyGearProducts();
                var parameters = new Dictionary<string, object>
                {
                    {"@ProductID", cod}
                };
                DataTable dt = _dao.ExecuteQuery("DBO.SearchDataProductos", parameters);
                if (dt.Rows.Count>0)
                {                    
                    
                    GG.ProductID = Convert.ToInt32(dt.Rows[0]["ProductID"].ToString());
                    GG.OrderID = dt.Rows[0]["OrderID"].ToString();
                    GG.Platform = dt.Rows[0]["Platform"].ToString();
                    GG.Price = Convert.ToDecimal(dt.Rows[0]["Price"].ToString());
                    GG.Type = dt.Rows[0]["Type"].ToString();
                    GG.Edition = dt.Rows[0]["Edition"].ToString();
                    GG.ProductName = dt.Rows[0]["ProductName"].ToString();
                    GG.Stock = Convert.ToInt32(dt.Rows[0]["Stock"].ToString());
                    GG.ELIMINADO = dt.Rows[0]["ELIMINADO"].ToString();                  
                }
                return GG;
            }
            catch (Exception ex)
            {
                throw new Exception("Hubo un error al buscar por código" + ex.Message);
            }            
        }


        public List<GuiltyGearProducts> SearchProductAndIndexListIt(int cod)
        {
            var lista = new List<GuiltyGearProducts>();
            var parametros = new Dictionary<string, object>
            {
                {"@ProductID", cod}
            };

            try
            {
                DataTable dt = _dao.ExecuteQuery("DBO.SearchDataProductos", parametros);
                if (dt.Rows.Count>0)
                {
                    lista.Add(new GuiltyGearProducts
                    {
                        ProductID = Convert.ToInt32(dt.Rows[0]["ProductID"].ToString()),
                        OrderID = dt.Rows[0]["OrderID"].ToString(),
                        Platform = dt.Rows[0]["Platform"].ToString(),
                        Price = Convert.ToDecimal(dt.Rows[0]["Price"].ToString()),
                        Type = dt.Rows[0]["Type"].ToString(),
                        Edition = dt.Rows[0]["Edition"].ToString(),
                        ProductName = dt.Rows[0]["ProductName"].ToString(),
                        Stock = Convert.ToInt32(dt.Rows[0]["Stock"].ToString()),
                        ELIMINADO = dt.Rows[0]["ELIMINADO"].ToString()
                    });
                }
                return lista;
            }
            catch (Exception ex)
            {
                throw new Exception("Hubo un error al buscar o listar los datos" + ex.Message);
            }
        }


        public List<GuiltyGearProducts> DropdownPlatform()
        {

            DataTable dt = _dao.ExecuteQuery("DBO.SelectPlatform", null);
            var lista = new List<GuiltyGearProducts>();
            
            foreach (DataRow dr in dt.Rows)
            {
                lista.Add(new GuiltyGearProducts
                {
                    Platform = dr["Platform"].ToString()
                });
            }
            return lista;
        }


        public List<GuiltyGearProducts> DropdownEdition()
        {

            DataTable dt = _dao.ExecuteQuery("DBO.SelectEdition", null);
            var lista = new List<GuiltyGearProducts>();

            foreach(DataRow dr in dt.Rows)
            {
                lista.Add(new GuiltyGearProducts
                {

                    Edition = dr["Edition"].ToString()

                });
            }
            return lista;
        }


        public List<GuiltyGearProducts> ListProductsByPlatform(string platform)
        {

            var lista = new List<GuiltyGearProducts>();
            var platf = new Dictionary<string, object>
            {
                { "@Platform", platform }
            };

            DataTable dt = _dao.ExecuteQuery("DBO.ListarPorPlataforma", platf);

            foreach(DataRow row in dt.Rows)
            {
                lista.Add(new GuiltyGearProducts
                {
                    ProductID = Convert.ToInt32(row["ProductID"].ToString()),
                    OrderID = row["OrderID"].ToString(),
                    Platform = row["Platform"].ToString(),
                    Price = Convert.ToDecimal(row["Price"].ToString()),
                    Type = row["Type"].ToString(),
                    Edition = row["Edition"].ToString(),
                    ProductName = row["ProductName"].ToString(),
                    Stock = Convert.ToInt32(row["Stock"].ToString()),
                    ELIMINADO = row["ELIMINADO"].ToString()
                });
            }
            return lista;
        }

    }   
}
