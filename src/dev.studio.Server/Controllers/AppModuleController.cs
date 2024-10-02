using AutoMapper;
using dev.studio.Server.DAL;
using dev.studio.Server.DAL.Models;
using dev.studio.Server.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server_ext.Controller;
using server_ext.DAL;
using server_ext.DTO;

namespace dev.studio.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppModuleController : BaseEntityController<AppModule, AppModuleDto>
    {
        public AppModuleController(AppDbContext appDbContext, IMapper mapper)
        : base(appDbContext, mapper)
        {
        }

        //public override async Task<IEnumerable<DefaultEntityDto<AppModule>>> GetAll()
        //{
        //    var appModules = await _appDbContext.AppModules.ToListAsync();
        //    var result = _mapper.Map<IEnumerable<DefaultEntityDto<AppModule>>>(appModules);
        //    return result;
        //}
    }
}
