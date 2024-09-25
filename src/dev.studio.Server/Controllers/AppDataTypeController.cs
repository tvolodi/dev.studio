using AutoMapper;
using dev.studio.Server.DAL;
using dev.studio.Server.DAL.Models;
using dev.studio.Server.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dev.studio.Server.Controllers
{
    public class AppDataTypeController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;
        public AppDataTypeController(AppDbContext appDbContext, IMapper mapper)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
        }

        [HttpGet(Name = "GetAppDataType")]
        public async Task<IEnumerable<AppDataTypeDto>> GetAll()
        {
            var appDataTypes = await _appDbContext.AppDataTypes.ToListAsync();
            var result = _mapper.Map<IEnumerable<AppDataTypeDto>>(appDataTypes);

            return result;
        }

        [HttpGet("{id}", Name = "GetAppDataTypeById")]
        public async Task<AppDataTypeDto> GetById(int id)
        {
            var appDataType = await _appDbContext.AppDataTypes.FindAsync(id);
            return _mapper.Map<AppDataTypeDto>(appDataType);
        }

        [HttpPost(Name = "CreateAppDataType")]
        public async Task<AppDataTypeDto> Create(AppDataTypeDto appDataTypeDto)
        {
            var appDataType = _mapper.Map<AppDataType>(appDataTypeDto);
            _appDbContext.AppDataTypes.Add(appDataType);
            await _appDbContext.SaveChangesAsync();
            return _mapper.Map<AppDataTypeDto>(appDataType);
        }

        [HttpPut("{id}", Name = "UpdateAppDataType")]
        public async Task<AppDataTypeDto> Update(int id, AppDataTypeDto appDataTypeDto)
        {
            var appDataType = await _appDbContext.AppDataTypes.FindAsync(id);
            _mapper.Map(appDataTypeDto, appDataType);
            await _appDbContext.SaveChangesAsync();
            return _mapper.Map<AppDataTypeDto>(appDataType);
        }

        [HttpDelete("{id}", Name = "DeleteAppDataType")]
        public async Task Delete(int id)
        {
            var appDataType = await _appDbContext.AppDataTypes.FindAsync(id);

            if(appDataType == null)
                throw new Exception("AppDataType item not found");

            _appDbContext.AppDataTypes.Remove(appDataType);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
