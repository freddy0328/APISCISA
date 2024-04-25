using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace APISCISA.Models
{
    public class AgregarCategoriaModel
    {
        [Required(ErrorMessage = "El Nombre es Obligatorio")]
        public string Nombre { get; set; }

        public string? Descripcion { get; set; }
    }
}
