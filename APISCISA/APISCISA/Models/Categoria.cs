using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace APISCISA.Models;

public partial class Categoria
{
    public int IdCategoria { get; set; }

    [Required(ErrorMessage = "El Nombre es Obligatorio")]
    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }


    [JsonIgnore]
    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
}
