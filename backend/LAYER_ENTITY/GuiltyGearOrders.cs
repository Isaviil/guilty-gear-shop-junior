using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LAYER_ENTITY
{
    public class GuiltyGearOrders
    {
        [Display(Name = "ID de Compra")]
        public int PurchaseID { get; set; }

        [Display(Name = "ID de Usuario")]
        public string UserID { get; set; } = string.Empty;

        [Display(Name = "ID del Producto")]
        public int ProductID { get; set; }

        [Display(Name = "Nombre del Producto")]
        public string ProductName { get; set; } = string.Empty;

        [Display(Name = "Precio de Compra")]
        public decimal Purchase_Price { get; set; }

        [Display(Name = "Eliminado")]
        public string ELIMINADO { get; set; } = "NO";

        [Display(Name = "Estado")]
        public string Status { get; set; } = "PENDING";

        public DateTime DateTime { get; set; }

    }
}
