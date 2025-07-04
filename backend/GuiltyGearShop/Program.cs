using Microsoft.OpenApi.Models;
using LAYER_DIO;
using LAYER_DIO.Usuario;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllersWithViews();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});


builder.Services.AddScoped<DAOLibrary>();
builder.Services.AddScoped<OrdersDAO>();
builder.Services.AddScoped<ProductsDAO>();
builder.Services.AddScoped<UsersDAO>();
builder.Services.AddScoped<UsuarioFrontEnd>();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    
    app.UseExceptionHandler("/Home/Error");
}

app.UseStaticFiles();   

app.UseRouting();

app.UseCors("AllowAll"); 

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=GGOrders}/{action=Index}/{id?}");


app.MapControllers();

app.Run();