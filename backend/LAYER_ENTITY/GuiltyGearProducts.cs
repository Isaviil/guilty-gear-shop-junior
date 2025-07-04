namespace LAYER_ENTITY
{
    public class GuiltyGearProducts
    {
        public int ProductID { get; set; }
        public string OrderID { get; set; } = string.Empty;
        public string Platform { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Edition { get; set; } = "N/A";
        public string ProductName { get; set; } = string.Empty;
        public int Stock { get; set; } = 0;
        public string ELIMINADO { get; set; } = "NO";
    }
}
