using AutoMapper;

namespace dev.studio.Server.DTO
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            CreateMap<DAL.Models.AppModule, AppModuleDto>();
            CreateMap<AppModuleDto, DAL.Models.AppModule>();

            CreateMap<DAL.Models.AppDataType, AppDataTypeDto>();
            CreateMap<AppDataTypeDto, DAL.Models.AppDataType>();
        }
    }
}
