using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using APISCISA.Models;

namespace APISCISA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        public readonly DbapiContext _dbapiContext;

        public ProductoController(DbapiContext _context)
        {
            _dbapiContext = _context;
        }

        [HttpGet]
        [Route("Lista")]
        public IActionResult Lista() {
            List<Producto> lista = new List<Producto>();
            try
            {
                lista = _dbapiContext.Productos.Include(c => c.oCategoria).ToList();
                return StatusCode(StatusCodes.Status200OK, new {mensaje = "ok", Response = lista});
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, Response = lista });
            }          
        }

        [HttpGet]
        [Route("ListaCategoria")]
        public IActionResult ListaCategoria()
        {
            try
            {
                var lista = _dbapiContext.Categoria.ToList();
                return Ok(new { mensaje = "ok", response = lista });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }

        [HttpGet]
        [Route("Obtener/{idProducto:int}")]
        public IActionResult Obtener(int idProducto)
        {
            Producto oProducto = _dbapiContext.Productos.Find(idProducto);
            if (oProducto == null)
            {
                return BadRequest("Producto no encontrado");
            }
            try
            {
                oProducto = _dbapiContext.Productos.Include(c => c.oCategoria).Where(p => p.IdProducto == idProducto).FirstOrDefault();


                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", Response = oProducto });
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, Response = oProducto });

            }            
        }
        

        [HttpGet]
        [Route("ObtenerCategoria/{idCategoria:int}")]
        public IActionResult ObtenerCategoria(int idCategoria)
        {
            var categoria = _dbapiContext.Categoria.Find(idCategoria);
            if (categoria == null)
            {
                return NotFound("Categoría no encontrada");
            }
            return Ok(new { mensaje = "ok", response = categoria });
        }

       

        [HttpPost]
        [Route("Guardar")]
        public IActionResult Guardar([FromBody] ProductoModel objeto)
        {
            try
            {
                var categoria = _dbapiContext.Categoria.Find(objeto.IdCategoria);
                if (categoria == null)
                {
                    return NotFound("Categoria no encontrada");
                }
                var producto = new Producto()
                {
                    Descripcion = objeto.Descripcion,
                    Nombre = objeto.Nombre,
                    IdCategoria = objeto.IdCategoria
                };
                _dbapiContext.Productos.Add(producto);
                _dbapiContext.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "El producto Guardado con Exito"});
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });
            }
            
        }
        // Guarda una nueva categoría
        [HttpPost]
        [Route("GuardarCategoria")]
        public IActionResult GuardarCategoria([FromBody] AgregarCategoriaModel modelo)
        {
            
            try
            {
                var categoria = new Categoria()
                {
                    Nombre = modelo.Nombre,
                    Descripcion = modelo.Descripcion,
                };

                _dbapiContext.Categoria.Add(categoria);
                _dbapiContext.SaveChanges();
                return Ok(new { mensaje = "Categoría guardada correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }

        [HttpPut]
        [Route("Editar")]
        public IActionResult Editar([FromBody] EditarProductoModel objeto)
        {
            var categoria = _dbapiContext.Categoria.Find(objeto.IdCategoria);
            if (categoria == null)
            {
                return NotFound("Categoria no encontrada");
            }
            Producto oProducto = _dbapiContext.Productos.Find(objeto.IdProducto);
            if (oProducto == null)
            {
                return BadRequest("Prodcuto Editado encontrado");
            }
            try
            {
                

                oProducto.Nombre = objeto.Nombre is null ? oProducto.Nombre : objeto.Nombre;
                oProducto.Descripcion = objeto.Descripcion is null ? oProducto.Descripcion : objeto.Descripcion;
                oProducto.IdCategoria = objeto.IdCategoria is null ? oProducto.IdCategoria : objeto.IdCategoria;

                _dbapiContext.Productos.Update(oProducto);
                _dbapiContext.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "Producto Editado Correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });
            }

        }

        [HttpPut]
        [Route("EditarCategoria")]
        public IActionResult EditarCategoria([FromBody] Categoria categoria)
        {
            var categoriaDb = _dbapiContext.Categoria.Find(categoria.IdCategoria);
            if (categoriaDb == null)
            {
                return NotFound("Categoría no encontrada");
            }
            try
            {
                categoriaDb.Nombre = categoria.Nombre;
                categoriaDb.Descripcion = categoria.Descripcion;

                _dbapiContext.Categoria.Update(categoriaDb);
                _dbapiContext.SaveChanges();
                return Ok(new { mensaje = "Categoría actualizada correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }



        [HttpDelete]
        [Route("Eliminar/{idProducto:int}")]
        public IActionResult Eliminar(int idProducto)
        {
            Producto oProducto = _dbapiContext.Productos.Find(idProducto);
            if (oProducto == null)
            {
                return BadRequest("Producto no encontrado");
            }
            try
            {

                _dbapiContext.Productos.Remove(oProducto);
                _dbapiContext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "Producto eliminado correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });
            }


        }

        // Elimina una categoría
        [HttpDelete]
        [Route("EliminarCategoria/{idCategoria:int}")]
        public IActionResult EliminarCategoria(int idCategoria)
        {
            var catProducto = _dbapiContext.Productos.Where(w => w.IdCategoria == idCategoria).FirstOrDefault();
            if (catProducto != null)
            {
                return Ok(new { mensaje = "La Categoria esta relacionada a un Producto" });
            }
            var categoria = _dbapiContext.Categoria.Find(idCategoria);
            
            if (categoria == null)
            {
                return NotFound("Categoría no encontrada");
            }
            try
            {
                _dbapiContext.Categoria.Remove(categoria);
                _dbapiContext.SaveChanges();
                return Ok(new { mensaje = "Categoría eliminada correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
        }






    }
}


