using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace APISCISA.Models
{
    public class ProductoModel
    {
        [Required(ErrorMessage = "El Nombre es Obligatorio")]
        public string? Nombre { get; set; }

        public string? Descripcion { get; set; }

        public int? IdCategoria { get; set; }

    }
}
