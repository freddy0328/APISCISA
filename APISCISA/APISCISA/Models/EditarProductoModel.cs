using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace APISCISA.Models
{
    public class EditarProductoModel
    {
        public int IdProducto { get; set; }
        public string? Nombre { get; set; }

        public string? Descripcion { get; set; }

        public int? IdCategoria { get; set; }
    }
}
