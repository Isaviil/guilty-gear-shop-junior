﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LAYER_ENTITY;
using LAYER_HELPERS;
using Microsoft.Data.SqlClient;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace LAYER_DIO
{
    public class UsersDAO
    {

        private readonly DAOLibrary _dao;
        public UsersDAO(DAOLibrary dao )
        {
            _dao = dao;
        }

        //No duplicates
        public Dictionary<string, string> ValidateDuplicates(string email, string phone)
        {
            var errors = new Dictionary<string, string>();

            var query = "SELECT Email, Phone FROM GuiltyGear_user WHERE Email = @Email OR Phone = @Phone";
            var parameters = new Dictionary<string, object>
            {
                {"@Email", email},
                {"@Phone", phone}
            };

            var table = _dao.ExecuteQueryRaw(query, parameters);

            if (table.Rows.Count > 0)
            {
                foreach (DataRow row in table.Rows)
                {
                    if (row["Email"].ToString() == email)
                        errors["email"] = "Este correo ya está registrado";

                    if (row["Phone"].ToString() == phone)
                        errors["phone"] = "Este número ya está registrado";
                }
            }

            return errors;
        }


        public string AddUser(GuiltyGearUsers u)
        {
            try
            {
                var parametros = new Dictionary<string, object>
                {
                    {"@Name", u.Name},
                    {"@LastName", u.LastName},
                    {"@Email", u.Email},
                    {"@Password", SecurityHelper.HashPassword(u.Password)},
                    {"@Phone", u.Phone}
                };

                _dao.ExecuteNonquery("DBO.AddDataUser", parametros);
                return "Usuario creado satisfactoriamente";
            }
            catch (SqlException ex)
            {
                throw new Exception("Error de base de datos: " + ex.Message);
            }
            catch(Exception ex) 
            {
                throw new Exception("error general: " + ex.Message);
            }
        }

        public string DeleteUser(string id)
        {
            try
            {
                var parametros = new Dictionary<string, object>
                {
                    {"@UserID", id}
                };
                _dao.ExecuteNonquery("DBO.DeleteDataUser", parametros);
                return "Usuario eliminado correctamente";
            }
            catch(Exception ex)
            {
                throw new Exception("Hubo un error al eliminar: " + ex.Message);
            }
        }


        public string UpdateUser(GuiltyGearUsers gg)
        {
            try
            {
                //Analizar este codigo
                var passwordParam = string.IsNullOrEmpty(gg.Password) ? 
                    (object)DBNull.Value : SecurityHelper.HashPassword(gg.Password);

                var parametros = new Dictionary<string, object>
                {
                    {"@UserID", gg.UserID},
                    {"@Name", gg.Name},
                    {"@LastName", gg.LastName},
                    {"@Email", gg.Email},
                    {"@Password", passwordParam},
                    {"@Phone", gg.Phone },
                    {"@Eliminado", gg.ELIMINADO} 
                };
                _dao.ExecuteNonquery("DBO.UpdateUser", parametros);
                return "Cliente actualizado correctamente";

            } catch(Exception ex)
            {
                throw new Exception("Hubo un error al actualizar: " + ex.Message);
            }
        }

        public GuiltyGearUsers SearchUser(string cod)
        {
            try
            {   
                var parametros = new Dictionary<string, object>
                {
                    {"@UserID", cod},
                };

                DataTable dt = _dao.ExecuteQuery("DBO.SearchDataUserByID", parametros);
                if (dt.Rows.Count>0)
                {
                    return new GuiltyGearUsers
                    {
                        UserID = dt.Rows[0]["UserID"].ToString(),
                        Name = dt.Rows[0]["Name"].ToString(),
                        LastName = dt.Rows[0]["LastName"].ToString(),
                        Email = dt.Rows[0]["Email"].ToString(),
                        Password = dt.Rows[0]["Password"].ToString(),
                        Phone = dt.Rows[0]["Phone"].ToString(),
                    };
                } else
                {
                    return null;
                }
            }
            catch(Exception ex)
            {
                throw new Exception("Hubo un error al buscar el usuario :" + ex.Message);
            }
        }
            


        public List<GuiltyGearUsers> ListUsers()
        {
            try
            {
                DataTable dt = _dao.ExecuteQuery("DBO.DisplayDataUser", null);
                var lista = new List<GuiltyGearUsers>();

                foreach (DataRow dr in dt.Rows)
                {
                    lista.Add(new GuiltyGearUsers
                    {
                        UserID = dr["UserID"].ToString(),
                        Name = dr["Name"].ToString(),
                        LastName = dr["LastName"].ToString(),
                        Email = dr["Email"].ToString(),
                        //Password = "**********"
                        Phone = dr["Phone"].ToString(),
                        ELIMINADO = dr["ELIMINADO"].ToString() 
                    });
                }
                return lista;
            } catch(Exception ex)
            {
                throw new Exception("Hubo un problema al listar los datos: " + ex.Message);
            }

        }

        public List<GuiltyGearUsers> SearchUserByID(string usrID)
        {
            try
            {
                var lista = new List<GuiltyGearUsers>();
                var parametros = new Dictionary<string, object>
            {
                {"@UserID", usrID}
            };

                DataTable dt = _dao.ExecuteQuery("DBO.SearchDataUserByID", parametros);
                if (dt.Rows.Count>0)
                {
                    lista.Add(new GuiltyGearUsers
                    {
                        UserID = dt.Rows[0]["UserID"].ToString(),
                        Name = dt.Rows[0]["Name"].ToString(),
                        LastName = dt.Rows[0]["LastName"].ToString(),
                        Email = dt.Rows[0]["Email"].ToString(),
                        Password = dt.Rows[0]["Password"].ToString(),
                        Phone = dt.Rows[0]["Phone"].ToString(),
                        ELIMINADO = dt.Rows[0]["ELIMINADO"].ToString()
                    });
                }
                return lista;
            } catch(Exception ex)
            {
                throw new Exception("Hubo un error al buscar el ID: " + ex.Message);
            }
        }

        public List<GuiltyGearUsers> SearchUserByLastname(string apellido)
        {
            try
            {
                var lista = new List<GuiltyGearUsers>();
                var parametros = new Dictionary<string, object>
            {
                {"@LastName", apellido}
            };
                DataTable dt = _dao.ExecuteQuery("DBO.SearchDataUserByLastname", parametros);
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new GuiltyGearUsers
                    {
                        UserID = row["UserID"].ToString(),
                        Name = row["Name"].ToString(),
                        LastName = row["LastName"].ToString(),
                        Email = row["Email"].ToString(),
                        Password = row["Password"].ToString(),
                        Phone = row["Phone"].ToString(),
                        ELIMINADO = row["ELIMINADO"].ToString()
                    });
                };
                return lista;
            }
            catch (Exception ex) 
            { 
                throw new Exception("Hubo un error al buscar el apellido: " +ex.Message); 
            }
        }



    }
}
