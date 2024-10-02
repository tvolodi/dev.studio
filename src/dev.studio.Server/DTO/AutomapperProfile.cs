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

            CreateMap<DAL.Models.AppEntity, AppEntityDto>();
            CreateMap<AppEntityDto, DAL.Models.AppEntity>();

            CreateMap<DAL.Models.AppEntityAttribute, AppEntityAttributeDto>();
            CreateMap<AppEntityAttributeDto, DAL.Models.AppEntityAttribute>();

            CreateMap<DAL.Models.SystemConfig, SystemConfigDto>();
            CreateMap<SystemConfigDto, DAL.Models.SystemConfig>();
        }
    }
}
