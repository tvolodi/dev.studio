using AutoMapper;
using dev.studio.Server.DAL;
using dev.studio.Server.DAL.Models;
using dev.studio.Server.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server_ext.Controller;

namespace dev.studio.Server.Controllers
{
    public class AppDataTypeController : BaseEntityController<AppDataType, AppDataTypeDto>
    {
        public AppDataTypeController(AppDbContext appDbContext, IMapper mapper)
        : base(appDbContext, mapper)
        {
        }
    }
}
