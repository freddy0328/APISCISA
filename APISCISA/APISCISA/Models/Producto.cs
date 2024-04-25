using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace APISCISA.Models;

public partial class Producto
{
    [Key]
    public int IdProducto { get; set; }
    [Required(ErrorMessage ="El Nombre es Obligatorio")]
    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }

    public int? IdCategoria { get; set; }

    public virtual Categoria? oCategoria { get; set; }
}
