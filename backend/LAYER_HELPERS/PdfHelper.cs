using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using LAYER_ENTITY;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace LAYER_HELPERS
{
    public static class PdfHelper
    {
        public static byte[] GeneratePdfBytes(List<GuiltyGearOrders> orders)
        {

            QuestPDF.Settings.License = LicenseType.Community;

            var document = QuestPDF.Fluent.Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(2, Unit.Centimetre);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontSize(12));

                    page.Header()
                        .Text("Guilty Gear Orders")
                        .SemiBold().FontSize(20).FontColor(Colors.Blue.Medium);

                    page.Content()
                        .Table(table =>
                        {
                            
                            table.ColumnsDefinition(columns =>
                            {
                                columns.RelativeColumn(3); 
                                columns.RelativeColumn(2); 
                                columns.RelativeColumn(2); 
                                columns.RelativeColumn(2);
                                columns.RelativeColumn(3);
                                columns.RelativeColumn(2);
                            });

                            
                            table.Header(header =>
                            {
                                header.Cell().Element(CellStyle).Text("Producto");
                                header.Cell().Element(CellStyle).Text("Precio");
                                header.Cell().Element(CellStyle).Text("ID Producto");
                                header.Cell().Element(CellStyle).Text("ID Compra");
                                header.Cell().Element(CellStyle).Text("Fecha");
                                header.Cell().Element(CellStyle).Text("User ID");
                            });

                           
                            foreach (var order in orders)
                            {
                                table.Cell().Element(CellStyle).Text(order.ProductName);
                                table.Cell().Element(CellStyle).Text($"${order.Purchase_Price:F2}");
                                table.Cell().Element(CellStyle).Text(order.ProductID.ToString());
                                table.Cell().Element(CellStyle).Text(order.PurchaseID.ToString());
                                table.Cell().Element(CellStyle).Text(order.DateTime.ToShortDateString());
                                table.Cell().Element(CellStyle).Text(order.UserID);
                            }

                            
                            static IContainer CellStyle(IContainer container)
                            {
                                return container
                                    .BorderBottom(1)
                                    .BorderColor(Colors.Grey.Lighten2)
                                    .PaddingVertical(5)
                                    .PaddingHorizontal(5);
                            }
                        });
                });
            });

            using var stream = new MemoryStream();
            document.GeneratePdf(stream);
            return stream.ToArray();
        }
    }
}
