using AutoMapper;
using dev.studio.Server.DAL;
using dev.studio.Server.DAL.Models;
using dev.studio.Server.DTO;
using server_ext.Controller;
using server_ext.DAL;

namespace dev.studio.Server.Controllers
{
    public class AppEntityController : BaseEntityController<AppEntity, AppEntityDto>
    {
        public AppEntityController(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}
